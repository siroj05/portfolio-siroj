import axios from "axios";
import { Projects } from "./type";
import { BASE_URL } from "../experiences";
import { ResponseApi } from "../type";

export const CreateProject = async ({
  image,
  title,
  description,
  techStack,
  demoUrl,
  githubUrl,
}: Projects) => {

  const formData = new FormData()
  if (image && image[0]) {
    formData.append("image", image[0])
  }
  formData.append("title", title)
  formData.append("description", description)
  formData.append("techStack", techStack)
  if (demoUrl) formData.append("demoUrl", demoUrl)
  if (githubUrl) formData.append("githubUrl", githubUrl)

  try {
    const response = await axios.post(`${BASE_URL}/projects/save`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMsg =
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message || "Error Creating Project";
      throw new Error(errorMsg.trim());
    }
    throw new Error("An unexpected error occurred");
  }
};

export const GetAllProjects = async <T = Projects[]>(): Promise<ResponseApi<T>> => {
  try {
    const res = await axios.get(`${BASE_URL}/projects`, {
      withCredentials : true
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