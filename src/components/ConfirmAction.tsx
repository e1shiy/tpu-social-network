import Card from "./wrappers/Card.tsx";
import TextButton from "./buttons/TextButton.tsx";
import Modal from "./Modal.tsx";

interface ConfirmActionProps {
    text: string,
    isOpen: boolean
    onConfirm?: () => void
    onReject?: () => void
}

function ConfirmAction({text, isOpen, onConfirm, onReject}: ConfirmActionProps) {
    return (
        <Modal isOpened={isOpen} onClose={onReject}>
            <Card className={"flex-center flex-col gap-4 text-center"}>
                <div>
                    <h4>{text}</h4>
                    <p className={"text-dark/60"}>Это действие нельзя будет отменить</p>
                </div>
                <div className={"flex w-full justify-between items-center gap-3 md:gap-3.5 xl:gap-4"}>
                    <div className={"grow basis-0"}>
                        <TextButton color={"primary"} onClick={onConfirm}>Да</TextButton>
                    </div>
                    <div className={"grow basis-0"}>
                        <TextButton color={"error"} onClick={onReject}>Нет</TextButton>
                    </div>
                </div>
            </Card>
        </Modal>
    )
}

export default ConfirmAction