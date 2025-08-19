import { config } from "@/lib/config"
import { ResponseApi } from "../type"
import { Mark, Messages } from "./type"
import axios from "axios"

// next ganti .env
export const BASE_URL = config.baseUrl

export const CreateMessage = async ({ email, message }: Messages) => {
    try {
        const res = await axios.post(`${BASE_URL}/messages/send`, {
            email,
            message
        })

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

export const GetAllMessages = async <T = Messages[]>(): Promise<ResponseApi<T>> => {
    try {
        const res = await axios.get(`${BASE_URL}/messages`, {
            withCredentials: true
        })
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

export const DeleteMessage = async <T>(id: number): Promise<ResponseApi<T>> => {
    try {
        const res = await axios.delete(`${BASE_URL}/messages/${id}`,
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

export const DeleteAllMessages = async (): Promise<ResponseApi<void>> => {
    try {
        const res = await axios.delete(`${BASE_URL}/messages/delete-all`,{
            withCredentials: true
        })
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

export const MarkMessage = async ({ id, mark }: Mark) => {
    try {
        const res = await axios.put(`${BASE_URL}/messages/${id}/mark`,
            { mark },
            {withCredentials : true}
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

export const MarkAllMessages = async () => {
    try {
        const res = await axios.put(`${BASE_URL}/messages/mark-all`,
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