import {SetStateAction} from "react";

const _onCopy = (setIsCopied: (value: SetStateAction<boolean>) => void, setIsCopyError: (value: SetStateAction<boolean>) => void) => {
    setIsCopyError(false)
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
}
const _onCopyError = (setIsCopyError: (value: SetStateAction<boolean>) => void) => {
    setIsCopyError(true)
    setTimeout(() => setIsCopyError(false), 2000);
}

export function copy(value: string, setIsCopied: (value: SetStateAction<boolean>) => void, setIsCopyError: (value: SetStateAction<boolean>) => void) {
    return async () => {
        try {
            await navigator.clipboard.writeText(value);
            _onCopy(setIsCopied, setIsCopyError)
        } catch (e) {
            _onCopyError(setIsCopyError)
            console.error("Error while copying: " + e)
        }
    }
}