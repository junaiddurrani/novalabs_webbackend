export default function authHeader() {
  const token = localStorage.getItem('token');

  if (token) {
    return { "auth-token": token };
  } else {
    return {};
  }
}