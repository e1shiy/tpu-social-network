export function dispatchInputCallback(
    onTouchpadInput: () => void,
    onMouseInput: () => void
) {
    return window.matchMedia("(pointer: coarse)").matches ? onTouchpadInput() : onMouseInput()
}