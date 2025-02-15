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

function Post({ 
  post, 
  postUsername, 
  userSession 
}  : { 
  post: PostWithExtras,
  userSession:any,  
  postUsername: string,
  postUserId: string }) {

  // console.log("Post_userSession", userSession);
  const [commentsModalOpen, setCommentsModalOpen] = useState(false);
  const [allComments, setAllComments] = useState<Array<{ body: string; tempId: string; status: "pending" | "failed" | "success" }>>(post.comments || []);
   // const username = post.user.username;
  const postUserId = post.user.id;
  const userId= userSession.user.id
  // console.log("Post_postUserId", postUserId);
  // console.log("Post_userSession__id", userSession.user.id);
  const isCurrentUserPost = userSession?.user?.id === postUserId;


  return (
    <div className="relativve flex flex-col space-y-2.5 mb-12">
      <div className="flex items-center justify-between px-3 sm:px-0">
        <div className="flex space-x-3 items-center">
          <UserAvatar user={post.user} />
          <div className="text-sm">
            <p className="space-x-1">
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
            <p className="text-xs text-black dark:text-white font-medium">
              Get real location, United States
            </p>
          </div>
        </div>

        <PostOptions post={post} userId={userId} isCurrentUserPost={isCurrentUserPost} />
      </div>

      <Card className="relative h-full min-h-[340px] sm:h-[450px] w-full sm:overflow-hidden rounded-none sm:rounded-md">
        <Image
          src={post.fileUrl}
          alt="Post Image"
          fill
          className="sm:rounded-md object-cover"
        />
      </Card>
      {post.caption && (
        <div className="text-sm text_stats_time leading-none flex items-center space-x-2 font-medium px-3 sm:px-0">
          <Link href={`/profile/${postUsername}`} className="font-bold _ap3a _aaco _aacw _aacx _aad7 _aade">
            {postUsername}
          </Link>
          <span><svg aria-label="Verified"
           className="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fillRule="evenodd"></path></svg></span>
           <Caption caption={post.caption} />
          {/* <span className="aacu truncate">{post.caption}</span> */}
        </div>
      )}
      <ContentManager 
            post={post} 
            userSession={userSession}
        />  

    </div>
  );
}

export default Post;
