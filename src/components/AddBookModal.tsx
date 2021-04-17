import { FC } from "react";
import { JustModal } from "./JustModal";
import { useAppDispatch } from "../helpers/hooks";
import { NewBookForm } from "../entity/form.types";
import * as Yup from "yup";
import { Field, FormBuilder } from "./FormBuilder";
import { AddBook } from "../store/actions/books";
import { History } from "history";

interface AddBookModalI {
  show: boolean;
  onHide(): void;
  history: History<unknown>;
}

export const AddBookModal: FC<AddBookModalI> = ({ show, onHide, history }) => {
  const dispatch = useAppDispatch();

  const submit = (values: NewBookForm) => {
    dispatch(AddBook(values));
    onHide();
  };

  const initialValue: NewBookForm = {
    title: "",
    author: "",
    year: "",
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
      text={"Добавь книгу"}
      showFooter={false}
    >
      <FormBuilder
        formikInitialValue={initialValue}
        fields={fields}
        buttonName={"новая книга"}
        onSubmit={submit}
        schema={schema}
      />
    </JustModal>
  );
};
