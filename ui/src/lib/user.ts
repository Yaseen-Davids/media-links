import axios from "axios";

export const whoami = async (): Promise<any> => await fetch("/users/whoami/dashjsdahjdsa", { method: "GET" });

export const login = async (fields: { username: string; password: string }) =>
  await axios.post("/users/login", fields, {
    withCredentials: true,
  });

export const logout = async (): Promise<any> => await axios.get("/users/logout");
