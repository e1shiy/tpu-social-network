import type {UserPreviewResponse} from "./user.ts";
import type {CommunityMember, JoinedCommunityMember} from "../domain";
import type {PostResponse} from "./post.ts";

export type CommunityPreviewResponse = {
    name: string;
    description: string;
    avatarURL: string;
    memberAmount: number;
}

export type CommunityResponse = CommunityPreviewResponse & {
    owner: UserPreviewResponse;
    creationDate: string;
    posts: CommunityPostsResponse;
    members?: JoinedCommunityMemberResponse[];
}
export type CommunityFullResponse = Required<CommunityResponse>

export type CommunityMemberResponse = UserPreviewResponse & CommunityMember; // ручка пользователей
export type JoinedCommunityMemberResponse = UserPreviewResponse & Omit<JoinedCommunityMember, "joiningDate"> & {
    joiningDate: string;
}; // get-параметр ручки полной инфы сообщества

export type CommunityPostsResponse = PostResponse[]