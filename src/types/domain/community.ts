export type CommunityMember = {
    status: "joined" | "pending" | "banned";
}

export type JoinedCommunityMember = CommunityMember & {
    status: "joined"
    role: "admin" | "moderator" | "member";
    joiningDate: Date;
}