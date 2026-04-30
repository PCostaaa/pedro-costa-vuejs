<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/auth";

const router = useRouter();
const username = ref("");
const password = ref("");
const error = ref("");

function handleLogin() {
  if (login(username.value, password.value)) {
    router.push({
      name: "contact-list",
    });
  } else {
    error.value = "Invalid username or password. Please try again.";
  }
}
</script>

<template>
  <div class="login-wrapper">
    <div class="login-card">
      <div class="login-header">
        <i class="pi pi-users login-icon"></i>
        <h1>Contacts App</h1>
        <p>Sign in to manage your contacts</p>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="field">
          <label><i class="pi pi-user"></i> Username</label>
          <input v-model="username" type="text" placeholder="Enter username" />
        </div>

        <div class="field">
          <label><i class="pi pi-lock"></i> Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Enter password"
          />
        </div>

        <span class="error" v-if="error">
          <i class="pi pi-exclamation-circle"></i> {{ error }}
        </span>

        <button type="submit"><i class="pi pi-sign-in"></i> Login</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f4f8;
  font-family: sans-serif;
}
.login-card {
  background: white;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
}
.login-header {
  text-align: center;
  margin-bottom: 32px;
}
.login-icon {
  font-size: 2.5rem;
  color: #4a90e2;
}
.login-header h1 {
  margin: 12px 0 4px;
  font-size: 1.6rem;
}
.login-header p {
  color: #888;
  font-size: 0.9rem;
  margin: 0;
}
.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
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
input {
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
  font-size: 0.85rem;
  margin-bottom: 12px;
  display: block;
}
button {
  width: 100%;
  padding: 11px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s;
}
button:hover {
  background: #357abd;
}
button i {
  margin-right: 6px;
}
</style>
