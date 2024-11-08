import { z } from "zod";

export const editUsernameSchema = z.object({
  username: z.string().min(3).max(100),
});
