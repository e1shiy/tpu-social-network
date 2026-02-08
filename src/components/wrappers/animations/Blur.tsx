import {motion, HTMLMotionProps} from "framer-motion";


interface BlurProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode
}

function Blur({children, ...props}: BlurProps) {
    return (
        <motion.div
            initial={{backdropFilter: ""}}
            animate={{backdropFilter: "blur(10px)"}}
            exit={{backdropFilter: ""}}
            transition={{ease: "easeOut", duration: .15}}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 50,
            }}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export default Blur