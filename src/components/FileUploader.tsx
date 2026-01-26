import {ChangeEvent, RefObject, useRef} from "react";

interface FileUploaderProps {
    children?: React.ReactNode,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    onClick?: (inputRef: RefObject<HTMLInputElement | null>) => void;
    accept?: string,
    multiple?: boolean
}

function FileUploader({children, onChange, onClick, accept, multiple=false}: FileUploaderProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    return (
        <>
            <label
                htmlFor={"file-uploader"}
                onClick={() => onClick ? onClick(inputRef) : inputRef.current?.click()}
            >
                {children}
            </label>
            <input
                ref={inputRef}
                name={"file-uploader"}
                type={"file"}
                className={"hidden"}
                accept={accept}
                multiple={multiple}
                onChange={onChange}
            />
        </>
    )
}

export default FileUploader