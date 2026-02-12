import {RefObject, useEffect, useRef} from "react";

export const useClickOutside = (ref: RefObject<HTMLElement | null>, handler: (event: MouseEvent) => void) => {
    const handlerRef = useRef(handler)

    useEffect(() => {
        handlerRef.current = handler
    }, [handler])

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            const target = event.target;
            if (ref.current && !ref.current.contains(target as Node)) {
                handlerRef.current(event)
            }
        }
        document.addEventListener("click", listener)
        return () => document.removeEventListener("click", listener)
    }, [ref])
}