import type {MediaFile} from "./mediafile.ts";
import type {Reaction} from "./reaction.ts";
import type {Chat} from "./chat.ts";
import type {User} from "./user.ts";

export type Message = {
    id: number;
    author: User;
    target: Chat;
    content: {
        text: string;
        attachments: MediaFile[];
    }
    reactions: Reaction[];
    details: {
        creationDate: Date;
        isEdited: boolean;
    }
};