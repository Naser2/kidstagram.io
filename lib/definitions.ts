import type {
  Comment,
  Follows,
  Like,
  Post,
  SavedPost,
  User,
} from "@prisma/client";



export type CommentWithExtras = Comment & { user: User };
export type LikeWithExtras = Like & { user: User };

export type PostWithExtras = Post & {
  comments: CommentWithExtras[];
  likes: LikeWithExtras[];
  savedBy: SavedPost[];
  user: User;
};

export type UserWithFollows = User & {
  following: Follows[];
  followedBy: Follows[];
};

export type FollowerWithExtras = Follows & { follower: UserWithFollows };
export type FollowingWithExtras = Follows & { following: UserWithFollows };

export type UserWithExtras = User & {
  posts: Post[];
  saved: SavedPost[];
  followedBy: FollowerWithExtras[];
  following: FollowingWithExtras[];
};



export interface Profile extends UserWithExtras {
  id: string;
  username: string;
  name: string;
  email: string;
  bio: string | null;
  website: string | null;
  image: string | null;
  passion: string | null;
  gender: string | null;
  additionalDetails: string | null;
  posts: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    caption: string;
    fileUrl: string;
    userId: string;
  }[];
  saved: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    postId: string;
    userId: string;
  }[];
  followedBy: {
    id: string;
    followerId: string;
    followingId: string;
    follower: {
      id: string;
      username: string;
      name: string | null;
      website: string | null;
      passion: string | null;
      gender: string | null;
      additionalDetails: string | null;
      password: string | null;
      image: string | null;
      createdAt: Date;
      updatedAt: Date;
      email: string;
      emailVerified: Date | null;
      bio: string | null;
      following: {
        id: string;
        followerId: string;
        followingId: string;
      }[];
      followedBy: {
        id: string;
        followerId: string;
        followingId: string;
      }[];
    };
  }[];
  following: FollowingWithExtras[];
}