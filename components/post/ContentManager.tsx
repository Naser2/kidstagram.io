
"use client"

import CommentSection from "@/components/post/ui/NewCommentSection";
import { PostWithExtras } from "@/lib/definitions";
import { Session } from "next-auth";
import { useContentManager } from "@/context/useContentManager"

const ContentManager = ({ post, userSession }: { post: PostWithExtras; userSession: Session }) => {

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
  } = useContentManager({ post, userId: userSession.user.id, userSession});
  if (!post) return null; 
    console.log("COMMENTS_commentsModalOpen", commentsModalOpen);

  return (
    <div>
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
    </div>
  );
};

export default ContentManager;
