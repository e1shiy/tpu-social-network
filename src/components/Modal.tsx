import {useEffect} from "react";
import BaseModal from "./BaseModal.tsx";

interface ModalProps {
    children: React.ReactNode,
    isOpened: boolean,
    onOpen?: () => void,
    onClose?: () => void
}

function Modal({children, isOpened, onClose, onOpen}: ModalProps) {
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

    return (
        <BaseModal>
            {isOpened &&
                <div
                    onClick={onClose}
                    className={"fixed inset-0 flex-center w-screen h-[100dvh] backdrop-blur-[2px] bg-dark/60"}
                    role={"dialog"}
                    aria-modal={"true"}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        {children}
                    </div>
                </div>
            }
        </BaseModal>
    )
}

// todo перейти на библиотечную версию, так как тут нет focus-trap

export default Modal