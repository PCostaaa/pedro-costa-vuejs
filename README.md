# Vue.js Contacts Manager

A contact management app built with Vue 3, delivered from scratch to a working, tested product as part of a technical assessment.

**Portfolio:** [pcostaaa.github.io/Portfolio](https://pcostaaa.github.io/Portfolio/)

## Features

- **Authentication** – login screen with protected routes
- **Route guards** – Vue Router navigation guards block access to private pages when logged out
- **Full CRUD** – list, view, create, edit and delete contacts
- **Form validation** – inline validation with clear error messages
- **Delete confirmation** – modal before removing a contact
- **Persistence** – data saved in `localStorage`
- **Automated tests** – components and logic tested with Vitest and Vue Test Utils

## Tech stack

Vue 3 (Composition API) · Vue Router · Vite · Vitest · Vue Test Utils · happy-dom · PrimeIcons

## Project structure

```
src/
  views/        ContactList, ContactDetail, ContactForm, LoginView
  components/   ContactCard, DeleteModal
  router/       routes and navigation guards
  tests/        Vitest unit tests
  auth.js       authentication logic
  storage.js    localStorage persistence
```

## Getting started

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev      # start the dev server
npm test         # run the tests
npm run build    # production build
```

## Author

**Pedro Costa** – Web Developer
[LinkedIn](https://www.linkedin.com/in/pedroabcosta/) · [GitHub](https://github.com/PCostaaa) · [Behance](https://www.behance.net/pedrocosta262)
