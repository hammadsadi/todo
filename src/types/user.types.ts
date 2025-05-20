export type TLoggedInUser = {
  email: string;
  id: string;
  role: "ADMIN" | "USER";
  iat: number;
  exp: number;
};
export type TUserRole = "USER" | "ADMIN";
