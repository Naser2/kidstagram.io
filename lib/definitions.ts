import type {
  Comment,
  Follows,
  Like,
  Shares,
  Post,
  SavedPost,
  User,
} from "@prisma/client";



export type CommentWithExtras = Comment & { user: User };
export type LikeWithExtras = Like & { user: User };
export type ShareWithExtras = Shares & { user: User; post: Post }; // ✅ Add ShareWithExtras

export type PostWithExtras = Post & {
  comments: CommentWithExtras[];
  likes: LikeWithExtras[];
  savedBy: SavedPost[];
  shares: ShareWithExtras[]; // ✅ Add shares array
  user: UserWithFollows; // ✅ Ensure `user` includes followers
};



export type FollowerWithExtras = Follows & { follower: UserWithFollows };
export type FollowingWithExtras = Follows & { following: UserWithFollows };

export type UserWithExtras = User & {
  posts: Post[];
  saved: SavedPost[];
  followedBy: FollowerWithExtras[];
  following: FollowingWithExtras[];
};

export type UserWithFollows = User & {
  location: string | null;  // ✅ Ensure this exists
  verified: boolean;        // ✅ Ensure this exists
  following: Follows[];
  followedBy: Follows[];
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
  verified: boolean;
  location: string | null;
  gender: string | null;
  additionalDetails: string | null;
  posts: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    caption: string;
    fileUrl: string;
    userId: string;
    location: string | null;
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
      verified: boolean;
      location: string | null;
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