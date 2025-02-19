import { CommentWithExtras, PostWithExtras, UserWithExtras } from "@/lib/definitions";

import { useEffect, useState } from "react";
import CustomComment from "@/components/post/ui/CustomComment";
import { usePathname } from "next/navigation";
import Link from "next/link";
import MiniPost from "@/components/MiniPost";
import { Session } from "next-auth";
import CommentForm from "@/components/CommentForm";
import AddCommentModal from "./modal/AddCommentModal";
import { useContentManager } from "@/context/useContentManager";
// import PostHeader from "./PostHeader";
import PostHeaderButtons from "../PostHeaderButtons";
import clsx from "clsx";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import PostOptions from "@/components/PostOptions";
// import UserAvatar from "@/components/UserAvatar";
import Timestamp from "@/components/Timestamp";
import CommentUserAvatar from "@/components/CommentUserAvatar";
interface NewCommentSectionProps {
  postId: string;
  post: PostWithExtras;
  userSession: Session;
  comments: CommentWithExtras[];
  likes: any;
  handleNewComment: Function;
  latestComment: CommentWithExtras | null;  // ✅ Allow null to avoid unnecessary updates
  // commentsModalOpen: boolean,
  // setCommentsModalOpen: Function
  sayHelloMessage: string;
  setSayHelloMessage: Function
}

function NewCommentSection({ postId, userSession, post, latestComment,   }: NewCommentSectionProps) {
  // console.log(`latestComment_NewCommentSection: ${latestComment}`);
  const pathname = usePathname();
  const isPostPage = pathname.includes(`/content/${postId}`);
  const INITIAL_COUNT = isPostPage ? 4 : 1; // Show 4 comments on post page, 10 elsewhere
  const LOAD_MORE_COUNT = 10;


   const {
    likes,
    shares,
    comments,
    handleLikeToggle,
    handleNewComment,
    handleShare,
    handleBookmark,
    commentsModalOpen,  // ✅ Should be available
    setCommentsModalOpen,  // ✅ Should be available
    sayHelloMessage, 
    setSayHelloMessage 

    // initialLikes, initialShares, commentsCount
  } = useContentManager({ post, userId: userSession.user.id, userSession });
  const [localComments, setLocalComments] = useState<CommentWithExtras[]>(comments);
  const [visibleComments, setVisibleComments] = useState<CommentWithExtras[]>(comments.slice(0, INITIAL_COUNT));
  const [hasMore, setHasMore] = useState(comments.length > INITIAL_COUNT);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const postUsername = post?.user?.username;
  const isCurrentUserPost = userSession?.user?.id === post.user.id;
  const isCurrentUser = userSession?.user.id === post.user.id;
  const isFollowing = post.user?.followedBy?.some(
    (follow) => follow.followerId === userSession?.user.id
  );
  

  useEffect(() => {
    console.log(`NewCommentSection_ModalOpe_UseEFFECT: ${commentsModalOpen}`);
  }, [commentsModalOpen]);

  useEffect(() => {
    setLocalComments(comments);
    setVisibleComments(comments.slice(0, INITIAL_COUNT));
    setHasMore(comments.length > INITIAL_COUNT);
  }, [comments, INITIAL_COUNT]);

  // ✅ Ensure latestComment is added to `visibleComments`
  useEffect(() => {
    if (latestComment) {
      setLocalComments((prev) => [latestComment, ...prev]);  // Add to global comments
      setVisibleComments((prev) => [latestComment, ...prev]);  // Add to visible comments
    }
  }, [latestComment]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const captionLimit = 100;
  const caption = post?.caption || "";
  const username = userSession?.user?.username;
  const shouldTruncate = caption.length > captionLimit && !isSmallScreen;
  const [displayedCaption, setDisplayedCaption] = useState(
    shouldTruncate ? caption.slice(0, captionLimit) + "..." : caption
  );


  useEffect(() => {
    if (isExpanded || isSmallScreen) {
      setDisplayedCaption(caption);
    } else {
      setDisplayedCaption(
        shouldTruncate ? caption.slice(0, captionLimit) + "..." : caption
      );
    }
  }, [isExpanded, caption, shouldTruncate, isSmallScreen]);


  if (!post) return null; // Ensures data is available before rendering
  const loadMoreComments = () => {
    const nextComments = localComments.slice(0, visibleComments.length + LOAD_MORE_COUNT);
    setVisibleComments(nextComments);
    setHasMore(nextComments.length < localComments.length);
  };

  const showLessComments = () => {
    const newCount = Math.max(INITIAL_COUNT, visibleComments.length - LOAD_MORE_COUNT);
    setVisibleComments(localComments.slice(0, newCount));
    setHasMore(true);
  };
  console.log("PostHeader_post", post);

  // Function to parse hashtags and wrap them in <a>
  const renderCaptionWithLinks = (text: string) => {
    return text.split(/(\s+)/).map((word, index) => {
      if (word.startsWith("#")) {
        return (
          <a
            key={index}
            href={`/hashtag/${word.substring(1)}`}
            className="text-blue-500 font-medium"
            style={{
              color: "rgb(var(--ig-link))",
              fontWeight: "var(--font-weight-system-regular)",
              fontSize: "var(--system-14-font-size)",
              lineHeight: "var(--system-14-line-height)",
              fontFamily: "var(--font-family-system)",
              margin: "-3px 0 -4px",
              wordWrap: "break-word",
            }}
          >
            {word}
          </a>
        );
      }
      return word;
    });
  };

  // const username = post?.user?.username;
  const href = `/profile/${username}`;

  return (
    <div className="space-y-1 px-0 sm:px-0 overflow-y-auto min-[770px]:pl-1">
       <div className={clsx("flex", isPostPage && "min-[767px]:hidden")}>
              <PostHeaderButtons
                    //  sayHelloMessage={sayHelloMessage}
                     setCommentsModalOpen={setCommentsModalOpen} 
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
       </div>
       <div className="space-y-0 w-full">
      <div className="group  lg:pr-8  p-1 rounded-lg text-sm flex items-start font-medium bg-[var(--comment-background-main)] min-w-[22rem] max-w-[90vw] w-full">
          { isPostPage && <Link href={href} className="max-[767px]:hidden">
              <CommentUserAvatar user={post?.user} className="comment_user_avatar"/> 
            </Link>
            }
          {/* Text Container (username + comment) */}
          <div className="flex-1 ml-1 p-1 min-w-[18rem]">
          <span className="inline-flex items-center">
            {/* Username Link */}
            <Link
              href={`/profile/${postUsername}`}
              className="font-semibold text-[rgb(var(--ig-link))] comment_user_name inline-flex items-center space-x-1"
            >
              {/* Username */}
              <span className="whitespace-nowrap -ml-1">{postUsername}</span>
              
              {/* Verified Checkmark */}
              <svg
                aria-label="Verified"
                className="h-[12px] w-[12px] fill-[#0095F6]" // Tailwind-compatible styling
                role="img"
                viewBox="0 0 40 40"
              >
                <title>Verified</title>
                <path
                  d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </Link>
          </span>

        <span className="text_secondary break-words">
           <span className={clsx(shouldTruncate && "truncate", "aacu lg:max-w-[15rem]")}>
            {renderCaptionWithLinks(displayedCaption)}
            {shouldTruncate && !isExpanded && (
              <button
                onClick={() => setIsExpanded(true)}
                className="text-blue-500 ml-1"
              >
                see more
              </button>
            )}  <Timestamp createdAt={post.createdAt} /> <span className="font-medium text-neutral-500 dark:text-neutral-400 text-xs">ago</span>
          </span>
            </span>
          </div>
            {!isFollowing &&  <div className="comment_heart justify-center px-5 mt-[-0.3rem] py-auto hidden xl:group-hover:inline mt-2 px-3 py-2 bg-[rgb(var(--ig-primary-button))] rounded-lg"  >
              <div className=" font-[var(--font-weight-system-semibold)] rounded-lg "> Follow
                </div>
            </div>}
        </div>
      </div>
       {!isPostPage &&  <div className="!hidden flex items-center justify-between border-b px-5 py-3 max-[640px]:bg-[#2196F3] max-[768px]:hidden">
            <HoverCard>

              <HoverCardTrigger asChild>
                <Link
                  className="max-[640px]:hidden font-semibold text-sm inline-flex  space-x-3 gap-x-1 text-center post_header_lg_avatar_container"
                  href={`/profile/${postUsername}`}>
                  <CommentUserAvatar user={post?.user} className="h-14 w-14" />  
                   <div className="justify-center inline-flex ">
                    {postUsername}  
                    <span className="pl-2 justify-center mt-1">
                      <svg aria-label="Verified"
                        className="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fillRule="evenodd"></path>
                        </svg>
                     </span>
                  </div>    
                    <span className="dot">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-horizontal h-5 w-5 cursor-pointer icon_svg" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r3b:" data-state="closed"><circle cx="12" cy="12" r="1"></circle></svg>
                    </span>
                   <div className="follow-text ">
                    {isFollowing? "Unfollow" : "Follow"}
                   </div>
                </Link>
              </HoverCardTrigger>

              <HoverCardContent>
                <div className="flex items-center space-x-2">
                  <CommentUserAvatar user={post?.user} className="h-14 w-14" />
                  <div>
                    <p className="font-bold">{post?.user.username}</p>
                    <p className="text-sm font-medium dark:text-neutral-400">
                      {post?.user.name}   
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
     

            <PostOptions post={post} userId={userSession.user.id} isCurrentUserPost={isCurrentUserPost}/>
          </div>}
      <div className="flex-grow overflow-y-auto max-h-[440px] border-b -mt-1 pb-5 px-1">
        <div className="min-[767px]:hidden">
           <CommentForm postId={postId} userSession={userSession} handleNewComment={handleNewComment} />
        </div>
       
        {!isPostPage && comments.length > 1 ? (
          <>
           { visibleComments.map((comment, index) => (
            <div key={index} className="">
              <CustomComment key={comment.id} postId={postId} comment={comment} userSession={userSession} />
            </div>
          ))}
          <Link
            scroll={false}
            href={`/content/${postId}`}
            className="text-neutral-500 text-sm text_stats_time text_secondary pl-6"
          >
            View {comments.length} comments
          </Link>
          </>
        ) : (
          visibleComments.map((comment, index) => (
            <div key={index} className="">
              <CustomComment key={comment.id} postId={postId} comment={comment} userSession={userSession} />
            </div>
          ))
        )}
        {/* Load More / Show Less Buttons */}
        {isPostPage && (
          <div className="mt-2 text-center">
            {hasMore ? (
              <button onClick={loadMoreComments} className="text-sm text-blue-500 hover:underline">
                View more comments
              </button>
            ) : visibleComments.length > INITIAL_COUNT ? (
              <button onClick={showLessComments} className="text-sm text-red-500 hover:underline">
                View less
              </button>
            ) : null}
          </div>
        )}
      </div>
      {/* MODAL */}
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

       
        <div className={clsx( isPostPage ?"max-[767px]:hidden":"hidden")}>
          <div className="flex-col">
                    <PostHeaderButtons
                      setCommentsModalOpen={setCommentsModalOpen} 
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
                       <CommentForm postId={postId} userSession={userSession} handleNewComment={handleNewComment} />
          </div>
              
       </div>

    
    </div>
  );
}

export default NewCommentSection;

