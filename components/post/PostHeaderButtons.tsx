
"use client";

import { PostWithExtras, CommentWithExtras, LikeWithExtras } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import LikeButton from "./ui/Like";
import ShareButton from "./ui/ShareButton";
import CommentButton from "./ui/CommentButton";
import AddCommentModal from "@/components/post/ui/modal/AddCommentModal";
import { useState } from "react";
import BookmarkButton from "../BookmarkButton";
import { useContentManager } from "@/context/useContentManager";

type Props = {
  postId: string;
  userSession: any;
  className?: string;
  post: PostWithExtras;
  likes: number;
  shares: number;
  userId: string;
  comments: CommentWithExtras[];
  handleLike: (postId: string) => Promise<{ likes: number }>
  handleNewComment: Function;
  handleBookmark: Function; 
  handleShare: Function;
  // sayHelloMessage: string;
  // setSayHelloMessage: Function;
  setCommentsModalOpen: Function;
};

function PostHeaderButtons({ postId, userSession, className, post, comments, likes, shares, handleNewComment,
   handleLike, handleShare, handleBookmark }: Props) {

      const {
        commentsModalOpen,
        setCommentsModalOpen,
        // sayHelloMessage,
        // setSayHelloMessage
        // initialLikes, initialShares, commentsCount
      } = useContentManager({ post, userId: userSession.user.id, userSession });
  
console.log("setCommentsModalOpen", setCommentsModalOpen);

  return (
    <div className={cn("pl-4 max-[500px]:pt-2 flex items-center w-full gap-x-2 max-[500px]:mb-1 lg:mb-2 sm:pl-4 sm:pt-2 sm:mb-2 lg:h-[56px]", className)}>
   
        <div className="grid grid-cols-2 justify-between w-[90vw]">
            <div className="flex relative space-x-3 items-center">
              <LikeButton postId={post.id} post={post} userId={userSession?.user?.id} likes={likes} handleLike={() => handleLike(post.id)} />
              <CommentButton 
                  commentsCount={comments.length} 
                  commentIconOnClick={() => {
                // setSayHelloMessage("setSayHelloMessage--> JUST FIRED");
                    setCommentsModalOpen(true); // ✅ Opens modal on click
                }} 
              />
              <ShareButton postId={post.id} shares={shares} onShare={() => handleShare()} />
            </div> 
            <div className="x6s0dn4 x78zum5 xdt5ytf xl56j7k ml-auto max-[390px]:-mr-4  sm:mr-2 lg:mr-4">
              <BookmarkButton post={post} userId={userSession?.user?.id} handleBookmark={() => handleBookmark()} />
          </div>
        </div>
      {commentsModalOpen && (
        <div className="absolute left-0 top-full w-full">
          <AddCommentModal
            postId={post.id}
            userSession={userSession}
            comments={comments}
            handleNewComment={handleNewComment}
            open={commentsModalOpen}
            toggleCommentsModal={setCommentsModalOpen}
          />
        </div>
      )}
    </div>
  );
}

export default PostHeaderButtons;
