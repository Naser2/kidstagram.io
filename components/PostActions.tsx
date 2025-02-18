"use client"

import { PostWithExtras, CommentWithExtras } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import ActionIcon from "@/components/ActionIcon";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import LikeButton from "./Like";
import ShareButton from "./ShareButton";
import BookmarkButton from "./BookmarkButton";
import CommentModal from "./ui/Modal/NewCommentModal";

type Props = {
  post: PostWithExtras;
  userId?: string;
  className?: string;
  commentsModalOpen: boolean;
  handleNewComment?: (newComment: { body: string; tempId: string; status: "pending" | "failed" | "success" }) => void;
  toggleCommentsModal: Function
  comments: CommentWithExtras[];
  userSession: any; // Add session type here
  handleBookmark: (postId: string) => Promise<{ message: string }>;
};

function PostActions({ 
  post, 
  // comments,
  userId,
  className,
  handleNewComment, 
  // commentsModalOpen,
  // userSession,
  toggleCommentsModal,
  handleBookmark
}: Props) {
    
    // console.log("Post_ACTION", userSession);
  return (
    <div className={cn("relative flex items-start w-full gap-x-2", className)}>
      <LikeButton post={post} userId={userId} />
      <ActionIcon onClick={() => toggleCommentsModal(true)}>
        <MessageCircle className={"h-6 w-6"} />
      </ActionIcon> 
      <ShareButton postId={post.id} />
      <BookmarkButton post={post} userId={userId} handleBookmark={handleBookmark} />
    </div>
  );
}

export default PostActions;


{/* </button> */}
      {/* <Link href={`/content/${post.id}`}>
        <ActionIcon>
          <MessageCircle className={"h-6 w-6"} />
        </ActionIcon>
      </Link> */}