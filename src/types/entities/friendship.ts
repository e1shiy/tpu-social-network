export type Friendship = {
    id: number;
    status: "accepted" | "rejected" | "blocked" | "pending";
    creationDate: Date;
}

export type AcceptedFriendship = Friendship & {
    status: "accepted";
    acceptDate: Date;
}
