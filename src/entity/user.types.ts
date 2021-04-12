export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export type UserResponseType = {
  token: string;
  user: User;
};
