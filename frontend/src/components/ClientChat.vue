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
  console.log("send");
};
</script>

<template>
  <div class="client-chat">
    <h2>Client Chat</h2>
    <MessageList :messages="messages" />
    <InputChat v-model="message" @onSendMessage="sendMessage" />
  </div>
</template>

<style scoped>
.client-chat {
  background-color: lightblue;
}
</style>
