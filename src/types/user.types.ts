export type TLoggedInUser = {
  email: string;
  id: string;
  role: "ADMIN" | "USER";
  iat: number;
  exp: number;
};

export type TUser = {
  id: string;
  email: string;
  name: string;
  password: string;
  username: string;
  bio: string | null;
  summery: string;
  image: string;
  phoneNumber: string;
  status: "ACTIVE" | "BLOCKED";
  role: "ADMIN" | "USER";
  createdAt: string;
  updatedAt: string;
};
export type TUserRole = "USER" | "ADMIN";
