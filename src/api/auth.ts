import {useMutation} from "@tanstack/react-query";
import {apiClient} from "./index.ts";
import {useStore} from "../store/store.ts";
import {redirectToExternalAuth} from "../services/authService.ts";
import {REDIRECT_PATH_KEY} from "../constants/keys.ts";

export interface AuthResponse {
    user_id: string;
    access_token: string;
}

const _login = async (code: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth", code)
    return response.data
}

export const useAuth = () => {
    return useMutation<AuthResponse, Error, string>({
        mutationFn: _login,
        onSuccess: (data) => {
            const state = useStore.getState()
            state.login(data.user_id)
            state.setAccessToken(data.access_token)

            const redirectUrl = sessionStorage.getItem(REDIRECT_PATH_KEY)
            if (redirectUrl) {
                window.location.replace(redirectUrl)
            }
        },
        onError: () => {
            console.error("Error logging in")
            redirectToExternalAuth()
        }
    })
}