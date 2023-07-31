import * as C from './estilo';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    message: string;
};

export const AlertModal = ({ isOpen, onClose, message }: Props) => {
    if (!isOpen) return null;

    return (
        <C.ModalOverlay>
            <C.ModalContent>
                <C.Message>{message}</C.Message>
                <C.ButtonsContainer>
                    <C.CancelButton onClick={onClose}>X</C.CancelButton>
                </C.ButtonsContainer>
            </C.ModalContent>
        </C.ModalOverlay>
    );
};
