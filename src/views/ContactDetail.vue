<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { getContactById } from "@/storage";

const route = useRoute();
const router = useRouter();
const contact = ref(null);

onMounted(() => {
  contact.value = getContactById(route.params.id);
  if (!contact.value) router.push({ name: "contact-list" });
});
</script>

<template>
  <div class="container" v-if="contact">
    <div class="page-header">
      <button class="btn-back" @click="router.push({ name: 'contact-list' })">
        <i class="pi pi-arrow-left"></i> Back
      </button>
      <h1><i class="pi pi-user"></i> Contact Details</h1>
    </div>

    <div class="card">
      <img :src="contact.picture" :alt="contact.name" />
      <h2>{{ contact.name }}</h2>
      <div class="details">
        <div class="detail-row">
          <span class="label"><i class="pi pi-hashtag"></i> ID</span>
          <span>{{ contact.id }}</span>
        </div>
        <div class="detail-row">
          <span class="label"><i class="pi pi-phone"></i> Contact</span>
          <span>{{ contact.contact }}</span>
        </div>
        <div class="detail-row">
          <span class="label"><i class="pi pi-envelope"></i> Email</span>
          <span>{{ contact.email }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
  margin: 40px auto;
  font-family: sans-serif;
  padding: 0 24px;
}
.page-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}
.page-header h1 {
  margin: 0;
  font-size: 1.5rem;
}
.page-header h1 i {
  margin-right: 8px;
  color: #4a90e2;
}
.btn-back {
  padding: 7px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-size: 0.9rem;
  color: #555;
}
.btn-back:hover {
  background: #f5f5f5;
}
.card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
}
img {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #4a90e2;
  margin-bottom: 16px;
}
h2 {
  margin: 0 0 24px;
  font-size: 1.4rem;
}
.details {
  text-align: left;
  border-top: 1px solid #eee;
  padding-top: 16px;
}
.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
  font-size: 0.95rem;
}
.label {
  font-weight: 500;
  color: #555;
}
.label i {
  margin-right: 6px;
  color: #4a90e2;
}
</style>
