import { FC } from "react";
import { JustModal } from "./JustModal";
import { useAppDispatch } from "../helpers/hooks";
import { History } from "history";
import { deleteBookAction } from "../store/actions/books";

interface DeleteBookModalI {
  id: string;
  onHide(): void;
  show: boolean;
  history: History<unknown>;
}

export const DeleteBookModal: FC<DeleteBookModalI> = ({
  id,
  onHide,
  show,
  history,
}) => {
  const dispatch = useAppDispatch();
  function deleteBook() {
    dispatch(deleteBookAction(id, history));
  }
  return (
    <JustModal
      show={show}
      submitButton={true}
      onSubmit={() => deleteBook()}
      submitButtonText={"Удалить"}
      onHide={() => onHide()}
      text={"Удаление книги"}
    >
      <div>Вы действительно хотите удалить это</div>
    </JustModal>
  );
};
