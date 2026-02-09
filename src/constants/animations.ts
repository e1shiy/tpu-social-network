export const bubble = {
    initial: {scale: 0},
    animate: {scale: 1},
    exit: {scale: 0},
    transition: {duration: .15}
}

export const fade = {
    initial: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0},
    transition: {duration: .15}
}

export const slideDown = {
    initial: {height: 0},
    animate: {height: "auto"},
    exit: {height: 0},
    transition: {duration: .1},
    className: "overflow-hidden"
}