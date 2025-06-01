import { jwtDecode } from "jwt-decode";

export const jwtDecoder = (token: string) => {
    return jwtDecode(token);
}