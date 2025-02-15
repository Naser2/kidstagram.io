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
import NewComment from "@/components/post/ui/Comment";
import { CommentWithExtras } from "@/lib/definitions";
import UserAvatar from "./UserAvatar";
import PostHeader from "./post/ui/PostHeader";

function SinglePost({ post , userSession}: { post: any, userSession: any }) {
  
    const postUsername = post?.user?.username;
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
      <Card className="max-w-3xl lg:max-w-[66rem] hidden md:flex mx-auto z-50">
        <div className="relative h-full min-h-[340px] sm:h-[450px] lg:h-[550px] w-full sm:overflow-hidden rounded-none sm:rounded-md flex justify-center items-center">
          <Image
            src={post.fileUrl}
            alt="Post preview"
            fill
            className="md:rounded-l-md object-cover"
          />
        </div>

        <div className="flex  max-w-[27rem] lg:[26rem] xl:max-w-[32rem]  flex-col flex-1 border-l">
        
          <PostHeader isFollowing={isFollowing}
              isCurrentUserPost={isCurrentUserPost} 
              post={post} username={postUsername} userSession={userSession} 
              caption={post.caption} comment={post.comments[0]} 
              userSession={userSession}
               postId={post.id}
                createdAt={post.createdAt} />
         

          {post.comments.length === 0 && (
            <div className="flex flex-col items-center gap-1.5 flex-1 justify-center">
              <p className="text-xl lg:text-2xl font-extrabold">
                No comments yet.
              </p>
              <p className="text-sm font-medium">Start the conversation.</p>
            </div>
          )}
          <div className="relative">
           <div className="sm:!hidden">
            <ContentManager
              post={post} 
              userSession={userSession}
              />  
            </div> 
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
         

          <div className="px-2 hidden md:block mt-auto border-y p-2.5">
         
        
            <time className="text-[11px] uppercase text-zinc-500 font-medium">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
       
        </div>
      </Card>
      <div className="md:hidden">
        <Post post={post} postUsername={postUsername} postUserId={userSession.user.id} userSession={userSession}/>
      </div>
    </div>
  );
}

export default SinglePost;
