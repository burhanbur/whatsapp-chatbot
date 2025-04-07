  <style scoped>
    .chat-container {
      background: #f5f5f5;
      border-radius: 10px;
      padding: 10px;
      height: 400px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    .chat-message {
      max-width: 70%;
      padding: 8px 12px;
      border-radius: 10px;
      margin: 5px;
      word-wrap: break-word;
    }

    .user-message {
      background-color: #dcf8c6;
      align-self: flex-end;
      text-align: right;
    }

    .bot-message {
      background-color: #e5e5e5;
      align-self: flex-start;
      text-align: left;
    }

    .message-content {
      margin: 0;
    }
  </style>  
  
  <template>
    <div class="p-6">
      <h1 class="text-2xl font-bold">WhatsApp Chatbot Dashboard</h1>
  
      <h2 class="mt-6 text-xl font-semibold">Chat Logs</h2>
      <button @click="fetchChatLogs" class="mt-2 mb-4 bg-blue-500 text-white px-4 py-2 rounded">
        Muat Chat Logs
      </button>

      <p v-if="notification" class="mt-2 text-green-500">{{ notification }}</p>

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

      <h2 class="mt-6 text-xl font-semibold">Live Chat</h2>
      <div class="chat-container p-4 border rounded h-96 overflow-y-auto">
        <div v-for="log in chatLogs" :key="log.id" class="chat-message" 
            :class="{'user-message': log.sender !== 'Bot', 'bot-message': log.sender === 'Bot'}">
          <p class="text-sm text-gray-500">{{ log.sender }}</p>
          <p class="message-content">{{ log.message }}</p>
        </div>
      </div>

      <!-- Input chat -->
      <div class="flex mt-2">
        <input v-model="newMessage" class="border p-2 flex-1 rounded-l" placeholder="Ketik pesan..." />
        <button @click="sendMessageHandler" class="bg-green-500 text-white px-4 py-2 rounded-r">Kirim</button>
      </div>
  
      <!-- <table class="w-full mt-4 border">
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
      <p v-if="chatLogs.length === 0" class="text-red-500">Tidak ada chat logs.</p> -->
    </div>
    
    <p v-if="isLoading" class="text-blue-500">Memuat data...</p>
  </template>
  
  <script>
  import { getChatLogs, getResponses, updateResponse, addResponse, deleteResponse, sendMessage } from "@/services/api";
  
  export default {
    data() {
      return { 
        chatLogs: [], 
        newMessage: "",
        responses: [], 
        editingId: null,
        editKeyword: "",
        editResponse: "",
        isLoading: false,
        notification: "",
    };
    },
    methods: {
        async fetchChatLogs() {
          this.isLoading = true;
          this.chatLogs = await getChatLogs();
          this.isLoading = false;
        },
        async fetchResponses() {
          this.isLoading = true;
          this.responses = await getResponses();
          this.isLoading = false;
        },
        startEdit(response) {
            this.editingId = response.id;
            this.editKeyword = response.keyword;
            this.editResponse = response.response;
        },
        async saveEdit(id) {
          try {
              await updateResponse(id, this.editKeyword, this.editResponse);
              this.notification = "Balasan berhasil diperbarui!";
              setTimeout(() => this.notification = "", 3000);
          } catch (error) {
              this.notification = "Gagal memperbarui balasan!";
          }
          this.editingId = null;
          this.fetchResponses();
        },
        async sendMessageHandler() {
          if (!this.newMessage) return;
          const response = await sendMessage(this.newMessage);
          this.chatLogs.push({ sender: "User", message: this.newMessage });
          this.chatLogs.push({ sender: "Bot", message: response.response || "Tidak ada balasan." });
          this.newMessage = "";
        },
    },
    mounted() {
        this.fetchResponses();
    }
  };
  </script>