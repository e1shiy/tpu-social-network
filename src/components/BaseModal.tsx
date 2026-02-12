import {createPortal} from "react-dom";
import {useMemo} from "react";

interface BaseModalProps {
    children: React.ReactNode,
}

function BaseModal({children}: BaseModalProps) {
    const modalRootElement = useMemo(() => document.getElementById("modal-root"), [])
    if (!modalRootElement) {
        console.error("#modal-root not found")
        return null
    }
    return createPortal(children, modalRootElement)
}

export default BaseModal