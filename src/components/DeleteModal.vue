<script setup>
defineProps({
  contactName: String,
});

const emit = defineEmits(["confirm", "cancel"]);
</script>

<template>
  <div class="overlay">
    <div class="modal">
      <div class="modal-icon">
        <i class="pi pi-exclamation-triangle"></i>
      </div>
      <h2>Delete Contact</h2>
      <p>
        Are you sure you want to delete <strong>{{ contactName }}</strong
        >? This action cannot be undone.
      </p>
      <div class="actions">
        <button class="btn-cancel" @click="emit('cancel')">
          <i class="pi pi-times"></i> Cancel
        </button>
        <button class="btn-delete" @click="emit('confirm')">
          <i class="pi pi-trash"></i> Delete
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}
.modal-icon i {
  font-size: 2.5rem;
  color: #e74c3c;
}
h2 {
  margin: 12px 0 8px;
}
p {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 0;
}
.actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
}
.btn-cancel {
  padding: 9px 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-size: 0.95rem;
  color: #555;
}
.btn-cancel:hover {
  background: #f5f5f5;
}
.btn-delete {
  padding: 9px 20px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.2s;
}
.btn-delete:hover {
  background: #c0392b;
}
button i {
  margin-right: 6px;
}
</style>
