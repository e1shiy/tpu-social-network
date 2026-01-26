import {HTMLMotionProps, motion} from "framer-motion";

interface BubbleProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode,
}

function Bubble({children, ...props} : BubbleProps) {
    return(
        <motion.div
            initial={{scale: 0}}
            animate={{scale: 1}}
            exit={{scale: 0}}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export default Bubble