import { getDecodeToken } from "./getDecodeToken";

export function getUserRole() {
  const decodedToken = getDecodeToken();
  if (decodedToken && decodedToken.role) {
    return decodedToken.role;
  }
}
