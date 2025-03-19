<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold">WhatsApp Chatbot Dashboard</h1>
  
      <h2 class="mt-6 text-xl font-semibold">Chat Logs</h2>
      <button @click="fetchChatLogs" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        Muat Chat Logs
      </button>

      <h2 class="mt-6 text-xl font-semibold">Balasan Otomatis</h2>

        <table class="w-full mt-4 border">
        <thead>
            <tr class="bg-gray-200">
            <th class="p-2 border">Keyword</th>
            <th class="p-2 border">Response</th>
            <th class="p-2 border">Aksi</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="response in responses" :key="response.id" class="border">
            <td class="p-2 border">
                <input v-if="editingId === response.id" v-model="editKeyword" class="border p-1 w-full" />
                <span v-else>{{ response.keyword }}</span>
            </td>
            <td class="p-2 border">
                <input v-if="editingId === response.id" v-model="editResponse" class="border p-1 w-full" />
                <span v-else>{{ response.response }}</span>
            </td>
            <td class="p-2 border">
                <button v-if="editingId === response.id" @click="saveEdit(response.id)" class="bg-green-500 text-white px-2 py-1 rounded">
                Simpan
                </button>
                <button v-else @click="startEdit(response)" class="bg-blue-500 text-white px-2 py-1 rounded">
                Edit
                </button>
            </td>
            </tr>
        </tbody>
        </table>
  
      <table class="w-full mt-4 border">
        <thead>
          <tr class="bg-gray-200">
            <th class="p-2 border">Pengirim</th>
            <th class="p-2 border">Pesan</th>
            <th class="p-2 border">Balasan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in chatLogs" :key="log.id" class="border">
            <td class="p-2 border">{{ log.sender }}</td>
            <td class="p-2 border">{{ log.message }}</td>
            <td class="p-2 border">{{ log.response }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="chatLogs.length === 0" class="text-red-500">Tidak ada chat logs.</p>
    </div>
  </template>
  
  <script>
  import { getChatLogs, getResponses, updateResponse, addResponse, deleteResponse } from "@/services/api";
  
  export default {
    data() {
      return { 
        chatLogs: [], 
        editingId: null,
        editKeyword: "",
        editResponse: "",
    };
    },
    methods: {
        async fetchChatLogs() {
            this.chatLogs = await getChatLogs();
        },
        async fetchResponses() {
            this.responses = await getResponses();
        },
        startEdit(response) {
            this.editingId = response.id;
            this.editKeyword = response.keyword;
            this.editResponse = response.response;
        },
        async saveEdit(id) {
            await updateResponse(id, this.editKeyword, this.editResponse);
            this.editingId = null;
            this.fetchResponses(); // Refresh data setelah update
        }
    },
    mounted() {
        this.fetchResponses();
    }
  };
  </script>