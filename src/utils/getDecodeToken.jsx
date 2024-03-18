import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const getDecodeToken = () => {
  const token = Cookies.get("tokenJwt");
  return jwtDecode(token);
};
