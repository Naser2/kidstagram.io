
import CommentSection from "@/components/post/ui/CommentSection";
import PostHeaderButtons from "./PostHeaderButtons";
import { PostWithExtras } from "@/lib/definitions";
import { Session } from "next-auth";
import { useContentManager } from "@/context/useContentManager";

const ContentManager = ({ post, userSession }: { post: PostWithExtras; userSession: Session }) => {
  const {
    likes,
    shares,
    comments,
    handleLikeToggle,
    handleNewComment,
    handleShare,
    handleBookmark,

    // initialLikes, initialShares, commentsCount
  } = useContentManager({ post, userId: userSession.user.id, userSession });

  return (
    <div>
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

      <CommentSection 
        post={post}
        likes={likes}
        postId={post.id}
        comments={comments} 
        handleNewComment={handleNewComment} // ✅ Also passed here
        userSession={userSession}  
      />
    </div>
  );
};

export default ContentManager;
