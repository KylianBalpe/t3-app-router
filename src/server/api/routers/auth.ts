import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Bcrypt } from "oslo/password";
import { nanoid } from "nanoid";
import { signUpSchema } from "@/lib/schema/auth-schema";

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const autoGeneratedId = nanoid(10).toUpperCase();
      const hashedPassword = await new Bcrypt().hash(input.password);

      const isEmailTaken = await ctx.db.user.findFirst({
        where: {
          email: input.email,
        },
      });

      if (isEmailTaken) {
        throw new Error("Email is already taken");
      }

      return ctx.db.user.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          username: "user" + autoGeneratedId,
          email: input.email,
          password: hashedPassword,
        },
      });
    }),
});