<script setup>
import { ref } from "vue";
import { RouterView, RouterLink, useRouter } from "vue-router";

import { deleteContact, getContacts } from "@/storage";
import { isAuthenticated } from "@/auth";
import { logout } from "@/auth";
import DeleteModal from "@/components/DeleteModal.vue";

const router = useRouter();
const contacts = ref(getContacts());

const showModal = ref(false);
const contactToDelete = ref(false);

function handleLogout() {
  logout();
  router.push({ name: "login" });
}

function goToAddContact() {
  router.push({
    name: "contact-add",
  });
}

function confirmDelete(contact) {
  contactToDelete.value = contact;
  showModal.value = true;
}

function handleConfirmDelete() {
  deleteContact(contactToDelete.value.id);
  contacts.value = getContacts();
  showModal.value = false;
  contactToDelete.value = null;
}

function handleCancelDelete() {
  showModal.value = false;
  contactToDelete.value = null;
}

function goToDetailContact(id) {
  router.push({
    name: "contact-detail",
    params: { id },
  });
}

function goToEditContact(id) {
  router.push({
    name: "contact-edit",
    params: { id },
  });
}

function handleDelete(id) {
  deleteContact(id);
  contacts.value = getContacts();
}
</script>

<template>
  <div class="container">
    <div class="header">
      <h1><i class="pi pi-address-book"></i> Contacts</h1>
      <div class="header-actions">
        <button
          v-if="isAuthenticated()"
          class="btn btn-primary"
          @click="goToAddContact"
        >
          + Add Contact
        </button>
        <button
          v-if="isAuthenticated()"
          class="btn btn-logout"
          @click="handleLogout"
        >
          Logout
        </button>
        <button
          v-else
          class="btn btn-primary"
          @click="router.push({ name: 'login' })"
        >
          Login
        </button>
      </div>
    </div>

    <div v-if="contacts.length === 0" class="empty">
      <p>No contacts yet. Add your first contact!</p>
    </div>

    <template v-else>
      <!-- Cards View -->
      <h2 class="section-title">Cards</h2>
      <div class="cards">
        <div class="card" v-for="contact in contacts" :key="contact.id">
          <img :src="contact.picture" :alt="contact.name" />
          <h3>{{ contact.name }}</h3>
          <p class="contact-info">
            <i class="pi pi-phone"></i> {{ contact.contact }}
          </p>
          <p class="contact-info">
            <i class="pi pi-envelope"></i> {{ contact.email }}
          </p>
          <div class="actions">
            <template v-if="isAuthenticated()">
              <RouterLink
                class="btn btn-sm"
                :to="{ name: 'contact-detail', params: { id: contact.id } }"
              >
                <i class="pi pi-eye"></i> View
              </RouterLink>
              <RouterLink
                class="btn btn-sm"
                :to="{ name: 'contact-edit', params: { id: contact.id } }"
              >
                <i class="pi pi-pencil"></i> Edit
              </RouterLink>
              <button
                class="btn btn-sm btn-danger"
                @click="confirmDelete(contact)"
              >
                <i class="pi pi-trash"></i> Delete
              </button>
            </template>
            <template v-else>
              <span class="auth-note">Login to view contact details</span>
            </template>
          </div>
        </div>
      </div>

      <!-- List View -->
      <h2 class="section-title">List</h2>
      <table class="contact-table">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in contacts" :key="contact.id">
            <td>
              <img
                :src="contact.picture"
                :alt="contact.name"
                class="table-img"
              />
            </td>
            <td>{{ contact.name }}</td>
            <td>{{ contact.contact }}</td>
            <td>{{ contact.email }}</td>
            <td class="table-actions">
              <template v-if="isAuthenticated()">
                <RouterLink
                  class="btn btn-sm"
                  :to="{ name: 'contact-detail', params: { id: contact.id } }"
                >
                  <i class="pi pi-eye"></i> View
                </RouterLink>
                <RouterLink
                  class="btn btn-sm"
                  :to="{ name: 'contact-edit', params: { id: contact.id } }"
                >
                  <i class="pi pi-pencil"></i> Edit
                </RouterLink>
                <button
                  class="btn btn-sm btn-danger"
                  @click="confirmDelete(contact)"
                >
                  <i class="pi pi-trash"></i> Delete
                </button>
              </template>
              <template v-else>
                <span class="auth-note">Login to view contact details</span>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </template>

    <DeleteModal
      v-if="showModal"
      :contactName="contactToDelete.name"
      @confirm="handleConfirmDelete"
      @cancel="handleCancelDelete"
    />
  </div>
</template>

<style scoped>
.container {
  max-width: 1000px;
  margin: 40px auto;
  font-family: sans-serif;
  padding: 0 24px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  border-bottom: 2px solid #eee;
  padding-bottom: 16px;
}

.header h1 {
  font-size: 1.8rem;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.section-title {
  font-size: 1.1rem;
  color: #555;
  margin: 32px 0 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.empty {
  text-align: center;
  padding: 60px 0;
  color: #888;
}

/* Cards */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

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

/* Table */
.contact-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.contact-table th {
  background: #f5f5f5;
  padding: 10px 14px;
  text-align: left;
  border-bottom: 2px solid #ddd;
}

.contact-table td {
  padding: 10px 14px;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
}

.table-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.table-actions {
  display: flex;
  gap: 6px;
}

/* Buttons */
.btn {
  padding: 7px 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  cursor: pointer;
  font-size: 0.9rem;
  background: white;
  text-decoration: none;
  color: #333;
  display: inline-block;
}

.btn:hover {
  background: #f0f0f0;
}

.btn-primary {
  background: #4a90e2;
  color: white;
  border-color: #4a90e2;
}

.btn-primary:hover {
  background: #357abd;
}

.btn-logout {
  background: #f5f5f5;
  border-color: #ccc;
}

.btn-danger {
  background: #e74c3c;
  color: white;
  border-color: #e74c3c;
}

.btn-danger:hover {
  background: #c0392b;
}

.btn-sm {
  padding: 4px 10px;
  font-size: 0.82rem;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.auth-note {
  color: #777;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
