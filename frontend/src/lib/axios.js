import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:2275",
    withCredentials: true,
})