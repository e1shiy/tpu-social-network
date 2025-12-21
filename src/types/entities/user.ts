import type {CommunityPreview} from "./community.ts";
import type {ChatPreview} from "./chat.ts";
import type {Role} from "./role.ts";
import type {Friendship} from "./friendship.ts";
import type {PostPreview} from "./post.ts";

export type User = UserCredentials & UserDetails & UserSharedConnections & UserChats & UserProfile

export type UserCredentials = {
    id: number;
    email: string;
    name: string;
    surname: string
}

export type UserDetails = {
    role: Role;
    isOnlineShown: boolean;
    isNotificationShown: boolean;
    isActive: boolean;
    isVerified: boolean;
}

export type UserSharedConnections = {
    communities: CommunityPreview[];
    friendships: Friendship[];
    posts: PostPreview[];
}

export type UserChats = {
    list: ChatPreview[];
}

export type UserPreview = UserCredentials & {
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

