import {useEffect} from "react";
import BaseModal from "./BaseModal.tsx";
import {AnimatePresence} from "framer-motion";
import Fade from "./wrappers/animations/Fade.tsx";

interface ModalProps {
    children: React.ReactNode,
    onOpen?: () => void,
    onClose?: () => void
}

function Modal({children, onClose, onOpen}: ModalProps) {
    useEffect(() => {
        onOpen?.()
        const handleEsc = (e: KeyboardEvent) => e.code === "Escape" && onClose?.()
        window.addEventListener("keydown", handleEsc)
        document.body.style.overflow = "hidden"
        return () => {
            window.removeEventListener("keydown", handleEsc)
            document.body.style.overflow = "unset"
        }
    }, [])

    return(
        <BaseModal>
            <AnimatePresence>
                <Fade>
                    <div
                        onClick={onClose}
                        className={"fixed inset-0 flex-center w-screen h-screen bg-dark/60"}
                        role={"dialog"}
                        aria-modal={"true"}
                    >
                        <div onClick={(e) => e.stopPropagation()}>
                            {children}
                        </div>
                    </div>
                </Fade>
            </AnimatePresence>
        </BaseModal>
    )
}

// todo перейти на библиотечную версию, так как тут нет focus-trap

export default Modal