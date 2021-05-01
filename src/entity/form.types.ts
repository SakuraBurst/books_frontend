export type FormType = {
  [key: string]: string | number;
};

export interface RegistrationForm extends FormType {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface AuthorizationForm extends FormType {
  email: string;
  password: string;
}

export interface NewBookForm extends FormType {
  title: string;
  author: string;
  year: string;
}

export type UnionForm = RegistrationForm | AuthorizationForm | NewBookForm;
