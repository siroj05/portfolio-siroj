import { config } from "@/lib/config";
import { GetMeModel, LoginUser } from "./type";
import axios from "axios";
import { ResponseApi } from "../type";

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

export const GetMe = async <T = GetMeModel[]>(): Promise<ResponseApi<T>> => {
    try {
        const res = await axios.get(`${config.baseUrl}/auth/me`,
            {withCredentials: true}
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