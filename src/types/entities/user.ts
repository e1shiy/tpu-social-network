import type {CommunityPreview} from "./community.ts";
import type {ChatPreview} from "./chat.ts";
import type {Role} from "./role.ts";
import type {Friendship} from "./friendship.ts";
import type {PostPreview} from "./post.ts";

export type User = UserCredentials & UserDetails & UserSharedConnections & UserChats & UserProfile

export function hasUserCredentials(user: Partial<User>): user is UserCredentials {
    return (!!(
        (user as UserCredentials).id &&
        (user as UserCredentials).email &&
        (user as UserCredentials).name &&
        (user as UserCredentials).surname
    ))
}

export function hasUserDetails(user: Partial<User>): user is UserDetails {
    return (!!(
        (user as UserDetails).role &&
        (user as UserDetails).isNotificationShown &&
        (user as UserDetails).isVerified &&
        (user as UserDetails).isActive &&
        (user as UserDetails).isOnlineShown
    ))
}

export function hasUserSharedConnections(user: Partial<User>): user is UserSharedConnections {
    return (!!(
        (user as UserSharedConnections).communities.length &&
        (user as UserSharedConnections).friendships.length &&
        (user as UserSharedConnections).posts.length
    ))
}

export function hasUserChats(user: Partial<User>): user is UserChats {
    return (!!(user as UserChats).list.length)
}

export function hasUserPreview(user: Partial<User>): user is UserPreview {
    return (hasUserCredentials(user) &&
        !!(user as UserPreview).group &&
        !!(user as UserPreview).school &&
        !!(user as UserPreview).status &&
        !!(user as UserPreview).isOnline
    )
}

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

