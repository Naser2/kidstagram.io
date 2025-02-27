import { z } from "zod";

export const PostSchema = z.object({
  id: z.string(),
  fileUrl: z.string().url(),
  caption: z.string().optional(),
  location: z.string().optional(),
  tags: z.array(z.string()).optional(),
});


export const ShareSchema = z.object({
  postId: z.string(),
});

export const CreateShare = ShareSchema;
export const DeleteShare = ShareSchema.pick({ postId: true });


export const CreatePost = PostSchema.omit({ id: true });
export const UpdatePost = PostSchema;
export const DeletePost = PostSchema.pick({ id: true });

export const LikeSchema = z.object({
  postId: z.string(),
});

export const BookmarkSchema = z.object({
  postId: z.string(),
});

export const CommentSchema = z.object({
  id: z.string(),
  body: z.string(),
  postId: z.string(),
});

export const CreateComment = CommentSchema.omit({ id: true });
export const UpdateComment = CommentSchema;
export const DeleteComment = CommentSchema.pick({ id: true });

export const UserSchema = z.object({
  id: z.string(),
  username: z.string().optional(),
  name: z.string().optional(),
  image: z.string().optional(),
  bio: z.string().max(150).optional(),
  website: z.string().optional(),
  location: z.string().optional(),
  email: z.string().email().optional(),
  verified: z.boolean().optional(),
  passion: z.string().optional(),
  additionalDetails: z.string().optional(),
  gender: z.string().optional(),
});

export const UpdateUser = UserSchema;
export const DeleteUser = UserSchema.pick({ id: true });
export const FollowUser = UserSchema.pick({ id: true });
