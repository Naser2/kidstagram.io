"use client"

import Post from "@/components/Post";
import PostOptions from "@/components/PostOptions";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchPostById } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "./ui/card";
import MiniPost from "./MiniPost";

import { useState } from "react";

import ContentManager from "./post/ContentManager";
import Caption from "./Caption";
import NewComment from "@/components/post/ui/CustomComment";
import { CommentWithExtras } from "@/lib/definitions";
import UserAvatar from "./UserAvatar";
import PostHeader from "./post/ui/PostHeader";
import CommentForm from "./CommentForm";
import { useContentManager } from "@/context/useContentManager";
import PostHeaderButtons from "./post/PostHeaderButtons";

function SinglePost({ post , userSession}: { post: any, userSession: any }) {

  
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
    const postUsername = post?.user?.username;
    const postUserId= post?.user?.id
    const isCurrentUserPost = userSession?.user?.id === post.user.id;
    const isCurrentUser = userSession?.user.id === post.user.id;
    const isFollowing = post.user?.followedBy?.some(
      (user) => user.followerId === userSession?.user.id
    );

    if (!post) {
      notFound();
    }
console.log("post", post);
  return (
    <div className="">
      <Card className="max-w-[48rem] lg:max-w-[79rem] hidden md:flex mx-auto z-50">
        <div className="relative h-full min-h-[340px] sm:min-h-[390px] lg:max-h-[650px] xl:lg:max-h-[750px] w-full sm:overflow-hidden rounded-none sm:rounded-md flex justify-center items-center">
          <Image
            src={post.fileUrl}
            alt="Post preview"
            fill
            className="md:rounded-l-md object-contain object-center w-full h-full" 
          />
        </div>

        <div className="flex  max-w-[27rem] lg:[26rem] xl:max-w-[32rem]  flex-col flex-1 border-l">
        
          <PostHeader 
              isFollowing={isFollowing}
              isCurrentUserPost={isCurrentUserPost} 
               post={post}
               username={postUsername}
               postUserId={postUserId}
               userSession={userSession} 
               caption={post.caption} 
               comment={post.comments[0]}
               postId={post.id}
               createdAt={post.createdAt}
               commentsModalOpen={commentsModalOpen}
               setCommentsModalOpen={setCommentsModalOpen}
               sayHelloMessage={sayHelloMessage}
              setSayHelloMessage={setSayHelloMessage}
                />
         
    {/* "Hidding the header like comment and share im Post header  toi place under comments when on post id or / comments routes " */}
          {post.comments.length === 0 && (
            <div className="flex flex-col items-center gap-1.5 flex-1 justify-center">
              <p className="text-xl lg:text-2xl font-extrabold">
                No comments yet.
              </p>
              <p className="text-sm font-medium">Start the conversation.</p>
            </div>
          )}
          <div className="relative">
           {/* <div className="sm:!hidden">
            <ContentManager
              post={post} 
              userSession={userSession}
              />  
            </div>  */}
            {/* {post.comments.length > 0 && (
              <ScrollArea className="hidden md:inline py-1.5 flex-1 !max-h-[290px]">
                <MiniPost post={post} />
                {post.comments.map((comment:CommentWithExtras) => (
                  <NewComment key={comment.id} comment={comment} userSession={userSession} postId={post.id} />
                ))}
              </ScrollArea>
            )} */}
            <div className="hidden sm:inline">
            <ContentManager
              post={post} 
              userSession={userSession}
              />  
            </div>   
           
          </div>
     
              {/* <PostHeaderButtons
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
            /> */}
            {/* <div className="flex flex-col items-center gap-1.5">
              <CommentForm postId={post.id} userSession={userSession} handleNewComment={handleNewComment} />
            </div> */}
       

       
        </div>
        {/* SMALL DEVICE POS */}
      </Card>
      <div className="md:hidden"> 
        <Post post={post} postUsername={postUsername} postUserId={userSession.user.id} userSession={userSession}/>
      </div>
    </div>
  );
}

export default SinglePost;
