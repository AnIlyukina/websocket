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
  const clientMessage = {
    sender: Sender.CLIENT,
    text: newMessage.value,
  };
  messages.push(clientMessage);
  webSocketService.sendMessage(
    JSON.stringify({
      type: "message",
      ...clientMessage,
    })
  );
};

onMounted(() => {
  webSocketService.connect(Sender.CLIENT);
  webSocketService.onMessage((message: ChatMessage) => {
    messages.push(message);
  });
});

onUnmounted(() => {
  webSocketService.close();
});
</script>

<template>
  <div class="client-chat">
    <h2>Client Chat</h2>
    <MessageList :messages="messages" />
    <InputChat v-model="newMessage" @onSendMessage="sendMessage" />
  </div>
</template>

<style scoped>
.client-chat {
  background-color: lightblue;
}
</style>
