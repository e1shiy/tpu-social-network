import axios, {HttpStatusCode} from "axios";
import redirectToExternalAuth from "../services/authService.ts";
import {AuthResponse} from "./auth.ts";
import {useStore} from "../store/store.ts";

const apiClient = axios.create({
    baseURL: 'https://api.example.com', // todo url
    timeout: 500,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json', // todo token?
        'Accept': 'application/json',
    }
})
export default apiClient

// todo interceptors

let isRefreshing = false
let failedQueue: Array<{ resolve: () => void; reject: (error: any) => void }> = []
const processQueue = (error: any) => {
    failedQueue.forEach(promise => error ? promise.reject(error) : promise.resolve())
    failedQueue = []
}

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        const status = error?.response?.status

        if (originalRequest.url === "/refresh") {
            redirectToExternalAuth()
            return Promise.reject(error)
        }

        if (status === HttpStatusCode.Unauthorized) {
            // todo может нужно помечать повторный запрос, чтоб рекурсии не было

            if (isRefreshing) {
                return new Promise<void>(
                    (resolve, reject) => failedQueue.push({resolve, reject})
                )
                    .then(() => apiClient(originalRequest))
                    .catch(err => Promise.reject(err))
            }

            isRefreshing = true
            try {
                const response = await apiClient.post<AuthResponse>("/refresh")
                const { access_token, user_id } = response.data

                const state = useStore.getState()
                state.login(user_id)
                state.setAccessToken(access_token)

                processQueue(null)
                return apiClient(originalRequest) // todo мб нужно руками токен прикрепить в headers
            } catch (e) {
                processQueue(e)
                // todo logout
                redirectToExternalAuth()
                return Promise.reject(e)
            } finally {
                isRefreshing = false
            }
        }
        return Promise.reject(error)
    }
)