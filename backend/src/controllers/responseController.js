const Response = require('../models/Response');
const ChatLog = require('../models/ChatLog');

exports.addResponse = async (req, res) => {
    const { keyword, response } = req.body;
    
    if (!keyword || !response) {
        return res.status(400).json({ success: false, message: "Keyword dan response tidak boleh kosong" });
    }

    try {
        const [resp, created] = await Response.findOrCreate({
            where: { keyword: keyword.toLowerCase() },
            defaults: { response },
        });

        if (!created) {
            await resp.update({ response });
            return res.json({ success: true, message: "Balasan otomatis diperbarui" });
        }

        res.json({ success: true, message: "Balasan otomatis ditambahkan" });
    } catch (error) {
        console.error("Error saat menambahkan response:", error);
        res.status(500).json({ success: false, message: "Gagal menyimpan balasan" });
    }
};

exports.getResponses = async (req, res) => {
    try {
        const responses = await Response.findAll({ order: [['id', 'ASC']] });
        res.json(responses);
    } catch (error) {
        console.error("Error saat mengambil responses:", error);
        res.status(500).json({ success: false, message: "Gagal mengambil data" });
    }
};

exports.updateResponse = async (req, res) => {
    const { id } = req.params;
    const { keyword, response } = req.body;

    if (!keyword || !response) {
        return res.status(400).json({ success: false, message: "Keyword dan response tidak boleh kosong" });
    }

    try {
        const resp = await Response.findByPk(id);
        if (!resp) {
            return res.status(404).json({ success: false, message: "Data tidak ditemukan" });
        }

        await resp.update({ keyword: keyword.toLowerCase(), response });
        res.json({ success: true, message: "Balasan otomatis diperbarui" });
    } catch (error) {
        console.error("Error saat memperbarui response:", error);
        res.status(500).json({ success: false, message: "Gagal memperbarui balasan" });
    }
};

exports.deleteResponse = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Response.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Data tidak ditemukan" });
        }

        res.json({ success: true, message: "Balasan otomatis dihapus" });
    } catch (error) {
        console.error("Error saat menghapus response:", error);
        res.status(500).json({ success: false, message: "Gagal menghapus balasan" });
    }
};

exports.logs = async (req, res) => {
    try {
        const logs = await ChatLog.findAll({ order: [['id', 'DESC']] });
        console.log("Data Logs:", logs);
        res.json(logs);
    } catch (error) {
        console.error("Error saat mengambil chat logs:", error);
        res.status(500).json({ success: false, message: "Gagal mengambil chat logs", error: error.message });
    }
};