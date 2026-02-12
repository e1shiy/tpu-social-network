import {MotionProps} from "framer-motion"

export const mergeAnimations = (...args: MotionProps[]): MotionProps => {
    console.warn("Use object-only MotionProps, because function working with `any` type")
    return args.reduce((acc, curr) => ({
            ...acc, ...curr,
            initial: {...acc.initial as object, ...curr.initial as object},
            animate: {...acc.animate as object, ...curr.animate as object},
            exit: {...acc.exit as object, ...curr.exit as object},
            transition: {...curr.transition}
        })
    )
}