import { Alert } from "react-bootstrap";
import { FC } from "react";
import { useAppDispatch } from "../../helpers/hooks";
import { RouteComponentProps, StaticContext } from "react-router";
import { useAuth } from "../../context/AuthProvider";
import { AuthorizationForm } from "../../entity/form.types";
import * as Yup from "yup";
import { setAlert } from "../../store/actions/common";
import { Field, FormBuilder } from "../FormBuilder";

export const Authorization: FC<
  RouteComponentProps<any, StaticContext, unknown>
> = (props: RouteComponentProps) => {
  const dispatch = useAppDispatch();
  const auth = useAuth();

  const initialValues: AuthorizationForm = {
    email: "",
    password: "",
  };
  const schema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const submit = (values: AuthorizationForm) => {
    if (auth) {
      auth.login(values, props.history);
    } else {
      dispatch(setAlert({ type: "error", text: "возникли какие-то проблемы" }));
    }
  };
  const fields: Array<Field<AuthorizationForm>> = [
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
  function registration() {
    props.history.push("/registration");
  }
  return (
    <div className="auth-form justify-content-center d-flex">
      <FormBuilder
        formikInitialValue={initialValues}
        fields={fields}
        buttonName={"Войти"}
        onSubmit={submit}
        history={props.history}
        schema={schema}
      />
      <Alert
        onClick={registration}
        className="cursor-pointer"
        variant="primary"
      >
        Нет аккаунта? Зарегестрироваться
      </Alert>
    </div>
  );
};
