export type AlertType = "success" | "error";

export type AlertMessage = {
  type: AlertType;
  text: string;
};

export type Alert = {
  type: AlertType;
  text: string;
  id: number;
};
