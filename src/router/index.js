import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated } from "@/auth";

import ContactList from "@/views/ContactList.vue";
import ContactForm from "@/views/ContactForm.vue";
import ContactDetail from "@/views/ContactDetail.vue";
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "contact-list",
      component: ContactList,
    },
    {
      path: "/contacts/add",
      name: "contact-add",
      component: ContactForm,
      meta: { requiresAuth: true },
    },
    {
      path: "/contacts/edit/:id",
      name: "contact-edit",
      component: ContactForm,
      meta: { requiresAuth: true },
    },
    {
      path: "/contacts/:id",
      name: "contact-detail",
      component: ContactDetail,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: "login" });
  } else if (to.name === "login" && isAuthenticated()) {
    next({ name: "contact-list" });
  } else {
    next();
  }
});

export default router;
