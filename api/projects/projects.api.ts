import axios from "axios";
import { Projects } from "./type";
import { BASE_URL } from "../experiences";

export const CreateProject = async ({
  image,
  title,
  description,
  techStack,
  demoUrl,
  githubUrl,
}: Projects) => {
  try {
    const response = await axios.post(`${BASE_URL}/projects/save`, {
      image,
      title,
      description,
      techStack,
      demoUrl,
      githubUrl,
    });
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
