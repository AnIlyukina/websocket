<script setup lang="ts">
import { onMounted, reactive, ref, onUnmounted } from "vue";
import { ChatMessage, Sender } from "@/types/ChatMessage";
import WebSocketService from "@/services/WebSocketService";
import MessageList from "@/components/MessageList.vue";
import InputChat from "@/components/UI/InputChat.vue";

const webSocketService = new WebSocketService("ws://localhost:8080");

const newMessage = ref("");

const messages = reactive<ChatMessage[]>([]);

const sendMessage = () => {
  const adminMessage = {
    sender: Sender.ADMIN,
    text: newMessage.value,
  };

  messages.push(adminMessage);
  webSocketService.sendMessage(
    JSON.stringify({
      type: "message",
      ...adminMessage,
    })
  );
};

onMounted(() => {
  webSocketService.connect(Sender.ADMIN); // Указываем, что это админ
  webSocketService.onMessage((message: ChatMessage) => {
    console.log(typeof message, "message");
    messages.push(message);
  });
});

onUnmounted(() => {
  webSocketService.close(); // Закрываем соединение при размонтировании компонента
});
</script>

<template>
  <div class="admin-chat">
    <h2>Admin Chat</h2>
    <MessageList :messages="messages" />
    <InputChat v-model="newMessage" @onSendMessage="sendMessage" />
  </div>
</template>

<style scoped>
.admin-chat {
  background-color: #aaeede;
}
</style>
