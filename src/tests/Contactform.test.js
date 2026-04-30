import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { createRouter, createWebHashHistory } from "vue-router";
import ContactForm from "../views/ContactForm.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", name: "contact-list", component: { template: "<div/>" } },
    { path: "/contacts/add", name: "contact-add", component: ContactForm },
    {
      path: "/contacts/edit/:id",
      name: "contact-edit",
      component: ContactForm,
    },
  ],
});

async function mountForm() {
  router.push("/contacts/add");
  await router.isReady();
  return mount(ContactForm, {
    global: { plugins: [router] },
  });
}

describe("ContactForm validation", () => {
  it("shows error when name is empty", async () => {
    const wrapper = await mountForm();
    await wrapper.find("form").trigger("submit");
    expect(wrapper.text()).toContain("Name must be longer than 5 characters");
  });

  it("shows error when name is 5 characters or less", async () => {
    const wrapper = await mountForm();
    await wrapper.find('input[placeholder="Name"]').setValue("John");
    await wrapper.find("form").trigger("submit");
    expect(wrapper.text()).toContain("Name must be longer than 5 characters");
  });

  it("shows error when contact is not 9 digits", async () => {
    const wrapper = await mountForm();
    await wrapper.find('input[placeholder="9 digit number"]').setValue("123");
    await wrapper.find("form").trigger("submit");
    expect(wrapper.text()).toContain("Contact must be exactly 9 digits");
  });

  it("shows error when email is invalid", async () => {
    const wrapper = await mountForm();
    await wrapper
      .find('input[placeholder="email@example.com"]')
      .setValue("notanemail");
    await wrapper.find("form").trigger("submit");
    expect(wrapper.text()).toContain("Please enter a valid email address");
  });

  it("shows error when picture is missing", async () => {
    const wrapper = await mountForm();
    await wrapper.find('input[placeholder="Name"]').setValue("John Doe");
    await wrapper
      .find('input[placeholder="9 digit number"]')
      .setValue("123456789");
    await wrapper
      .find('input[placeholder="email@example.com"]')
      .setValue("john@example.com");
    await wrapper.find("form").trigger("submit");
    expect(wrapper.text()).toContain("A picture is required");
  });

  it("shows no errors when form is valid", async () => {
    const wrapper = await mountForm();
    await wrapper.find('input[placeholder="Name"]').setValue("John Doe");
    await wrapper
      .find('input[placeholder="9 digit number"]')
      .setValue("123456789");
    await wrapper
      .find('input[placeholder="email@example.com"]')
      .setValue("john@example.com");
    await wrapper.find("form").trigger("submit");
    expect(wrapper.text()).not.toContain(
      "Name must be longer than 5 characters",
    );
    expect(wrapper.text()).not.toContain("Contact must be exactly 9 digits");
    expect(wrapper.text()).not.toContain("Please enter a valid email address");
  });
});
