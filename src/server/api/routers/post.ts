import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { createPostSchema } from "@/lib/schemas/post-schema";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          post: input.post,
          authorId: ctx.session.user.id,
        },
        include: {
          author: {
            select: {
              firstName: true,
              lastName: true,
              username: true,
            },
          },
          comments: {
            select: {
              id: true,
              comment: true,
            },
          },
        },
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        deletedAt: null,
        isPublic: true,
        isArchive: false,
      },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            username: true,
          },
        },
        comments: {
          select: {
            id: true,
            comment: true,
          },
        },
      },
    });
  }),

  getPostById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.post.findUnique({
        where: {
          id: input.id,
        },
        include: {
          comments: {
            select: {
              id: true,
              comment: true,
              author: {
                select: {
                  firstName: true,
                  lastName: true,
                  username: true,
                },
              },
            },
          },
          author: {
            select: {
              firstName: true,
              lastName: true,
              username: true,
            },
          },
        },
      });
    }),

  getUserPosts: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          username: input.username,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return ctx.db.post.findMany({
        where: {
          authorId: user.id,
          deletedAt: null,
          isPublic: true,
          isArchive: false,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: {
            select: {
              firstName: true,
              lastName: true,
              username: true,
            },
          },
          comments: {
            select: {
              id: true,
              comment: true,
            },
          },
        },
      });
    }),

  getUserArchivedPosts: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.post.findMany({
      where: {
        authorId: ctx.session.user.id,
        deletedAt: null,
        isPublic: false,
        isArchive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            username: true,
          },
        },
        comments: {
          select: {
            id: true,
            comment: true,
          },
        },
      },
    });
  }),

  archivePost: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.update({
        where: {
          id: input.id,
        },
        data: {
          isArchive: true,
          isPublic: false,
        },
        include: {
          author: {
            select: {
              firstName: true,
              lastName: true,
              username: true,
            },
          },
          comments: {
            select: {
              id: true,
              comment: true,
            },
          },
        },
      });
    }),

  unarchivePost: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.update({
        where: {
          id: input.id,
        },
        data: {
          isArchive: false,
          isPublic: true,
        },
        include: {
          author: {
            select: {
              firstName: true,
              lastName: true,
              username: true,
            },
          },
          comments: {
            select: {
              id: true,
              comment: true,
            },
          },
        },
      });
    }),

  deletePost: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.update({
        where: {
          id: input.id,
        },
        data: {
          deletedAt: new Date(),
        },
      });
    }),
});
