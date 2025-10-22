export type ChatParticipant = {
    role: "admin" | "moderator" | "member";
    isMuted: boolean;
    joiningDate: Date;
}
export type ChatType = "private" | "group";