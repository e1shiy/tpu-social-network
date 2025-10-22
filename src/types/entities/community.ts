import type {Post} from "./post.ts";
import type {JoinedCommunityMember} from "../domain";
import type {UserPreview} from "./user.ts";

export type Community = CommunityPreview & {
    details: {
        owner: UserPreview;
        creationDate: Date;
    }
    posts: Post[];
    members: (UserPreview & JoinedCommunityMember)[];
}

export type CommunityPreview = {
    id: number;
    info: {
        name: string;
        description: string;
        avatarURL: string;
    }
    memberAmount: number;
}