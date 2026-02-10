export const NOT_FOUND_ROUTE = "/not-found"
export const MESSENGER_ROUTE = "/messenger"
export const COMMUNITIES_ROUTE = "/communities"
export const FRIENDS_ROUTE = "/friends"
export const PROFILE_ROUTE = (id: string) => `/${id}`
export const MAIN_PAGE_ROUTE = `https://tpu.ru`
export const SCHEDULE_ROUTE = `https://ro-rasp.tpu.ru`
export const INBOX_ROUTE = "https://ex2.tpu.ru"
export const AUTH_ROUTE = (params: {
    state?: string,
    codeChallenge?: string,
    clientId: string,
    redirectUrl: string
}) => "https://oauth.tpu.ru/authorize/" + new URLSearchParams(params).toString()

export const AUTH_CALLBACK_ROUTE = "/auth-callback"