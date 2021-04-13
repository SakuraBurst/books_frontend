import { FormikProps } from "formik";
import { Button, Form } from "react-bootstrap";
import { FC } from "react";
import { FormKeys, FormUnion } from "../entity/form.types";
// мои потуги в билдер форм ни к чему не привели, я пару часов своей жизни отдал на это
// но  дальше мне лень этим знаиматься, учитываю что проект в основном не фронтовой
// да, звучит как оправдание, это оно и есть.Может быть потом вернусь, у меня есть пара идей
export interface Field<T> {
  type: "text" | "password";
  valueName: keyof T;
  title: string;
  placeholder: string;
  controlId: string;
}

export interface FormBuilderI<T> {
  formik: FormikProps<T>;
  fields: Array<Field<T>>;
  buttonName: string;
}

export const FormBuilder: FC<FormBuilderI<FormUnion>> = ({
  formik,
  fields,
  buttonName,
}) => {
  function returnValue(formik: FormikProps<FormUnion>, key: FormKeys) {
    // @ts-ignore шобы не мешал
    return formik.values[key];
  }
  return (
    <div className="auth-form justify-content-center d-flex">
      <Form
        noValidate
        validated={formik.isValid}
        onSubmit={formik.handleSubmit}
      >
        {fields.map((a) => (
          <Form.Row>
            <Form.Group controlId={a.controlId}>
              <Form.Label>{a.title}</Form.Label>
              <Form.Control
                required
                type={a.type}
                placeholder={a.placeholder}
                value={returnValue(formik, a.valueName)}
              />
            </Form.Group>
          </Form.Row>
        ))}
        <Button type="submit">{buttonName}</Button>
      </Form>
    </div>
  );
};
