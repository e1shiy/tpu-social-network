import type {UserPreview} from "./user.ts";
import type {FriendshipType} from "../domain";

type BaseFriendship = {
    id: number;
    status: FriendshipType;
    target: UserPreview;
    creationDate: Date;
}

export type Friendship = PendingFriendship | AcceptedFriendship | BaseFriendship;

export type PendingFriendship = BaseFriendship & {
    status: "pending";
}

export type AcceptedFriendship = BaseFriendship & {
    status: "accepted";
    acceptDate: Date;
}