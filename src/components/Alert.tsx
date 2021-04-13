import { Toast } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../helpers/hooks";
import { removeAlert } from "../store/actions/common";

export default function Alert() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((a) => a.common.alerts);
  function removeAlertById(id: number) {
    return () => {
      dispatch(removeAlert(id));
    };
  }
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "absolute",
        minHeight: "200px",
        top: 0,
        right: 0,
      }}
    >
      {loading.map((a) => (
        <Toast
          key={a.id}
          style={{
            backgroundColor: a.type === "success" ? "green" : "red",
            color: "white",
            minWidth: 200,
            position: "absolute",
            top: 0,
            right: 0,
          }}
          onClose={removeAlertById(a.id)}
        >
          <Toast.Header>
            <strong className="mr-auto">
              {a.type === "success" ? "Заебись" : "Ошибка"}
            </strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>{a.text}</Toast.Body>
        </Toast>
      ))}
    </div>
  );
}
