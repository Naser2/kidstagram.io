"use client";

import CommentForm from "@/components/CommentForm";
import PostActions from "@/components/PostActions";
import UserAvatar from "@/components/UserAvatar";
import ViewPost from "@/components/ViewPost";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import useMount from "@/hooks/useMount";
import { CommentWithExtras, PostWithExtras } from "@/lib/definitions";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import MiniPost from "./MiniPost";
import Comment from "./NewComment";
import { isProfileOwner } from "@/context/isAuthorized";
// import MiniPost from "./MiniPost";

type PostViewProps = {
  id: string;
  post: PostWithExtras;
  userSession: any;
  
};
function PostView({ id, post}: { id: string; post: PostWithExtras }) {
  const pathname = usePathname();
  const isPostModal = true
  // const isPostModal = pathname === `/posts/${id}`;
  const router = useRouter();
  const { data: userSession, status } = useSession();
  const user = userSession?.user 
  const inputRef = useRef<HTMLInputElement>(null);
  const username = post.user.username;
  // console.log("POST_USER_" + user);
  // console.log("USERNAME_" + username);
  const href = `/profile/${username}`;
  const mount = useMount();

const {isAuthorized }= isProfileOwner(user?.id);

  return (
    <Dialog open={isPostModal} onOpenChange={(open) => !open && router.back()}>
  <DialogContent className="flex flex-col md:flex-row  sm:max-h-[500px] sm:items-start p-0 w-screen h-screen sm:items-start p-0 md:max-w-3xl lg:max-w-5xl xl:max-w-6xl sm:h-full lg:max-h-[700px] xl:max-h-[800px]">
      {/* <DialogContent className="flex gap-0 flex-col md:flex-row items-start p-0 md:max-w-3xl lg:max-w-5xl xl:max-w-6xl h-full max-h-[500px] lg:max-h-[700px] xl:max-h-[800px]"> */}
      <DialogTitle className="hidden">Post View</DialogTitle>
        <div className="flex flex-col justify-between md:h-full md:order-2 w-full max-w-md">
          <DialogHeader className="flex border-b space-y-0 space-x-2.5 flex-row items-center py-4 pl-3.5 pr-6">
           { post.user && <>
           <Link href={href}>
              <UserAvatar user={post.user}  isProfileOwner={isAuthorized}/>
            </Link>
            <Link href={href} className="font-semibold text-sm">
              {username}
            </Link>
            </>
            }
          </DialogHeader>

          {post.comments && 
          <ScrollArea className="hidden md:inline border-b flex-1 py-1.5">
            <MiniPost post={post} />
            {post.comments.length > 0 && (
              <>
                {post.comments.map((comment:CommentWithExtras) => {
                  return (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      inputRef={inputRef}
                    />
                  );
                })}
              </>
            )}
          </ScrollArea>}

          <ViewPost className="hidden md:flex border-b" />

        {  <div className="px-2 hidden md:block mt-auto border-b p-2.5">
            {/* <PostActions post={post} userId={user?.id} /> */}
            <time className="text-[11px]  uppercase text-zinc-500 font-medium">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>}
       
          {/* <CommentForm
            postId={id}
            className="hidden md:inline-flex"
            inputRef={inputRef}
          /> */}
        </div>

        <div className="relative overflow-hidden  aspect-[6/4] h-[60vh] md:h-[500px] lg:h-[700px] xl:h-[800px] max-w-3xl w-full">
          <Image
            src={post.fileUrl}
            fill
            objectFit="cover"
            alt="Post Image"
            className="md:rounded-l-md object-cover  aspect-[6/4] h-[60vh]"
          />
        </div>

        {/* <PostActions
          post={post}
          userId={user?.id}
          className="md:hidden border-b p-2.5"
        />   */}
      {post.comments && (
        <ScrollArea className="flex-1 px-4 border-b">
          <MiniPost post={post} />
          {post.comments.map((comment: CommentWithExtras) => (
            <Comment key={comment.id} comment={comment} inputRef={inputRef} />
          ))}
        </ScrollArea>
      )}
         
        {/* <CommentForm postId={id} className="md:hidden" inputRef={inputRef} /> */}
        <ViewPost className="md:hidden" />
      </DialogContent>
    </Dialog>
  );
}

export default PostView;
