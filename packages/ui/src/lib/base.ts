import axios from "axios";

type Methods = "PUT" | "DELETE" | "GET" | "POST";

export const apiURL = "http://medialinks.dev";

export const request = async (url: string, options: { method: Methods; body?: any }) => {
  return await axios({
    method: options.method,
    url: apiURL + url,
    data: options.body,
  });
};
