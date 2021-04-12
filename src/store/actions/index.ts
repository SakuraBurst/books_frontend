import * as auth from "./auth";
import * as books from "./books";

const actions = {
  ...auth,
  ...books,
};
type createUnionType<T> = T extends { [key: string]: infer U } ? U : never;
console.log("dfdf");

export type CoolType = ReturnType<createUnionType<typeof actions>>;
