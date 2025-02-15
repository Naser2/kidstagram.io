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

function SinglePost({ post , userSession}: { post: any, userSession: any }) {


  const postUsername = post?.user?.username;
  const isCurrentUserPost = userSession?.user?.id === post.user.id;

  if (!post) {
    notFound();
  }

  return (
    <div className="">
      <Card className="max-w-3xl lg:max-w-[66rem] hidden md:flex mx-auto z-50">
        <div className="relative overflow-x-hidden h-[450px] max-w-xl w-full">
          <Image
            src={post.fileUrl}
            alt="Post preview"
            fill
            className="md:rounded-l-md object-cover"
          />
        </div>

        <div className="flex  max-w-[27rem] lg:[26rem] xl:max-w-[32rem]  flex-col flex-1">
          <div className="flex items-center justify-between border-b px-5 py-3">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link
                  className="font-semibold text-sm inline-flex  space-x-3"
                  href={`/profile/${postUsername}`}
                >
                  {postUsername}  
                  <span className="pl-2 justify-center mt-1"><svg aria-label="Verified"
                        className="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fillRule="evenodd"></path></svg></span>
                       <Caption caption={post.caption} />
                </Link>
              </HoverCardTrigger>
              <HoverCardContent>
                {/* <div className="flex items-center space-x-2">
                  <UserAvatar user={post.user} className="h-14 w-14" />
                  <div>
                    <p className="font-bold">{postUsername}</p>
                    <p className="text-sm font-medium dark:text-neutral-400">
                      {post.user.name}   
                    </p>
                  </div>
                </div> */}
              </HoverCardContent>
            </HoverCard>
     

            <PostOptions post={post} userId={userSession.user.id} isCurrentUserPost={isCurrentUserPost}/>
          </div>

          {post.comments.length === 0 && (
            <div className="flex flex-col items-center gap-1.5 flex-1 justify-center">
              <p className="text-xl lg:text-2xl font-extrabold">
                No comments yet.
              </p>
              <p className="text-sm font-medium">Start the conversation.</p>
            </div>
          )}
          <ContentManager
            post={post} 
            userSession={userSession}
            />  
          {post.comments.length > 0 && (
            <ScrollArea className="hidden md:inline py-1.5 flex-1 !max-h-[290px]">
              <MiniPost post={post} />
              {post.comments.map((comment:CommentWithExtras) => (
                <NewComment key={comment.id} comment={comment} userSession={userSession} postId={post.id} />
              ))}
            </ScrollArea>
          )}

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
