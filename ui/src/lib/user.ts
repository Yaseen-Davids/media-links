import axios from "axios";

export const whoami = async (): Promise<any> => await axios.get(`/api/users/whoami`);

export const tokenLogin = async (fields: { username: string; password: string }): Promise<any> =>
  await axios.post("/api/users/token/login", fields, {
    withCredentials: true,
  });

export const login = async (fields: { username: string; password: string; keepLoggedIn: boolean }) =>
  await axios.post("/api/users/login", fields, {
    withCredentials: true,
  });

export const logout = async (): Promise<any> => await axios.get("/api/users/logout");
