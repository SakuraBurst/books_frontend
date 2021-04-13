import * as auth from "./auth";
import * as books from "./books";
import * as common from "./common";

const actions = {
  ...auth,
  ...books,
  ...common,
};
type createUnionType<T> = T extends { [key: string]: infer U } ? U : never;

export type CoolType = ReturnType<createUnionType<typeof actions>>;
