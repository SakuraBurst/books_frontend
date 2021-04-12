import { Alert, Button, Form } from "react-bootstrap";
import { SyntheticEvent, useState } from "react";
import { useAppDispatch } from "../../helpers/hooks";
import { loginAction } from "../../store/actions/auth";
import { fetchBooks } from "../../store/actions/books";

export default function Authorization() {
  const [validated, setValidated] = useState(false);
  const dispatch = useAppDispatch();
  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
    } else {
      console.log("dfdf");
      dispatch(loginAction("dfdf@df.ru"));
      setValidated(true);
    }
  }
  function registration() {
    console.log("lol prikol");
    dispatch(fetchBooks());
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
}
