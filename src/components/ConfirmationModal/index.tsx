import * as C from './style';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
};

export const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }: Props) => {
  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.ModalContent>
        <C.Message>{message}</C.Message>
        <C.ButtonsContainer>
          <C.CancelButton onClick={onClose}>Cancelar</C.CancelButton>
          <C.ConfirmButton onClick={onConfirm}>Confirmar</C.ConfirmButton>
        </C.ButtonsContainer>
      </C.ModalContent>
    </C.ModalOverlay>
  );
};
