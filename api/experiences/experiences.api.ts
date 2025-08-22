import { config } from "@/lib/config";
import {Experiences} from "./type"
import axios from "axios";
import { formatDate } from "@/lib/format-date";

export const BASE_URL = config.baseUrl

export const CreateExperience = async ({
    position,
    office,
    startFrom,
    to,
    description
}:Experiences) => {
    
    try {
        const res = await axios.post(`${BASE_URL}/experiences/save`,
            {
                office,
                position,
                start : formatDate(startFrom?.toString()),
                end : formatDate(startFrom?.toString()),
                description
            },
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