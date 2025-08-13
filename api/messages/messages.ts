import { Messages } from "./type"
import axios from "axios"

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