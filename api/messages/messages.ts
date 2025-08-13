import { number } from "zod"
import { ResponseApi } from "../type"
import { Messages } from "./type"
import axios from "axios"

// next ganti .env
export const BASE_URL = "http://localhost:8080"

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

export const GetAllMessages = async <T = Messages[]>():Promise<ResponseApi<T>> => {
    try {
        const res = await axios.get(`${BASE_URL}/messages`)
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

export const DeleteMessage = async <T>(id : number):Promise<ResponseApi<T>> => {
    try {
        const res = await axios.delete(`${BASE_URL}/messages/${id}`)
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