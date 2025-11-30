interface TextButtonProps {
    children?: React.ReactNode,
    className?: string,
    onClick?: () => void 
}

function TextButton({children, className, onClick} : TextButtonProps) {
    return(
        <button className={`font-bold cursor-pointer hover:text-primary ${className}`} onClick={onClick}>{children}</button>
    )
}

export default TextButton