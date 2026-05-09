<script setup>
import { RouterLink } from "vue-router";
import { isAuthenticated } from "@/auth";

defineProps({
  contact: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["delete-contact"]);
</script>

<template>
  <div class="card">
    <img :src="contact.picture" :alt="contact.name" />
    <h3>{{ contact.name }}</h3>
    <p class="contact-info">
      <i class="pi pi-phone"></i> {{ contact.contact }}
    </p>
    <p class="contact-info">
      <i class="pi pi-envelope"></i> {{ contact.email }}
    </p>

    <div class="actions">
      <RouterLink
        class="btn btn-sm"
        :to="{ name: 'contact-detail', params: { id: contact.id } }"
      >
        <i class="pi pi-eye"></i> View
      </RouterLink>

      <template v-if="isAuthenticated()">
        <RouterLink
          class="btn btn-sm"
          :to="{ name: 'contact-edit', params: { id: contact.id } }"
        >
          <i class="pi pi-pencil"></i> Edit
        </RouterLink>
        <button
          class="btn btn-sm btn-danger"
          @click="emit('delete-contact', contact)"
        >
          <i class="pi pi-trash"></i> Delete
        </button>
      </template>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px 16px;
  text-align: center;
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 8px;
}

.card h3 {
  margin: 0 0 4px;
  font-size: 1rem;
}

.contact-info {
  font-size: 0.85rem;
  color: #666;
  margin: 2px 0;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.btn {
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  cursor: pointer;
  font-size: 0.82rem;
  background: white;
  text-decoration: none;
  color: #333;
  display: inline-block;
}

.btn:hover {
  background: #f0f0f0;
}

.btn-danger {
  background: #e74c3c;
  color: white;
  border-color: #e74c3c;
}

.btn-danger:hover {
  background: #c0392b;
}
</style>
