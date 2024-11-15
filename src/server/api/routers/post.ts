import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { createPostSchema } from "@/lib/schemas/post-schema";
import { type PostType } from "@/types/post-type";

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
      const newPost = await ctx.db.post.create({
        data: {
          post: input.post,
          authorId: ctx.session.user.id,
        },
        include: {
          author: {
            select: {
              name: true,
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

      const response: PostType = {
        id: newPost.id,
        post: newPost.post,
        author: {
          name: newPost.author.name,
          username: newPost.author.username,
        },
        comments: newPost.comments,
        isPublic: newPost.isPublic,
        isArchive: newPost.isArchive,
        createdAt: newPost.createdAt,
        updatedAt: newPost.updatedAt,
        deletedAt: newPost.deletedAt,
        authorId: newPost.authorId,
      };

      return response;
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
            name: true,
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
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return ctx.db.post.findUnique({
        where: {
          id: input,
        },
        include: {
          comments: {
            select: {
              id: true,
              comment: true,
              author: {
                select: {
                  name: true,
                  username: true,
                },
              },
            },
          },
          author: {
            select: {
              name: true,
              username: true,
            },
          },
        },
      });
    }),

  getUserPosts: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          username: input,
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
              name: true,
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
            name: true,
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
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const archivedPost = await ctx.db.post.update({
        where: {
          id: input,
        },
        data: {
          isArchive: true,
          isPublic: false,
        },
        include: {
          author: {
            select: {
              name: true,
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

      const response: PostType = {
        id: archivedPost.id,
        post: archivedPost.post,
        author: {
          name: archivedPost.author.name,
          username: archivedPost.author.username,
        },
        comments: archivedPost.comments,
        isPublic: archivedPost.isPublic,
        isArchive: archivedPost.isArchive,
        createdAt: archivedPost.createdAt,
        updatedAt: archivedPost.updatedAt,
        deletedAt: archivedPost.deletedAt,
        authorId: archivedPost.authorId,
      };

      return response;
    }),

  unarchivePost: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const unarchivedPost = await ctx.db.post.update({
        where: {
          id: input,
        },
        data: {
          isArchive: false,
          isPublic: true,
        },
        include: {
          author: {
            select: {
              name: true,
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

      const response: PostType = {
        id: unarchivedPost.id,
        post: unarchivedPost.post,
        author: {
          name: unarchivedPost.author.name,
          username: unarchivedPost.author.username,
        },
        comments: unarchivedPost.comments,
        isPublic: unarchivedPost.isPublic,
        isArchive: unarchivedPost.isArchive,
        createdAt: unarchivedPost.createdAt,
        updatedAt: unarchivedPost.updatedAt,
        deletedAt: unarchivedPost.deletedAt,
        authorId: unarchivedPost.authorId,
      };

      return response;
    }),

  deletePost: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.update({
        where: {
          id: input,
        },
        data: {
          deletedAt: new Date(),
        },
      });
    }),
});
