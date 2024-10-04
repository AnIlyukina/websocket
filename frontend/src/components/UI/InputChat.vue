<script lang="ts" setup>
import { toRefs, defineProps, defineEmits } from "vue";

const props = defineProps<{
  modelValue: string;
}>();

const { modelValue } = toRefs(props);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "onSendMessage"): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};

const handleMessage = () => {
  if (modelValue.value.trim()) {
    emit("onSendMessage");
    emit("update:modelValue", "");
  }
};
</script>

<template>
  <div class="input-chat">
    <input
      :value="modelValue"
      placeholder="type a messsage"
      @input="handleInput"
      class="input-chat__input"
    />
    <button class="input-chat__button" @click="handleMessage">Отправить</button>
  </div>
</template>

<style scoped lang="scss">
.input-chat {
  margin-top: auto;
  width: 100%;
  padding: 10px;
  display: flex;
  gap: 5px;

  &__input {
    flex: 3;
    padding: 10px;
    border: none;
    border-radius: 5px;
  }

  &__button {
    flex: 1;
    border: none;
    background-color: #282727;
    padding: 10px;
    border-radius: 5px;
    color: #fff;
  }
}
</style>
