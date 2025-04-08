import { jwtDecode } from "jwt-decode";

const Auth = {
  setToken: (token) => {
    localStorage.setItem("token", token);
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  getCustomerId: () => {
    const token = Auth.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      return decoded.customerId || decoded.id; // Ensure correct field
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  },

  isAuthenticated: () => {
    const token = Auth.getToken();
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      return decoded.exp > currentTime; // Check expiration
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login page
  },
};

export default Auth;
