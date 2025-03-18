const Response = require('../models/Response');
const ChatLog = require('../models/ChatLog');

exports.handleWebhook = async (req, res) => {
    const { sender, message } = req.body;

    if (!sender || !message) {
        return res.status(400).json({ success: false, message: "Data tidak valid" });
    }

    try {
        console.log(`Pesan dari ${sender}: ${message}`);
        
        // Cari balasan otomatis berdasarkan keyword
        const responseData = await Response.findOne({ where: { keyword: message.toLowerCase() } });
        let reply = "Maaf, saya tidak mengerti pesan Anda.";

        if (responseData) {
            reply = responseData.response;
            // Kirim balasan ke pengguna
            await sendMessage(sender, responseData.response);
        }

        // Simpan chat ke database
        await ChatLog.create({ sender, message, response: reply });

        res.sendStatus(200);
    } catch (error) {
        console.error("Error saat menangani webhook:", error);
        res.status(500).json({ success: false, message: "Gagal menangani webhook" });
    }
};

// Fungsi untuk mengirim pesan ke WhatsApp via Fonnte
async function sendMessage(to, text) {
    const fetch = require('node-fetch');

    try {
        console.log(`Mengirim pesan ke ${to}: ${text}`);
        console.log(`Menggunakan API key: ${process.env.FONNTE_API_KEY}`);
        const response = await fetch("https://api.fonnte.com/send", {
            method: "POST",
            headers: {
                "Authorization": process.env.FONNTE_API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ target: to, message: text })
        });

        const data = await response.json();
        console.log("Response dari Fonnte:", data);
    } catch (error) {
        console.error("Gagal mengirim pesan:", error);
    }
}
