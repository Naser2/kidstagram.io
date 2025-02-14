// 1. PostActions (Centralized State)
// This component manages:
// * Likes
// * Comments
// * Shares
// * Opening the comment modal
// * Synchronizing all actions with the UI
"use client";

import { PostWithExtras, CommentWithExtras, LikeWithExtras } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import LikeButton from "./ui/Like";
import ShareButton from "./ui/ShareButton";
import CommentButton from "./ui/CommentButton";
import AddCommentModal from "@/components/post/ui/modal/AddCommentModal";
import { useState } from "react";
import { useContentManager } from "@/context/useContentManager";
import { Like } from "@prisma/client";
import BookmarkButton from "../BookmarkButton";

type Props = {
  postId: string;
  userSession: any;
  className?: string;
  post: PostWithExtras;
  likes: number;
  shares: number;
  userId: string;
  // initialLikes: number;
  // initialShares: number;
  // commentsCount: number;
  comments: CommentWithExtras[];
  handleLike: (postId: string) => Promise<{ likes: number }>
  handleNewComment: Function;
  handleBookmark: Function; // ✅ Correct Props
  handleShare: Function; // ✅ Correct Props
};

function PostHeaderButtons({ postId, userSession, className, post, comments, likes, shares, handleNewComment, handleLike, handleShare, handleBookmark }: Props) {
  // const {
  //   likes,
  //   shares,
  //   comments,
  //   hasLiked,
  //   handleLikeToggle,
  //   handleNewComment,
  //   handleShare,
  // } = useContentManager({ post, userId: userSession?.user?.id }); // ✅ Correct Props
    

  const [commentsModalOpen, setCommentsModalOpen] = useState(false);

  if (!post) return null; // Ensures data is available before rendering

  return (
    <div className={cn("relative ml-2 pt-2 flex items-center w-full gap-x-2 mb-4", className)}>
        <div className="grid grid-cols-2 justify-between w-[90vw]">
            <div className="flex relative">
              <LikeButton postId={post.id} post={post} userId={userSession?.user?.id} likes={likes} handleLike={() => handleLike(post.id)} />
              <CommentButton commentsCount={comments.length} commentIconOnClick={() => setCommentsModalOpen(true)} />
              <ShareButton postId={post.id} shares={shares} onShare={() => handleShare()} />
            </div> 
            <div className="x6s0dn4 x78zum5 xdt5ytf xl56j7k ml-auto">
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


// import { PostWithExtras, CommentWithExtras } from "@/lib/definitions";
// import { cn } from "@/lib/utils";
// import LikeButton from "./ui/Like";
// import ShareButton from "./ui/ShareButton";
// import CommentButton from "./ui/CommentButton";
// import AddCommentModal from "@/components/post/ui/modal/AddCommentModal";
// import { useState } from "react";

// type Props = {
//   postId: string;
//   post: PostWithExtras
//   userId?: string;
//   className?: string;
//   initialLikes: number;
//   initialShares: number;
//   initialComments: number;
//   comments: CommentWithExtras[];
//   userSession: any;
//   likes: number;
//   shares: number;
//   commentsCount: number;
//   commentsList: CommentWithExtras[];
//   handleNewComment: Function;
//   handleShare: Function;
//   commentsModalOpen: Function;
//   hasLiked: boolean;
// };

// function PostHeaderButtons({ 
//   postId, 
//   post,
//   userId,
//   className,
//   userSession,
//   likes,
//   shares,
//   commentsCount,
//   handleShare,
//   commentsList,
//   commentsModalOpen,
//   hasLiked
// }: Props) {

//   return (
    
//     <div className={cn("relative flex items-center w-full gap-x-2", className)}>
//       <LikeButton postId={post.id} post={post} userId={userId} likes={likes} onLike={handleLike} />
//       <CommentButton commentsCount={commentsCount} commentIconOnClick={() => setCommentsModalOpen(true)} />
//       <ShareButton postId={post.id} onShare={handleShare} shares={shares}/>

//       {/* Comment Modal */}
//       <AddCommentModal
//         postId={post.id}
//         userSession={userSession}
//         comments={commentsList}
//         handleNewComment={handleNewComment}
//         open={commentsModalOpen}
//         toggleCommentsModal={setCommentsModalOpen}
//       />
//     </div>
//   );
// }

// export default PostHeaderButtons;