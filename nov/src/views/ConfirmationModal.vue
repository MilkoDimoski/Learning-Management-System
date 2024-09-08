<template>
  <div class="modal-overlay" v-if="visible">
    <div class="modal">
      <h3>Confirm Deletion</h3>
      <p>Are you sure you want to delete this course?</p>
      <div class="modal-buttons">
        <button @click="confirm" class="action-button confirm-button">Yes</button>
        <button @click="cancel" class="action-button cancel-button">No</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue';

const props = defineProps({
  visible: Boolean
});
const emit = defineEmits(['confirm', 'cancel']);

const confirm = () => {
  emit('confirm');
};

const cancel = () => {
  emit('cancel');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.confirm-button {
  background: linear-gradient(90deg, #33bfa6, #048e85);
}

.cancel-button {
  background: linear-gradient(90deg, #c33f80, #c64574);
}
</style>
