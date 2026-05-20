import axios from "axios"
import { BASE_URL } from "../messages"
import { ProfileModel } from "./type"
import { ResponseApi } from "../type"

export const CreateProfile = async ({
    // id,
    userId,
    image,
    fullName,
    jobTitle,
    email,
    linkedin,
    repository,
    about,
    phoneNumber,
    location
}: ProfileModel) => {
    const formData = new FormData()
    if (image) {
        formData.append("image", image)
    }
    formData.append("userId", userId!.toString()!)
    formData.append("fullName", fullName)
    formData.append("jobTitle", jobTitle)
    formData.append("email", email)
    formData.append("linkedin", linkedin)
    formData.append("repository", repository)
    formData.append("about", about)
    formData.append("phoneNumber", phoneNumber)
    formData.append("location", location)

    try {
        const res = await axios.post(`${BASE_URL}/profile/save`,
            formData,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
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

export const GetProfileById = async <T = ProfileModel>(id : number): Promise<ResponseApi<T>> => {
    console.log("masukkkkk")
    try {
        const res = await axios.get(`${BASE_URL}/profile/${id}`, { withCredentials: true })
        console.log(res)
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

export const GetProfileMe = async <T = ProfileModel[]>(): Promise<ResponseApi<T>> => {
    try {
        const res = await axios.get(`${BASE_URL}/profile/me`)
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