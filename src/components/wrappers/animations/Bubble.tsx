import {motion} from "framer-motion";

interface BubbleProps {
    children: React.ReactNode,
}

function Bubble({children} : BubbleProps) {
    return(
        <motion.div
            initial={{scale: 0}}
            animate={{scale: 1}}
            exit={{scale: 0}}
        >
            {children}
        </motion.div>
    )
}

export default Bubble