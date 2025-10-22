import type {FriendshipType} from "../domain";
import type {UserPreviewResponse} from "./user.ts";

export type FriendshipResponse = {
    id: number;
    type: FriendshipType;
    target: UserPreviewResponse;
    creationDate: string;
}

