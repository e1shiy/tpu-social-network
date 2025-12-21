import {AUTH_CALLBACK_ROUTE, AUTH_ROUTE} from "../constants";
import {AUTH_STATE_KEY, REDIRECT_PATH_KEY} from "../constants";

const redirectUrl = window.location.origin + AUTH_CALLBACK_ROUTE

export async function redirectToExternalAuth() {
    sessionStorage.setItem(REDIRECT_PATH_KEY, redirectUrl);

    const state = await _generateState()
    const codeChallenge = "codeChallenge" // todo code challenge

    window.location.replace(AUTH_ROUTE({clientId: import.meta.env.VITE_TPU_OAUTH_CLIENT_ID, redirectUrl: redirectUrl, state: state, codeChallenge: codeChallenge}));
    // todo при попытке входа с главной страницы стрелка назад туповатая, мб в проде такого не будет, надо смотреть
}

async function _generateState() {
    const state = "state" // todo state
    sessionStorage.setItem(AUTH_STATE_KEY, state);
    return state
}

export default redirectToExternalAuth;