import {AnimatePresence, motion} from "framer-motion";

interface SlideDownProps {
    children: React.ReactNode,
    isVisible: boolean
}

function SlideDown({children, isVisible}: SlideDownProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{height: 0}}
                    animate={{height: "auto"}}
                    exit={{height: 0}}
                    transition={{duration: .1}}
                    className={"overflow-hidden"}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default SlideDown