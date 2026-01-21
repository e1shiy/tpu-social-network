import {motion} from "framer-motion";


interface FadeProps {
    children: React.ReactNode,
}

function Fade({children}: FadeProps) {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{ease: "easeOut", duration: .15}}
        >
            {children}
        </motion.div>
    )
}

export default Fade