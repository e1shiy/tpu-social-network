import {useSearchParams} from "react-router-dom";
import {useAuth} from "../api";
import LoadingSpinner from "./LoadingSpinner.tsx";
import {useEffect} from "react";
import {AUTH_STATE_KEY} from "../constants";

function AuthCallback() {
    const [searchParams] = useSearchParams();
    const state = searchParams.get("state")
    const code = searchParams.get("code")

    const {mutate, isPending, isError} = useAuth()

    useEffect(() => {
        if (state && state === sessionStorage.getItem(AUTH_STATE_KEY) && code) {
            mutate(code)
            sessionStorage.removeItem(AUTH_STATE_KEY)
        }
    }, [state, code])

    if (isPending) {
        return <LoadingSpinner />
    }
    if (isError) {
        return <h1>Ошибка авторизации</h1> // todo error ui
    }
}

export default AuthCallback;