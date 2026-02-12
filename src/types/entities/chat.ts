import type {Message, MessagePreview} from "./message.ts";
import type {ChatParticipant} from "../domain";
import type {UserPreview} from "./user.ts";

type BaseChat = {
    id: number;
    type: "private" | "group"
    info: {
        name: string;
        avatarURL: string;
    }
}

export type Chat = BaseChat & {
    details: {
        owner: UserPreview;
        creationDate: Date;
    }
    messages: Message[];
    participants: (UserPreview & ChatParticipant)[];
}

export type ChatPreview = BaseChat & {
    lastMessage: MessagePreview;
    unreadMessageAmount: number;
}