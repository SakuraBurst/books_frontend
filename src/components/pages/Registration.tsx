import { FC } from "react";
import { RouteComponentProps, StaticContext } from "react-router";
import { useAuth } from "../../context/AuthProvider";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { Field } from "../FormBuilder";
import { RegistrationForm } from "../../entity/form.types";
import { useAppDispatch } from "../../helpers/hooks";
import { setAlert } from "../../store/actions/common";

export const Registration: FC<
  RouteComponentProps<any, StaticContext, unknown>
> = (props: RouteComponentProps) => {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const formik = useFormik<RegistrationForm>({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Required"),
      last_name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      if (auth) {
        auth.registration(values);
      } else {
        dispatch(
          setAlert({ type: "error", text: "возникли какие-то проблемы" })
        );
      }
    },
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
      <Form
        noValidate
        validated={formik.isValid}
        onSubmit={formik.handleSubmit}
      >
        {fields.map((a) => (
          <Form.Row key={a.controlId}>
            <Form.Group>
              <Form.Label>{a.title}</Form.Label>
              <Form.Control
                required
                id={a.valueName}
                name={a.valueName}
                type={a.type}
                onBlur={formik.handleBlur}
                placeholder={a.placeholder}
                value={formik.values[a.valueName]}
                onChange={formik.handleChange}
                isValid={
                  formik.touched[a.valueName] && !formik.errors[a.valueName]
                }
                isInvalid={
                  formik.touched[a.valueName] && !!formik.errors[a.valueName]
                }
              />
            </Form.Group>
          </Form.Row>
        ))}
        <Button type="submit">Зарегаться</Button>
      </Form>
    </div>
  );
};
