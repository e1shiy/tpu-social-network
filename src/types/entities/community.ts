import type {Post} from "./post.ts";
import type {CommunityMember} from "../domain";
import type {User} from "./user.ts";

export type Community = {
    id: number;
    info: {
        name: string;
        description: string;
        avatarURL: string;
    }
    details: {
        owner: User;
        creationDate: Date;
    }
    posts: Post[];
    members: (User & CommunityMember)[];
}