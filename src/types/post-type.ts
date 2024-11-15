export type PostType = {
  author: {
    name: string | null;
    username: string | null;
  };
  comments: {
    comment: string;
    id: number;
  }[];
  post: string;
  id: number;
  isPublic: boolean;
  isArchive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  authorId: string;
};
