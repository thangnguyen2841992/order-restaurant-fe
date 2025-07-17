import {jwtDecode} from "jwt-decode";
import UserToken from "../model/UserToken";

export function getUserToken(): UserToken {
    const token = localStorage.getItem('token');
    if (token) {
        return jwtDecode(token) as UserToken;
    } else {
        return {};
    }
}

export async function myRequest(url: string) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Không thể kết nối đến URL: " + url);
    }

    return response.json();
}

export async function myRequestToken(url: string, options?: RequestInit) {
    const fetchOptions = {
        ...options,
        headers: {
            ...options?.headers,
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Thêm token vào header
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        throw new Error("Không thể kết nối đến URL: " + url);
    }

    return response.json();
}

export function formatDate(date: string) {
    let date1 : Date;
    if (date === undefined) {
        date1 = new Date()
    } else {
        date1 = new Date(date)
    }
    return date1.toLocaleDateString('vi-VN');
}

export const formatDateTime = (date:string) => {
    let date1 : Date;
    if (date === '') {
        date1 = new Date()
    } else {
        date1 = new Date(date)
    }
    return date1.toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

export const isTokenExpired = () => {
    const expiration = localStorage.getItem('expirationTime');
    if (!expiration) return true; // Nếu không tìm thấy, coi như hết hạn
    return Date.now() > parseInt(expiration);
};