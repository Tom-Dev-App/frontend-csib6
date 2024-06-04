import Cookies from "js-cookie";
import axios from "axios";
import config from "../utils/config";

const authService = () => {
  const { SERVER_URL } = config();
  const login = async ({ email, password }) => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/auth/login`, {
        email,
        password,
      });
      const token = response.data?.token ?? null;
      const user = response.data?.user ?? null;
      // Save to cookies
      Cookies.set("token", token);
      Cookies.set("user", user);
    } catch (error) {
      throw error;
    }
  };

  const register = async ({ name, email, password }) => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/auth/register`, {
        name,
        email,
        password,
      });
      const { token, user } = response.data;

      // Save to cookies
      Cookies.set("token", token);
      Cookies.set("user", user);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    // Remove from cookies
    Cookies.remove("token");
    Cookies.remove("user");
  };

  const auth = () => {
    const token = Cookies.get("token") ?? null;
    const user = Cookies.get("user") ?? null;
    return { token, user };
  };

  return { login, register, logout, auth };
};

export default authService;
