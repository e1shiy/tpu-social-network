import {RefObject, useEffect} from "react";

export const useClickOutside = (ref: RefObject<HTMLElement | null>, handler: (event: MouseEvent) => void) => {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            const target = event.target;
            if (ref.current && !ref.current.contains(target as Node)) {
                handler(event)
            }
        }
        document.addEventListener("click", listener)
        return () => document.removeEventListener("click", listener)
    }, [ref, handler])
}