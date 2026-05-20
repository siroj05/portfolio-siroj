import { config } from "@/lib/config";
import { Experiences } from "./type"
import axios from "axios";
import { formatDate } from "@/lib/format-date";
import { ResponseApi } from "../type";

export const BASE_URL = config.baseUrl

export const CreateExperience = async ({
    position,
    office,
    start,
    end,
    description,
    present
}: Experiences) => {
    try {
        const res = await axios.post(`${BASE_URL}/experiences/save`,
            {
                office,
                position,
                start: start,
                end: end ? end : null,
                description,
                present
            },
            { withCredentials: true }
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

export const GetAllExperiences = async <T = Experiences[]>(): Promise<ResponseApi<T>> => {
    try {
        const res = await axios.get(`${BASE_URL}/experiences`, {
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

export const GetExperienceById = async <T = Experiences>(id: string): Promise<ResponseApi<T>> => {
    try {
        const res = await axios.get(`${BASE_URL}/experiences/${id}`, {
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

export const DeleteExperience = async (id: string) => {
    try {
        const res = await axios.delete(`${BASE_URL}/experiences/${id}`,
            { withCredentials: true }
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

export const UpdateExperience = async ({ id, position,
    office,
    start,
    end,
    description,
    present
}: Experiences) => {
   
    try {
        const res = await axios.put(`${BASE_URL}/experiences/update`,
            {
                id,
                office,
                position,
                start: start,
                end: end ? end : null,
                description,
                present
            },
            { withCredentials: true }
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