"use client";
import { CommentWithExtras, PostWithExtras } from "@/lib/definitions";
import CommentOptions from "@/components/CommentOptions";
import UserAvatar from "@/components/UserAvatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Timestamp from "@/components/Timestamp";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import PostOptions from "@/components/PostOptions";
import CommentForm from "@/components/CommentForm";
import { usePathname } from "next/navigation"; 
import PostHeaderButtons from "../PostHeaderButtons";
import { useContentManager } from "@/context/useContentManager";
import { Session } from "next-auth";
import CommentUserAvatar from "@/components/CommentUserAvatar";
type Props = {
  comment: CommentWithExtras;
  inputRef?: React.RefObject<HTMLInputElement>;
  userSession:any
  postId:string;
  caption:string;
  createdAt:Date;
  post:PostWithExtras;
  isCurrentUserPost:boolean;
  username:string;
  isFollowing:boolean;

};

function PostHeader({ isFollowing, username, inputRef, userSession, caption , createdAt, post, isCurrentUserPost, }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const captionLimit = 100;
  const pathname = usePathname(); // ✅ Get current path
  const isPostPage = pathname.startsWith(`/content/${post.id}`);
  console.log("PostHeader_post", post);

    const {
      likes,
      shares,
      comments,
      handleLikeToggle,
      handleNewComment,
      handleShare,
      handleBookmark,
      commentsModalOpen,
      setCommentsModalOpen,
      sayHelloMessage,
      setSayHelloMessage
  
      // initialLikes, initialShares, commentsCount
    } = useContentManager({ post, userId: userSession.user.id, userSession });

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

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
    <div className="flex-col">
       {isPostPage &&  <div className="flex items-center justify-between border-b px-5 py-3 max-[640px]:bg-[#2196F3] max-[768px]:hidden">
            <HoverCard>

              <HoverCardTrigger asChild>
                <Link
                  className="max-[640px]:hidden font-semibold text-sm inline-flex  space-x-3 gap-x-1 text-center post_header_lg_avatar_container"
                  href={`/profile/${username}`}>
                  <CommentUserAvatar user={post?.user} className="h-14 w-14" />  
                   <div className="justify-center inline-flex ">
                    {username}  
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
          </div>
       

       }
 
    <div className={clsx(`flex-col group py-2 p-x-0 sm:py-3 px flex items-start sm:space-x-2.5 ${isPostPage && "sm:pl-4"} `)}>
      {/* {isPostPage && */}
       {/* <div className={clsx("flex", isPostPage && "min-[767px]:hidden")}>
              <PostHeaderButtons
                    sayHelloMessage={sayHelloMessage}
                    setSayHelloMessage={setSayHelloMessage}
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
       </div> */}
    
       
       {/* } */}
     {/* <div className="space-y-0 w-full">
      <div className="groull p-1 rounded-lg text-sm flex items-start font-medium bg-[var(--comment-background-main)] min-w-[22rem] max-w-[90vw] w-full">
     { isPostPage && <Link href={href} className="max-[767px]:hidden">
        <UserAvatar user={post?.user} className="comment_user_avatar"/> 
      </Link>
      }
      
          <div className="flex-1 ml-2 p-1 min-w-[18rem]">
          <span className="inline-flex items-center">
          
            <Link
              href={`/profile/${username}`}
              className="font-semibold text-[rgb(var(--ig-link))] comment_user_name inline-flex items-center space-x-1"
            >
              
              <span className="whitespace-nowrap -ml-1">{username}</span>
  
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
           <span className={clsx(shouldTruncate && "truncate", "aacu lg:max-w-[15rem] text-white")}>
            {renderCaptionWithLinks(displayedCaption)}
            {shouldTruncate && !isExpanded && (
              <button
                onClick={() => setIsExpanded(true)}
                className="text-blue-500 ml-1"
              >
                see more
              </button>
            )}
          </span>
            </span>
          </div>
             <div className="comment_heart justify-center px-5 mt-[-0.3rem] py-auto hidden xl:group-hover:inline mt-2 px-3 py-2 bg-[rgb(var(--ig-primary-button))] rounded-lg"  >
              <div className=" font-[var(--font-weight-system-semibold)] rounded-lg "> Follow
                </div>
            </div>
        </div>
        <div className="relative flex h-5 items-center space-x-2.5 ml-4">

          <Timestamp createdAt={createdAt} />
         
        </div>
      </div> */}
     
    </div>
    </div>
  );
}

export default PostHeader;
