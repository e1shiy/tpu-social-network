// import {
//     hasUserChats,
//     hasUserCredentials, hasUserDetails, hasUserPreview, hasUserSharedConnections,
//     User, UserChats,
//     UserCredentials,
//     UserDetails,
//     UserPreview,
//     UserSharedConnections
// } from "../types/entities"
import { StateCreator } from "zustand/vanilla";
import {Store} from "./store.ts";
//
// export type UserState = {
//     user: Partial<User>,
//     updateUser: (data: Partial<User>) => void,
//     ensureCredentials: () => Promise<void>,
//     ensureDetails: () => Promise<void>,
//     ensureSharedConnections: () => Promise<void>,
//     ensurePreview: () => Promise<void>,
//     ensureChats: () => Promise<void>,
// }
//
// export const createUserSlice: StateCreator<Store, [], [], UserState> = (set, get) => ({
//     user: {},
//     updateUser: (data: Partial<User>) => set(state => ({ user: {...state.user, ...data} })),
//     ensureCredentials: async () => {
//         const state = get()
//         if (hasUserCredentials(state.user)) return
//
//         try {
//             // todo query
//             const userCredentials: UserCredentials = {
//                 id: 1,
//                 email: "1eshiy@vk.com",
//                 name: "Алексей",
//                 surname: "Веретнов"
//             }
//
//             get().updateUser(userCredentials)
//         } catch (e) {
//             console.error(`Error while cathing UserCredentials: ${e}`)
//         }
//     },
//     ensureDetails: async () => {
//         const state = get()
//         if (hasUserDetails(state.user)) return
//
//         try {
//             // todo query
//             const userDetails: UserDetails = {
//                 role: {
//                     type: "user"
//                 },
//                 isOnlineShown: true,
//                 isActive: true,
//                 isVerified: true,
//                 isNotificationShown: true,
//             }
//
//             get().updateUser(userDetails)
//         } catch (e) {
//             console.error(`Error while cathing UserDetails: ${e}`)
//         }
//     },
//     ensureSharedConnections: async () => {
//         const state = get()
//         if (hasUserSharedConnections(state.user)) return
//
//         try {
//             // todo query
//             const userSharedConnections: UserSharedConnections = {
//                 communities: [],
//                 friendships: [],
//                 posts: []
//             }
//
//             get().updateUser(userSharedConnections)
//         } catch (e) {
//             console.error(`Error while cathing UserSharedConnections: ${e}`)
//         }
//     },
//     ensurePreview: async () => {
//         const state = get()
//         if (hasUserPreview(state.user)) return
//
//         try {
//             // todo query
//             const userPreview: UserPreview = {
//                 id: 1,
//                 email: "1eshiy@vk.com",
//                 name: "Алексей",
//                 surname: "Веретнов",
//                 isOnline: true,
//                 group: "8К43",
//                 school: "ИШИТР",
//                 status: "student",
//             }
//
//             get().updateUser(userPreview)
//         } catch (e) {
//             console.error(`Error while cathing UserPreview: ${e}`)
//         }
//     },
//     ensureChats: async () => {
//         const state = get()
//         if (hasUserChats(state.user)) return
//
//         try {
//             // todo query
//             const userChats: UserChats = {
//                 list: []
//             }
//
//             get().updateUser(userChats)
//         } catch (e) {
//             console.error(`Error while cathing UserChats: ${e}`)
//         }
//     }
// })

export type UserState = {
    userId: string | null,
    accessToken: string | null,
    login: (userId: string) => void;
    setAccessToken: (token: string) => void;
}

export const createUserSlice: StateCreator<Store, [], [], UserState> = (set, ) => ({
    userId: null,
    accessToken: null,
    login: (userId: string) => set({ userId }),
    setAccessToken: (token: string) => set({ accessToken: token }),
})