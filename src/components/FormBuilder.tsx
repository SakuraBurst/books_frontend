import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { FC } from "react";
import {
  AuthorizationForm,
  NewBookForm,
  RegistrationForm,
} from "../entity/form.types";
import { History } from "history";

export interface Field<T> {
  type: "text" | "password" | "date";
  valueName: keyof T;
  title: string;
  placeholder: string;
  controlId: string;
}

export interface FormBuilderI<T> {
  formikInitialValue: T;
  fields: Array<Field<T>>;
  buttonName: string;
  onSubmit(value: T, history?: History<unknown>): void;
  history?: History<unknown>;
  schema: any;
}

// ТИП ТОЛЬКО ДЛЯ ФОРМ БИЛДЕРА
// это плохо я знаю, но я пока хз как сделать так, чтобы все типы удовлетворяли одному инетрфейсу
// поэтому просто сделал его локальным
type _FormUnion = RegistrationForm & AuthorizationForm & NewBookForm;

export const FormBuilder: FC<FormBuilderI<_FormUnion>> = ({
  formikInitialValue,
  fields,
  buttonName,
  onSubmit,
  history,
  schema,
}) => {
  const formik = useFormik<_FormUnion>({
    initialValues: formikInitialValue,
    validationSchema: schema,
    onSubmit: (values) => {
      onSubmit(values, history);
    },
  });
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
        <Button type="submit">{buttonName}</Button>
      </Form>
    </div>
  );
};
