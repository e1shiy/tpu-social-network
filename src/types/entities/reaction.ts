import type {Comment} from "./comment.ts"
import type {Post} from "./post.ts";
import type {Message} from "./message.ts";
import type {User} from "./user.ts";

export type Reaction = {
    id: number;
    type: "like" | "dislike";
    creationDate: Date;
    author: User;
    target: Post | Comment | Message;
}