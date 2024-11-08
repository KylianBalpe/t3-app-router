import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { editUsernameSchema } from "@/lib/schemas/user-schema";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  getUser: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    return ctx.db.user.findUnique({
      where: {
        username: input,
      },
    });
  }),

  updateUsername: protectedProcedure
    .input(editUsernameSchema)
    .mutation(async ({ input, ctx }) => {
      const usernameExist = await ctx.db.user.findUnique({
        where: {
          username: input.username,
        },
      });

      if (usernameExist) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Username already exist",
        });
      }

      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          username: input.username,
        },
      });
    }),
});
