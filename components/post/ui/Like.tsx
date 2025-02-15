"use client";

import { PostWithExtras } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { Like } from "@prisma/client";
import { Heart } from "lucide-react";
import ActionIcon from "@/components/ActionIcon";
import { startTransition, useState } from "react";

interface LikeButtonProps {
  post: PostWithExtras;
  postId: string;
  userId?: string;
  likes: number;
  handleLike: (postId: string) => Promise<{ likes: number }>;
}

function LikeButton({ post, postId, userId, likes, handleLike }: LikeButtonProps) {
  const [optimisticLikes, setOptimisticLikes] = useState(likes);
  const [hasLiked, setHasLiked] = useState(post.likes.some((like) => like.userId === userId));

  const onLike = async () => {
    if (!userId) return;

    const isLiking = !hasLiked;

    // **Optimistic Update**: Toggle Like/Unlike
    startTransition(() => {
      setHasLiked(isLiking);
      setOptimisticLikes((prevLikes) => (isLiking ? prevLikes + 1 : prevLikes - 1));
    });

    try {
      const response = await handleLike(postId);
      // console.log("API_LIKE_Response:", response);

      if (response?.likes !== undefined) {
        // **Ensure UI reflects actual server response**
        startTransition(() => {
          setOptimisticLikes(response.likes);
        });
      }
    } catch (error) {
      // console.error("Like failed, rolling back.");

      // **Rollback if request fails**
      startTransition(() => {
        setHasLiked(!isLiking);
        setOptimisticLikes((prevLikes) => (isLiking ? prevLikes - 1 : prevLikes + 1));
      });
    }
  };

  return (
    <div className="flex flex-row items-center gap-x-[0.9px]">
      <ActionIcon onClick={onLike}>
        <Heart
          className={cn("h-6 w-6 transition", {
            "text-red-500 fill-red-500": hasLiked,
          })}
        />
      </ActionIcon>
      <span className="text-sm font-bold dark:text-white">
        {optimisticLikes} 
      </span>
    </div>
  );
}

export default LikeButton;
