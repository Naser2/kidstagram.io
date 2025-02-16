
"use client"

import CommentSection from "@/components/post/ui/NewCommentSection";

import { PostWithExtras } from "@/lib/definitions";
import { Session } from "next-auth";
import { useContentManager } from "@/context/useContentManager";
import { useState } from "react";

const ContentManager = ({ post, userSession }: { post: PostWithExtras; userSession: Session }) => {

  if (!post) return null; // Ensures data is available before rendering

  const {
    likes,
    shares,
    comments,
    handleLikeToggle,
    handleNewComment,
    latestComment,
    handleShare,
    handleBookmark,
    commentsModalOpen,
     setCommentsModalOpen,
     sayHelloMessage,
     setSayHelloMessage

    // initialLikes, initialShares, commentsCount
  } = useContentManager({ post, userId: userSession.user.id, userSession});
  console.log("COMMENTS_commentsModalOpen", commentsModalOpen);
  // console.log("COMMENTS_commentsModalOpen", comments.length);
  // console.log("COMMENTS_commentsModalOpen", comments);

  return (
    <div>
      {/* <div className="sm:hidden">
      <PostHeaderButtons 
        post={post}
        userSession={userSession}
        likes={likes}
        shares={shares}
        postId={post.id}
        userId={post.user?.id}
        handleLike={handleLikeToggle}
        handleShare={handleShare}
        handleBookmark={handleBookmark}
        comments={comments}
        handleNewComment={handleNewComment} 
        // initialLikes={initialLikes}
        // initialShares={initialShares}
        //  commentsCount={commentsCount}
      />

      </div> */}
     
      <CommentSection 
        sayHelloMessage={sayHelloMessage}
        setSayHelloMessage={setSayHelloMessage}
        post={post}
        likes={likes}
        postId={post.id}
        comments={comments} 
        handleNewComment={handleNewComment} // ✅ Also passed here
        latestComment={latestComment}
        userSession={userSession}  
        // commentsModalOpen={commentsModalOpen}
        // setCommentsModalOpen={setCommentsModalOpen}

      />
      {/* <div className="hidden sm:inline  sm:mt-42  w-full">
      <PostHeaderButtons 
        post={post}
        userSession={userSession}
        likes={likes}
        shares={shares}
        postId={post.id}
        userId={post.user?.id}
        handleLike={handleLikeToggle}
        handleShare={handleShare}
        handleBookmark={handleBookmark}
        comments={comments}
        handleNewComment={handleNewComment} 
        // initialLikes={initialLikes}
        // initialShares={initialShares}
        //  commentsCount={commentsCount}
      />

      </div> */}
    </div>
  );
};

export default ContentManager;
