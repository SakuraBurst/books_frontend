import { Button, Modal } from "react-bootstrap";
import { FC, ReactNode } from "react";

export interface ModalI {
  children: ReactNode;
  show: boolean;
  submitButton: boolean;
  onSubmit(...any: any): void;
  submitButtonText: string;
  onHide(): void;
  showFooter?: boolean;
  text: string;
}

export const JustModal: FC<ModalI> = ({
  children,
  show,
  onHide,
  submitButton,
  submitButtonText,
  onSubmit,
  text,
  showFooter = true,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{text}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {showFooter ? (
        <Modal.Footer>
          {submitButton ? (
            <Button onClick={onSubmit}>{submitButtonText}</Button>
          ) : (
            <></>
          )}
          <Button onClick={onHide}>закрыть</Button>
        </Modal.Footer>
      ) : (
        <></>
      )}
    </Modal>
  );
};
