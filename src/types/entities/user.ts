import type {Community} from "./community.ts";
import type {Chat} from "./chat.ts";
import type {Role} from "./role.ts";
import type {Friendship} from "./friendship.ts";

export type User = {
    id: number;
    role: Role;
    credentials: {
        email: string;
        password: string;
    }
    profile: {
        name: string;
        bio: string;
        gender: boolean; // 0 - man, 1 - woman
        birthday: Date;
        status: "teacher" | "student" | "guest";
        group: string
        school: string
    }
    preferences: {
        isOnlineShown: boolean;
        isNotificationShown: boolean;
    },
    details: {
        isActive: boolean;
        isVerified: boolean;
        lastLogin: Date;
    }
    communities: Community[];
    chats: Chat[];
    friendships: Friendship[];
}