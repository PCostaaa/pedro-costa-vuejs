const AUTH_KEY = "contacts-auth";

export function login(username, password) {
  if (username === "admin" && password === "admin123") {
    localStorage.setItem(AUTH_KEY, "true");
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated() {
  return localStorage.getItem(AUTH_KEY) === "true";
}
