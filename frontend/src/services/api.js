const API_URL = "http://localhost:3000";

export const getResponses = async () => {
    try {
        const res = await fetch(`${API_URL}/responses`);
        if (!res.ok) throw new Error("Gagal mengambil data");
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const addResponse = async (keyword, response) => {
    try {
        const res = await fetch(`${API_URL}/responses`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ keyword, response }),
        });
        if (!res.ok) throw new Error("Gagal menambah response");
    } catch (error) {
        console.error(error);
    }
};

export const deleteResponse = async (id) => {
    try {
        const res = await fetch(`${API_URL}/responses/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) throw new Error("Gagal menghapus response");
    } catch (error) {
        console.error(error);
    }
};

export const updateResponse = async (id, keyword, response) => {
    try {
        const res = await fetch(`${API_URL}/responses/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ keyword, response }),
        });
        if (!res.ok) throw new Error("Gagal memperbarui response");
    } catch (error) {
        console.error(error);
    }
};

export const getChatLogs = async () => {
    try {
        const res = await fetch(`${API_URL}/responses/logs`);
        if (!res.ok) throw new Error("Gagal mengambil chat logs");
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const sendMessage = async (message) => {
    try {
        const res = await fetch(`${API_URL}/webhook`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sender: "User", message }),
        });
        if (!res.ok) throw new Error("Gagal mengirim pesan");
        return await res.json();
    } catch (error) {
        console.error(error);
        return { response: "Gagal mengirim pesan." };
    }
};