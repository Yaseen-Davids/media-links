import axios from "axios";
import { apiURL } from "./base";

export const whoami = async (): Promise<any> => await axios.get(`${apiURL}/api/users/whoami`);

export const login = async (fields: { username: string; password: string }) =>
  await axios.post(`${apiURL}/api/users/login", fields`, {
    withCredentials: true,
  });

export const logout = async (): Promise<any> => await axios.get(`${apiURL}/api/users/logout`);
