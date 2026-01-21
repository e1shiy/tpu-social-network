import {apiClient} from "./index.ts";
import {UserCredentialsResponse, UserPreviewResponse} from "../types/api";
import {useStore} from "../store/store.ts";
import {useQuery} from "@tanstack/react-query";
import {FALLBACK_USER_PREVIEW} from "../constants/api/users.ts";
import {UserPreview} from "../types/entities";

const _fetchCredentials = async (userId: string | null): Promise<UserCredentialsResponse> => {
    if (!userId) {
        throw new Error("No user id provided");
    }
    const response = await apiClient.get<UserCredentialsResponse>(`users/credentials/${userId}`);
    return response.data
}

export const useGetUserCredentials = () => {
    const userId = useStore().userId
    return useQuery<UserCredentialsResponse>({
        queryKey: ["userCredentials", userId],
        queryFn: () => _fetchCredentials(userId),
        enabled: !!userId,
    })
}

const _fetchPreview = async (userId: string | null): Promise<UserPreview> => {
    if (!userId) {
        throw new Error("No user id provided");
    }
    const response = await apiClient.get<UserPreviewResponse>(`users/preview/${userId}`)
    return response.data
}

export const useGetUserPreview = () => {
    const userId = useStore().userId
    return useQuery<UserPreview>({
        queryKey: ["userPreview", userId],
        queryFn: () => _fetchPreview(userId),
        placeholderData: FALLBACK_USER_PREVIEW,
        enabled: !!userId
    })
}