import {HTMLMotionProps, motion} from "framer-motion";

interface SlideDownProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode,
}

function SlideDown({children, ...props}: SlideDownProps) {
    return (
        <motion.div
            initial={{height: 0}}
            animate={{height: "auto"}}
            exit={{height: 0}}
            transition={{duration: .1}}
            className={"overflow-hidden"}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export default SlideDown