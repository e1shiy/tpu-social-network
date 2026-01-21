import {motion} from "framer-motion";

interface SlideDownProps {
    children: React.ReactNode,
}

function SlideDown({children}: SlideDownProps) {
    return (
        <motion.div
            initial={{height: 0}}
            animate={{height: "auto"}}
            exit={{height: 0}}
            transition={{duration: .1}}
            className={"overflow-hidden"}
        >
            {children}
        </motion.div>
    )
}

export default SlideDown