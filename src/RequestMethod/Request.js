import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL = "http://localhost:3000";
const TOKEN = Cookies.get("tokenJwt");
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const TokenRequest = axios.create({
  baseURL: BASE_URL,
  headers: { authorization: `Bearer ${TOKEN}` },
});
