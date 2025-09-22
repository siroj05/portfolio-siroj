import axios from "axios"
import { BASE_URL } from "../messages"
import { ProfileModel } from "./type"

export const CreateProfile = async ({
    id,
    userId,
    image,
    fullName,
    jobTitle,
    email,
    linkedin,
    repository,
    about
}:ProfileModel) => {
    const formData = new FormData()
    if (image && image[0]){
        formData.append("image", image[0])
    }
    formData.append("userId", userId.toString())
    formData.append("fullName", fullName)
    formData.append("jobTitle", jobTitle)
    formData.append("email", email)
    formData.append("linkedin", linkedin)
    formData.append("repository", repository)
    formData.append("about", about)
    try {
        const res = await axios.post(`${BASE_URL}/profile/save`,
            formData,
            {
                withCredentials : true,
                headers : {
                    "Content-Type" : "multipart/form-data"
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