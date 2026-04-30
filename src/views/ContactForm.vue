<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  getContactById,
  addContact,
  updateContact,
  isEmailUnique,
  isContactUnique,
} from "@/storage";

const router = useRouter();
const route = useRoute();

const isEditing = computed(() => !!route.params.id);

const form = ref({
  name: "",
  contact: "",
  email: "",
  picture: "",
});

const picturePreview = ref(null);
const errors = ref({});

onMounted(() => {
  if (isEditing.value) {
    const contact = getContactById(route.params.id);
    if (contact) {
      form.value = { ...contact };
      picturePreview.value = contact.picture;
    }
  }
});

function handleImage(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    form.value.picture = ev.target.result;
    picturePreview.value = ev.target.result;
  };
  reader.readAsDataURL(file);
}

function validate() {
  errors.value = {};

  if (!form.value.name || form.value.name.length <= 5)
    errors.value.name =
      "Name must be longer than 5 characters. Please enter a valid name.";

  if (!form.value.contact || !/^\d{9}$/.test(form.value.contact))
    errors.value.contact =
      "Contact must be exactly 9 digits. Please enter a valid contact.";

  if (!form.value.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email))
    errors.value.email = "Please enter a valid email address.";

  if (!form.value.picture) errors.value.picture = "A picture is required.";

  const excludeId = isEditing.value ? route.params.id : null;

  if (!errors.value.email && !isEmailUnique(form.value.email, excludeId))
    errors.value.email =
      "This email is already in use. Please enter a different email address.";

  return Object.keys(errors.value).length === 0;
}

function handleSubmit() {
  if (!validate()) return;
  if (isEditing.value) {
    updateContact({ ...form.value, id: route.params.id });
  } else {
    addContact({ ...form.value, id: Date.now().toString() });
  }

  router.push({
    name: "contact-list",
  });
}
</script>

<template>
  <div class="container">
    <div class="page-header">
      <button class="btn-back" @click="$router.push({ name: 'contact-list' })">
        <i class="pi pi-arrow-left"></i> Back
      </button>
      <h1>
        <i :class="isEditing ? 'pi pi-pencil' : 'pi pi-user-plus'"></i>
        {{ isEditing ? "Edit Contact" : "Add Contact" }}
      </h1>
    </div>

    <div class="form-card">
      <form @submit.prevent="handleSubmit">
        <div class="field">
          <label><i class="pi pi-user"></i> Name</label>
          <input v-model="form.name" type="text" placeholder="Name" />
          <span class="error" v-if="errors.name"
            ><i class="pi pi-exclamation-circle"></i> {{ errors.name }}</span
          >
        </div>

        <div class="field">
          <label><i class="pi pi-phone"></i> Contact</label>
          <input
            v-model="form.contact"
            type="text"
            placeholder="9 digit number"
          />
          <span class="error" v-if="errors.contact"
            ><i class="pi pi-exclamation-circle"></i> {{ errors.contact }}</span
          >
        </div>

        <div class="field">
          <label><i class="pi pi-envelope"></i> Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="email@example.com"
          />
          <span class="error" v-if="errors.email"
            ><i class="pi pi-exclamation-circle"></i> {{ errors.email }}</span
          >
        </div>

        <div class="field">
          <label><i class="pi pi-image"></i> Picture</label>
          <input type="file" accept="image/*" @change="handleImage" />
          <span class="error" v-if="errors.picture"
            ><i class="pi pi-exclamation-circle"></i> {{ errors.picture }}</span
          >
          <img v-if="picturePreview" :src="picturePreview" class="preview" />
        </div>

        <div class="actions">
          <button
            type="button"
            class="btn-cancel"
            @click="$router.push({ name: 'contact-list' })"
          >
            <i class="pi pi-times"></i> Cancel
          </button>
          <button type="submit" class="btn-submit">
            <i :class="isEditing ? 'pi pi-check' : 'pi pi-plus'"></i>
            {{ isEditing ? "Save Changes" : "Add Contact" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 540px;
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
.form-card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
}
.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
label {
  font-weight: 500;
  margin-bottom: 6px;
  font-size: 0.9rem;
  color: #444;
}
label i {
  margin-right: 6px;
  color: #4a90e2;
}
input[type="text"],
input[type="email"] {
  padding: 10px 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.2s;
}
input:focus {
  outline: none;
  border-color: #4a90e2;
}
.error {
  color: #e74c3c;
  font-size: 0.82rem;
  margin-top: 4px;
}
.error i {
  margin-right: 4px;
}
.preview {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-top: 12px;
  border: 3px solid #4a90e2;
}
.actions {
  display: flex;
  gap: 10px;
  margin-top: 8px;
  justify-content: flex-end;
}
.btn-cancel {
  padding: 9px 18px;
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
.btn-submit {
  padding: 9px 18px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-submit:hover {
  background: #357abd;
}
button i {
  margin-right: 6px;
}
</style>
