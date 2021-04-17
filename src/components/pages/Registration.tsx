import { FC } from "react";
import { RouteComponentProps, StaticContext } from "react-router";
import { useAuth } from "../../context/AuthProvider";
import * as Yup from "yup";
import { Field, FormBuilder } from "../FormBuilder";
import { RegistrationForm } from "../../entity/form.types";
import { useAppDispatch } from "../../helpers/hooks";
import { setAlert } from "../../store/actions/common";

export const Registration: FC<
  RouteComponentProps<any, StaticContext, unknown>
> = (props: RouteComponentProps) => {
  const auth = useAuth();
  const dispatch = useAppDispatch();

  const submit = (values: RegistrationForm) => {
    if (auth) {
      auth.registration(values);
    } else {
      dispatch(setAlert({ type: "error", text: "возникли какие-то проблемы" }));
    }
  };

  const initialValue: RegistrationForm = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const schema = Yup.object({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const fields: Array<Field<RegistrationForm>> = [
    {
      type: "text",
      valueName: "first_name",
      title: "Имя",
      placeholder: "",
      controlId: "1",
    },
    {
      type: "text",
      valueName: "last_name",
      title: "Фамилия",
      placeholder: "",
      controlId: "2",
    },
    {
      type: "text",
      valueName: "email",
      title: "E-mail",
      placeholder: "",
      controlId: "3",
    },
    {
      type: "password",
      valueName: "password",
      title: "Пароль",
      placeholder: "",
      controlId: "4",
    },
  ];

  return (
    <div className="auth-form justify-content-center d-flex">
      <FormBuilder
        formikInitialValue={initialValue}
        fields={fields}
        buttonName={"зарегаться"}
        onSubmit={submit}
        history={props.history}
        schema={schema}
      />
    </div>
  );
};
