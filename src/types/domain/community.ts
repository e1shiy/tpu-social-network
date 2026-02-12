export type CommunityMember = JoinedCommunityMember | {
    status: "joined" | "pending" | "banned";
}

export type JoinedCommunityMember = {
    status: "joined"
    role: "admin" | "moderator" | "member";
    joiningDate: Date;
}