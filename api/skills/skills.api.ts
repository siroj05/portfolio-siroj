import axios from "axios";
import { Categories } from "./type";
import { BASE_URL } from "../experiences";
import { ResponseApi } from "../type";

export const CreateSkills = async ({
    category,
    skills
}: Categories) => {
    const formData = new FormData()
    formData.append("category", category)

    skills.forEach((item, i) => {
        formData.append(`skills[${i}][name]`, item.name)
        if (item.icon) {
            formData.append(`skills[${i}][icon]`, item.icon)
        }
    })

    try {
        const res = await axios.post(`${BASE_URL}/skills/save`, formData, { withCredentials: true })
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

export const GetAllCategories = async <T = Categories[]>(): Promise<ResponseApi<T>> => {
    try {
        const res = await axios.get(`${BASE_URL}/skills`, {withCredentials : true})

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

export const DeleteCategories = async (id : string) => {
    try {
        const res = await axios.delete(`${BASE_URL}/skills/${id}`, {withCredentials : true})
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