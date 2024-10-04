<script setup lang="ts">
import AdminChat from "@/components/AdminChat.vue";
import ClientChat from "@/components/ClientChat.vue";
</script>

<template>
  <div class="chat-container">
    <AdminChat />
    <ClientChat />
  </div>
</template>
<style scoped>
.chat-container {
  display: flex;
  min-height: 100vh;
  gap: 20px;
  padding: 20px;
}

.chat-container > div {
  flex: 1;
  border-radius: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
}
</style>
