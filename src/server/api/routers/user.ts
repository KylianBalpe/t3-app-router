import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getUser: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    return ctx.db.user.findUnique({
      where: {
        username: input,
      },
    });

    // return user;
  }),
});
