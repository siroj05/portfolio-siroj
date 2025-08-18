import { config } from "@/lib/config";
import { LoginUser } from "./type";
import axios from "axios";

export const AuthLogin = async ({ name, password }: LoginUser) => {
    const res = await fetch(`${config.baseUrl}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ name, password })
    })
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Login gagal");
    }
    return res.json();
}

export const AuthLogout = async () => {
    try {
        const res = await axios.post(`${config.baseUrl}/auth/logout`, 
            null,
            {withCredentials:true}
        )
        return res.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMsg =
                typeof error.response?.data === "string"
                    ? error.response.data
                    : error.response?.data?.message || "Error fetching data";
            throw new Error(errorMsg.trim());
        }
        throw new Error("An unexpected error occurred");
    }
}