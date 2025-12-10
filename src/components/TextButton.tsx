interface TextButtonProps {
    children?: React.ReactNode,
    className?: string,
    onClick?: () => void,
    isActive?: boolean,
}

function TextButton({children, className, onClick, isActive=false} : TextButtonProps) {
    return(
        <button className={`font-bold cursor-pointer ${isActive && "text-primary"} hover:text-primary ${className}`} onClick={onClick}>{children}</button>
    )
}

export default TextButton