import { jwtDecode } from "jwt-decode";
import UserToken from "../model/UserToken";

export function getUserToken(): UserToken {
    const token = localStorage.getItem('token');
    if (token) {
        return jwtDecode(token) as UserToken;
    } else {
        return {};
    }
}