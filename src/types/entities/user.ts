import type {Community} from "./community.ts";
import type {Chat} from "./chat.ts";
import type {Role} from "./role.ts";
import type {Friendship} from "./friendship.ts";
import type {Post} from "./post.ts";

export type User = UserCredentials & UserDetails & UserSharedConnections & UserChats & UserProfile

export type UserCredentials = {
    id: number;
    email: string;
    password: string;
}

export type UserDetails = {
    id: number;
    role: Role;
    isOnlineShown: boolean;
    isNotificationShown: boolean;
    isActive: boolean;
    isVerified: boolean;
}

export type UserSharedConnections = {
    id: number;
    communities: Community[];
    friendships: Friendship[];
    posts: Post[];
}

export type UserChats = {
    id: number;
    list: Chat[];
}

export type UserPreview = {
    id: number;
    name: string;
    group: string;
    school: string;
    status: "teacher" | "student" | "guest";
    isOnline: boolean;
}

export type UserProfile = UserPreview & UserSharedConnections & {
    bio: string;
    gender: boolean; // 0 - man, 1 - woman
    birthday: Date;
    lastLogin: Date;
}

