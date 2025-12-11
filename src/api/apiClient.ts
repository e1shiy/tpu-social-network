import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://api.example.com', // todo url
    timeout: 500,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})
export default apiClient

// todo interceptors (401, 403, 408, 5xx)