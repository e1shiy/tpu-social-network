import type {UserCredentials, UserDetails, UserPreview} from "../entities";
import type {RoleType} from "../domain";
import type {FriendshipResponse} from "./friendship.ts";
import type {CommunityPreviewResponse} from "./community.ts";
import type {PostResponse} from "./post.ts";
import type {ChatPreviewResponse} from "./chat.ts";

export type UserCredentialsResponse = UserCredentials
export type UserPreviewResponse = UserPreview
export type UserProfileResponse = UserPreviewResponse & {
    bio: string;
    gender: boolean; // 0 - man, 1 - woman
    birthday: string; // date
    lastLogin: string; // date
    posts?: PostResponse[];
    communities?: CommunityPreviewResponse[];
    friendships?: FriendshipResponse[];
}
export type UserFullProfileResponse = Required<UserProfileResponse>

export type UserChatsResponse = ChatPreviewResponse[]
export type UserDetailsResponse = UserCredentials & Omit<UserDetails, "role"> & {
    role: RoleType
}
