<script lang="ts" setup>
import { toRefs, defineProps } from "vue";

interface Message {
  sender: string;
  text: string;
}

const props = defineProps<{
  messages: Message[];
}>();

const { messages } = toRefs(props);
</script>

<template>
  <div class="messages">
    <p
      v-for="(msg, index) in messages"
      :key="index"
      :class="{
        'admin-message': msg.sender === 'admin',
        'client-message': msg.sender === 'client',
      }"
    >
      {{ msg.text }}
    </p>
  </div>
</template>

<style scoped>
.messages {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.messages > p {
  max-width: 90%;
  border-radius: 10px;
  padding: 10px;
}

.admin-message {
  background-color: #c4ffb0;
  align-self: flex-end;
}

.client-message {
  background-color: #abbfff;
  align-self: flex-start;
}
</style>
