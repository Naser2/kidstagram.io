import { useEffect, useState } from "react";
import CommentSection from "@/components/post/ui/CommentSection";
import PostHeaderButtons from "./PostHeaderButtons";
import { CommentWithExtras, PostWithExtras } from "@/lib/definitions";
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
  } = useContentManager({ post, userId: userSession.user.id });

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
        handleNewComment={handleNewComment} // ✅ Passed down from useContentManager
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

//  const ContentManager = ({post, userSession, postUserId}:{post:PostWithExtras, userSession: Session,postUserId:string }) => {
//   let initialLikes = post?.likes?.length || 0;
//   let initialShares = post?.shares || 0;
//   let initialComments = post?.comments?.length || 0;
//   let comments = post.comments || [];
//   const userId = userSession.user.id;
//   const [likes, setLikes] = useState(initialLikes);
//   const [shares, setShares] = useState(initialShares);
//   const [commentsCount, setCommentsCount] = useState(initialComments);
//   const [commentsList, setCommentsList] = useState(comments);
//   const [commentsModalOpen, setCommentsModalOpen] = useState(false);
//   const [hasLiked, setHasLiked] = useState(post.likes.some((like) => like.userId === userSession.user.id));


//   useEffect(() => {
//     setLikes(initialLikes);
//     setShares(initialShares);
//     setCommentsCount(initialComments);
//     setCommentsList(comments);

//   }, [post]);
//   // Handle Like Action
//   const handleLike = (liked: boolean) => {
//     setLikes((prev) => (liked ? prev + 1 : prev - 1));
//   };


//   // Handle New Comment Action
//   const handleNewComment = (newComment: CommentWithExtras) => {
//     setCommentsList((prev) => [newComment, ...prev]);
//     setCommentsCount((prev) => prev + 1);

//   };

//   const handleLikeToggle = async () => {
//     setHasLiked(!hasLiked);
//     setLikes((prev) => (hasLiked ? prev - 1 : prev + 1));

//     try {
//       const res = await fetch("/api/post/like", {
//         method: "POST",
//         body: JSON.stringify({ postId: post.id, userId }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to update like");
//       }
//     } catch (error) {
//       setHasLiked(!hasLiked);
//       setLikes((prev) => (hasLiked ? prev + 1 : prev - 1));
//     }
//   };

//   // Handle share and update count
//   const handleShare = async () => {
//     navigator.clipboard.writeText(`${window.location.origin}/content/${post.id}`);
//     setShares((prev:number) => prev + 1);

//     await fetch("/api/post/share", {
//       method: "POST",
//       body: JSON.stringify({ postId: post.id }),
//     });
//   };
  
//   return (
//     <div>
//       <PostHeaderButtons 
//         post={post}
//         userSession={userSession}
//         likes={likes}
//         shares={shares}
//         postId={post.id}
//         userId={post.user?.id}
//         initialLikes={initialLikes}
//         initialShares={initialShares}
//         commentsCount={commentsCount}
//         handleLike={handleLike}
//         handleShare={handleShare}
//         handleNewComment={handleNewComment} // Pass the global handler
//       />
//       <CommentSection postId={post.id}
//                       comments={commentsList} 
//                       post={post}
//                       likes={likes}
//                       shares={shares}
//                       userId={post.user?.id}
//                       initialLikes={initialLikes}
//                       initialShares={initialShares}
//                       // handleNewComment={handleNewComment} // Pass the global handler
//                       // handleCommentLike={handleCommentLike} // Not implemented yet
//                       // handleReplyToComment={handleReplyToComment}  // Not implemented yet
//                       userSession={userSession} 
                      
//                       />
     
//     </div>
//   );
// }


// export default  ContentManager