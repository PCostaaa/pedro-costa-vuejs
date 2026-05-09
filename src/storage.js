const CONTACTS_KEY = "contacts";

export function getContacts() {
  return JSON.parse(localStorage.getItem(CONTACTS_KEY) || "[]");
}

export function saveContacts(contacts) {
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
}

export function getContactById(id) {
  return getContacts().find((c) => c.id === id) || null;
}

export function addContact(contact) {
  const contacts = getContacts();
  contacts.push(contact);
  saveContacts(contacts);
}

export function updateContact(updated) {
  const contacts = getContacts().map((c) =>
    c.id === updated.id ? updated : c,
  );
  saveContacts(contacts);
}

export function deleteContact(id) {
  saveContacts(getContacts().filter((c) => c.id !== id));
}

export function isEmailUnique(email, excludeId = null) {
  return !getContacts().some((c) => c.email === email && c.id !== excludeId);
}

// export function isContactUnique(contact, excludeId = null) {
//   return !getContacts().some(
//     (c) => c.contact === contact && c.id !== excludeId,
//   );
// }
