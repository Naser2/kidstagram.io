import { CommentWithExtras, PostWithExtras } from "@/lib/definitions";
import PostHeaderButtons from "../PostHeaderButtons";
import { useEffect, useState } from "react";
// import Comment from "@/components/Comment";
import NewComment from "@/components/post/ui/Comment";
import { useContentManager } from "@/context/useContentManager";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Comment from "@/components/Comment";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import MiniPost from "@/components/MiniPost";

interface NewCommentSectionProps {
  postId: string;
  post: PostWithExtras;
  userSession: Session;
  comments: CommentWithExtras[];
  // initialComments: number;
  handleNewComment: Function;
  likes: number;
}

// function NewCommentSection({ postId, userSession, comments: initialComments }: NewCommentSectionProps) {
  
  function NewCommentSection({ postId,comments, userSession, post }: NewCommentSectionProps) {
    let pathname = usePathname()
    const isPostPage = pathname.startsWith(`/content/${postId}`);

  const [visibleComments, setVisibleComments] = useState<CommentWithExtras[]>(comments?.slice(0, 10));
  const [hasMore, setHasMore] = useState(comments?.length > 10);

  useEffect(() => {
    setVisibleComments(comments?.slice(0, 10));
  }, [comments]);
  return (
    <div className="space-y-1 px-0 sm:px-0 overflow-y-auto">
     

      {/* Comment List */}
      <div className="flex-grow overflow-y-auto max-h-[440px] border-b -mt-1 pb-5 px-4">
      {!isPostPage && visibleComments && visibleComments.length > 1 ? (
              <Link
                scroll={false}
                href={`/content/${postId}`}
                className="text-neutral-500 text-sm text_stats_time text_secondary "
              >
                View  {comments.length} comments
              </Link>
         ) :  visibleComments && visibleComments.slice(0, 10).map((comment, index) => (
                //  <Comment key={comment.id} comment={comment} />
           <div key={index} className="">
            <div className="">
                <NewComment  
                  key={comment.id}
                  postId={postId}
                  comment={comment}
                  userSession={userSession} /> 

               </div>
           
                {/* <div className="hidden md:inline"> {post.comments.length > 0 && (
                    <ScrollArea className=" py-1.5 flex-1 ">
                      <MiniPost post={post} />
                      {post.comments.map((comment) => (
                        <NewComment  
                         key={comment.id}
                         postId={postId}
                         comment={comment}
                         userSession={userSession} /> 
                        // <Comment key={comment.id +"mini"} comment={comment} userSession={userSession} postId={postId} />
                      ))}
                    </ScrollArea>
                  )}
                </div> */}
              </div> 
        
              // <div key={comment.id} className="p-2 border-b">
              //   <p className="text-sm font-bold">{comment.user.username}</p>
              //   <p className="text-sm text-gray-700">{comment.body}</p>
              // </div>
            ))
            }
        {/* {visibleComments && visibleComments.map((comment, i) => (
          <Comment 
              key={comment.id}
              postId={postId}
              comment={comment}
              userSession={userSession} />
        ))} */}

      </div>
    </div>
  );
}

export default NewCommentSection;


 {/* Post Actions - Likes, Shares, Comments */}
      {/* <PostHeaderButtons
        postId={postId}
        post={post}
        userSession={userSession}
        userId={userSession?.user?.id}
        initialLikes={initialLikes}
        initialShares={initialShares}
        initialComments={comments.length}
      /> */}

// import { CommentWithExtras, PostWithExtras } from "@/lib/definitions";
// import PostHeaderButtons from "../PostHeaderButtons";
// import { useEffect, useState } from "react";
// import Comment from "@/components/Comment";

// function CommentSection({
//     postId,
//     post,
//     comments,
//     userSession,
//     initialLikes,
//     initialShares,
//     handleNewComment
//   }: {
//     postId: string;
//     post: PostWithExtras;
//     comments: CommentWithExtras[];
//     userSession: any;
//     initialLikes: number;
//     initialShares: number;
//     handleNewComment:Function
//   }) {
//     const [visibleComments, setVisibleComments] = useState<CommentWithExtras[]>(comments.slice(0, 10));
//     const [hasMore, setHasMore] = useState(comments.length > 10);
  
//     useEffect(() => {
//       setVisibleComments(comments.slice(0, 10));
//     }, [comments]);
  
//     return (
//       <div className="space-y-2 px-3 sm:px-0 overflow-y-auto">
//         {/* Post Actions - Manages Likes, Shares, and Comments */}
//         <PostHeaderButtons
//           postId={postId}
//           post={post}
//           userSession={userSession}
//           comments={comments}
//           userId={userSession?.user?.id}
//           initialLikes={initialLikes}
//           initialShares={initialShares}
//           initialComments={comments.length}
//         />
  
//         {/* Comment List */}
//         <div className="flex-grow overflow-y-auto max-h-[440px] border-b">
//           {visibleComments.map((comment, i) => (
//             <Comment key={i} postId={postId} comment={comment} userSession={userSession} />
//           ))}
//         </div>
//       </div>
//     );
//   }
  
//   export default CommentSection