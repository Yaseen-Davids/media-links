import axios from "axios";

export const whoami = async (): Promise<any> =>
  await axios.get("/users/whoami");

export const login = async (fields: { username: string; password: string }) =>
  await axios.post("/users/login", fields, {
    withCredentials: true,
  });
