<script setup lang="ts">
import MessageList from "@/components/MessageList.vue";
import InputChat from "@/components/UI/InputChat.vue";
import { ref } from "vue";

const message = ref("");

const messages = [
  {
    text: "Привет, поможешь мне?",
    sender: "client",
  },
  {
    text: "Привет, давай помогу. Какой у тебя вопрос",
    sender: "admin",
  },
];
const sendMessage = () => {
  console.log(message.value, "send");
};
</script>

<template>
  <div class="admin-chat">
    <h2>Admin Chat</h2>
    <MessageList :messages="messages" />
    <InputChat v-model="message" @onSendMessage="sendMessage" />
  </div>
</template>

<style scoped>
.admin-chat {
  background-color: #aaeede;
}
</style>
