import { Button } from "react-bootstrap";
import { useAppSelector } from "../helpers/hooks";

export default function Lol() {
  const token = useAppSelector((a) => a.auth.token);
  return (
    <div>
      <Button variant="success">{token}</Button>
    </div>
  );
}
