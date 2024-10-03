import { z } from "zod";

export const createCommentSchema = z.object({
  comment: z
    .string({ required_error: "Comments cannot be empty" })
    .min(1, "Comments cannot be empty"),
  postId: z.number({ required_error: "Post ID cannot be empty" }),
});
