import type {Message} from "./message.ts";
import type {ChatParticipant} from "../domain";
import type {User} from "./user.ts";

export type Chat = {
    id: number;
    type: "private" | "group"
    info: {
        name: string;
        avatarURL: string;
    }
    details: {
        owner: User;
        creationDate: Date;
    }
    messages: Message[];
    participants: (User & ChatParticipant)[];
}