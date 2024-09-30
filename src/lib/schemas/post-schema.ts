import { z } from "zod";

export const createPostSchema = z.object({
  post: z
    .string({ required_error: "Post cannot be empty" })
    .min(1, "Post cannot be empty"),
});
