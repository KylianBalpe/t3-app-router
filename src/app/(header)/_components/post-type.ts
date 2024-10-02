export type PostType = {
  id: number;
  post: string;
  isPublic: boolean;
  isArchive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  authorId: string;
  author: {
    name: string | null;
    username: string | null;
  };
};
