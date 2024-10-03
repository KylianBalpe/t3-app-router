import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { createCommentSchema } from "@/lib/schemas/comment-schema";

export const commentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createCommentSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.comment.create({
        data: {
          comment: input.comment,
          postId: input.postId,
          authorId: ctx.session.user.id,
        },
      });
    }),

  getCommentsByPostId: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return ctx.db.comment.findMany({
        where: {
          postId: input,
        },
        include: {
          author: {
            select: {
              name: true,
              username: true,
            },
          },
        },
      });
    }),
});
