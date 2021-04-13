import { Alert, Button, Form } from "react-bootstrap";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../../helpers/hooks";
import { fetchBooks } from "../../store/actions/books";
import { RouteComponentProps, StaticContext } from "react-router";
import { useAuth } from "../../context/AuthProvider";

export const Authorization: FC<
  RouteComponentProps<any, StaticContext, unknown>
> = (props: RouteComponentProps) => {
  const [validated, setValidated] = useState(false);
  const dispatch = useAppDispatch();
  const auth = useAuth();
  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
    } else {
      if (auth) {
        auth.login("dfdf@df.ru", "", props.history);
      }
      setValidated(true);
    }
  }
  function registration() {
    props.history.push("/registration");
  }
  return (
    <div className="auth-form justify-content-center d-flex">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group controlId="validationCustom01">
            <Form.Label>E-mail</Form.Label>
            <Form.Control required type="text" placeholder="lol@lol.lol" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId="validationCustom02">
            <Form.Label>Пароль</Form.Label>
            <Form.Control required type="password" />
          </Form.Group>
        </Form.Row>
        <Button type="submit">Login</Button>
      </Form>
      <Alert onClick={registration} variant="primary">
        Нет аккаунта? Зарегестрироваться
      </Alert>
    </div>
  );
};
