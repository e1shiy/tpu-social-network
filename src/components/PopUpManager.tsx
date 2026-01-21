import {useStore} from "../store/store.ts";
import BaseModal from "./BaseModal.tsx";
import PopUp from "./PopUp.tsx";
import {AnimatePresence, motion} from "framer-motion";

function PopUpManager() {
    const {popUps, hidePopUp} = useStore()
    return (
        <BaseModal>
            <div className={"z-1001 flex flex-col items-end fixed right-3 bottom-3 gap-2 lg:right-5 lg:bottom-5 lg:gap-3"}>
                <AnimatePresence>
                    {popUps.map(p => (
                        <motion.div
                            key={p.id}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            layout
                        >
                            <PopUp id={p.id} status={p.status} onClose={hidePopUp}>
                                {p.children}
                            </PopUp>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </BaseModal>
    )
}

export default PopUpManager