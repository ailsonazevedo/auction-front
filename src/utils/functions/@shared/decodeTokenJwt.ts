import * as jose from "jose";

export function decodeToken(token: string) {
  return jose.decodeJwt(token);
}
