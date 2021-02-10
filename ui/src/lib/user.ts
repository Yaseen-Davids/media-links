import axios from "axios";

export const whoami = async (token: string): Promise<any> => await axios.get(`/api/users/whoami/${token}`);

export const login = async (fields: { username: string; password: string; keepLoggedIn: boolean }) =>
  await axios.post("/api/users/login", fields, {
    withCredentials: true,
  });

export const logout = async (): Promise<any> => await axios.get("/api/users/logout");
