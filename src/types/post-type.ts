export type PostType = {
  author: {
    firstName: string;
    lastName: string;
    username: string;
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
