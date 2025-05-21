import { TUser } from "./user.types";

// Type for a single blog post
export type TBlog = {
  id: string;
  title: string;
  slug: string;
  authorId: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  comment: any[];
  like: any[];
  user: TUser;
};
