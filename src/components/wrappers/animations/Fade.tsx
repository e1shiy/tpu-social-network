import { motion, AnimatePresence } from "framer-motion";


interface FadeProps {
    children: React.ReactNode,
    isVisible: boolean
}

function Fade({children, isVisible} : FadeProps) {
    return(
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{ ease: "easeOut", duration: .15 }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Fade