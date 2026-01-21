import defaultAvatarUrl from "../../assets/images/default-avatar.png";
import {UserPreview, UserProfile} from "../../types/entities";

export const FALLBACK_USER_PREVIEW: UserPreview = {
    id: "nickname",
    name: "Пользователь",
    surname: "",
    avatarUrl: defaultAvatarUrl,
    status: "guest",
    school: "",
    group: "",
    email: "example@tpu.ru",
    isOnline: false
}

export const FALLBACK_USER_PROFILE: UserProfile = {
    id: "nickname",
    name: "Пользователь",
    surname: "",
    avatarUrl: defaultAvatarUrl,
    status: "guest",
    school: "",
    group: "",
    email: "example@tpu.ru",
    isOnline: false,
    bio: "Информация обо мне",
    lifePosition: "Моя жизненная позиция",
    friendships: [],
    communities: [],
    posts: []
}