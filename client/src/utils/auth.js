import { jwtDecode } from "jwt-decode";

export const saveToken = (token) => localStorage.setItem("authToken", token);
export const getToken = () => localStorage.getItem("authToken");
export const logout = () => localStorage.removeItem("authToken");

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  try {
    const { exp } = jwtDecode(token);
    return exp * 1000 > Date.now(); // valid?
  } catch {
    return false;
  }
};

export const getUserInfo = () => {
  const token = getToken();
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};
