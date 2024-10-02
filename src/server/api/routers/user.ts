import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUser: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    return ctx.db.user.findUnique({
      where: {
        username: input,
      },
    });
  }),
});
