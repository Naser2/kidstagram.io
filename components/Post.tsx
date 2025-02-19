"use client"
import UserAvatar from "@/components/UserAvatar";
import { PostWithExtras } from "@/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import Comments from "./Comments";
import Timestamp from "./Timestamp";
import { Card } from "./ui/card";
import PostOptions from "./PostOptions";
import PostActions from "./PostActions";
import { useState } from "react";
import Caption from "./Caption";
import CommentSection from "./CommentSection";
import ContentManager from "./post/ContentManager";
import PostHeader from "./post/ui/PostHeader";
import { useContentManager } from "@/context/useContentManager";
import CommentUserAvatar from "./CommentUserAvatar";

function Post({ 
  post, 
  postUsername, 
  userSession 
}  : { 
  post: PostWithExtras,
  userSession:any,  
  postUsername: string,
  postUserId: string }) {


   // const username = post.user.username;
  const postUserId = post.user.id;
  const userId= userSession.user.id
  // console.log("Post_postUserId", postUserId);
  // console.log("Post_userSession__id", userSession.user.id);
  const isCurrentUserPost = userSession?.user?.id === postUserId;

  const isCurrentUser = userSession?.user.id === post.user.id;
  const isFollowing = post?.user?.followedBy?.some(
    (user) => user.followerId === userSession?.user.id
  );
  

console.log("Post_postUsernameD", postUsername);
  // const {
  //     likes,
  //     shares,
  //     comments,
  //     handleLikeToggle,
  //     handleNewComment,
  //     latestComment,
  //     handleShare,
  //     handleBookmark,
  //     commentsModalOpen,
  //      setCommentsModalOpen
  
  //     // initialLikes, initialShares, commentsCount
  //   } = useContentManager({ post, userId: userSession.user.id, userSession});
  return (
    <div className="relativve flex flex-col space-y-2.5 mb-12">
      <div className=" flex items-center justify-between px-3 sm:px-0">
        <div className="flex space-x-3 items-center  sm:p-2">
            <Link className="font-semibold text-sm inline-flex  space-x-3 gap-x-1 text-center post_header_lg_avatar_container"
                  href={`/profile/${postUserId}`}>
                  <CommentUserAvatar user={post.user} className="h-14 w-14" />  
                  <div className="text-sm">
            <p className="text-left space-x-1">
              <span className="font-semibold">{postUsername}</span>
              <span
                className="font-medium text-neutral-500 dark:text-neutral-400
                      text-xs
                    "
              >
                •
              </span>
              <Timestamp createdAt={post.createdAt} />
            </p>
            <p className="text-xs text-black dark:text-white font-medium pt-1">
              Get real location, United States
            </p>
            </div>
            <span className="dot">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-horizontal h-5 w-5 cursor-pointer icon_svg" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r3b:" data-state="closed"><circle cx="12" cy="12" r="1"></circle></svg>
            </span>
            <div className="follow-text ">
            {isFollowing? "Unfollow" : "Follow"}
            </div>
            </Link>
         
        </div>

        <PostOptions post={post} userId={userId} isCurrentUserPost={isCurrentUserPost} />
      </div>

      <Card className="relative h-full min-h-[340px] sm:h-[350px] lg:max-h-[450px] xl:max-h-[550px]  w-full sm:overflow-hidden rounded-none sm:rounded-md flex justify-center items-center">
              <Image
                src={post.fileUrl}
                alt="Post Image"
                fill
                className="sm:rounded-md object-cover object-center"
              />
            </Card>

      {/* {post.caption && (
         <PostHeader isFollowing={isFollowing} 
                      isCurrentUserPost={isCurrentUserPost} 
                      post={post} username={postUsername} 
                      userSession={userSession} 
                      caption={post.caption} comment={post.comments[0]} 
                      postId={post.id} createdAt={post.createdAt}
                      
                       />
       
      )} */}
      <ContentManager 
            post={post} 
            userSession={userSession}
        />  

    </div>
  );
}

export default Post;
