import type {ChatParticipant, ChatType} from "../domain";
import type {UserPreviewResponse} from "./user.ts";
import type {MessagePreviewResponse, MessageResponse} from "./message.ts";

export type BaseChat = {
    id: number;
    type: ChatType;
    name: string;
    avatarURL: string;
}

export type ChatParticipantResponse = UserPreviewResponse & Omit<ChatParticipant, "joiningDate"> & {
    joiningDate: string;
}

export type ChatMessagesResponse = MessageResponse[];

export type ChatPreviewResponse = BaseChat & {
    lastMessage: MessagePreviewResponse;
    unreadMessageAmount: number;
}

export type ChatResponse = BaseChat & {
    owner: UserPreviewResponse;
    creationDate: string;
    participants: ChatParticipantResponse[];
}