export type RegistrationForm = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type AuthorizationForm = {
  email: string;
  password: string;
};

export type FormUnion = RegistrationForm | AuthorizationForm;

type getKeysOfUnion<T> = T extends T ? keyof T : never;

export type FormKeys = getKeysOfUnion<FormUnion>;
