import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { ReactElement } from "react";
import { UnionForm } from "../entity/form.types";
import { History } from "history";

export interface Field<T> {
  type: "text" | "password" | "date";
  valueName: Extract<keyof T, string>;
  title: string;
  placeholder: string;
  controlId: string;
}

export interface FormBuilderI<T> {
  formikInitialValue: T;
  fields: Array<Field<T>>;
  buttonName: string;
  onSubmit(value: T, history?: History<unknown>): void;
  schema: any;
}

export function FormBuilder<T extends UnionForm>({
  formikInitialValue,
  fields,
  buttonName,
  onSubmit,
  schema,
}: FormBuilderI<T>): ReactElement<T> {
  const formik = useFormik<T>({
    initialValues: formikInitialValue,
    validationSchema: schema,
    onSubmit: (values) => {
      onSubmit(values);
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
}
