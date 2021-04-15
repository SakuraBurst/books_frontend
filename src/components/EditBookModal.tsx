import { FC } from "react";
import { JustModal } from "./JustModal";
import { useAppDispatch } from "../helpers/hooks";
import { NewBookForm } from "../entity/form.types";
import * as Yup from "yup";
import { Field, FormBuilder } from "./FormBuilder";
import { EditBook } from "../store/actions/books";
import { Book } from "../entity/books.types";
import moment from "moment";

interface AddBookModalI {
  show: boolean;
  onHide(): void;
  book: Book;
}

export const EditBookModal: FC<AddBookModalI> = ({ show, onHide, book }) => {
  const dispatch = useAppDispatch();

  const submit = (values: NewBookForm) => {
    dispatch(EditBook(values, `${book.id}`));
    onHide();
  };

  const initialValue: NewBookForm = {
    title: book.title,
    author: book.author,
    year: moment(book.year).format("YYYY-MM-DD"),
  };

  const schema = Yup.object({
    title: Yup.string().required("Required"),
    author: Yup.string().required("Required"),
    year: Yup.date().required("Required"),
  });

  const fields: Array<Field<NewBookForm>> = [
    {
      type: "text",
      valueName: "title",
      title: "Название",
      placeholder: "",
      controlId: "1",
    },
    {
      type: "text",
      valueName: "author",
      title: "Автор",
      placeholder: "",
      controlId: "2",
    },
    {
      type: "date",
      valueName: "year",
      title: "Год",
      placeholder: "",
      controlId: "3",
    },
  ];
  return (
    <JustModal
      show={show}
      onHide={() => onHide()}
      onSubmit={() => {}}
      submitButton={false}
      submitButtonText={""}
      text={"Измени книгу"}
      showFooter={false}
    >
      <FormBuilder
        formikInitialValue={initialValue}
        fields={fields}
        buttonName={"изменить"}
        onSubmit={submit}
        schema={schema}
      />
    </JustModal>
  );
};
