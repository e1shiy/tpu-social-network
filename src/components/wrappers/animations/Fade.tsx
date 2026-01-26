import {motion, HTMLMotionProps} from "framer-motion";


interface FadeProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode
}

function Fade({children, ...props}: FadeProps) {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{ease: "easeOut", duration: .15}}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export default Fade