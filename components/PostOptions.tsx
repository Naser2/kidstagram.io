"use client";

import { deletePost } from "@/lib/actions";
import { PostWithExtras } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SubmitButton from "@/components/SubmitButton";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type Props = {
  post: PostWithExtras;
  userId?: string;
  className?: string;
  isCurrentUserPost: boolean;
};

function PostOptions({ post, isCurrentUserPost, className }: Props) {
  // const isPostMine = post.userId === userId;
  // console.log("PostOptions", "USER_ID", userId, "post.userId " , post.userId , isCurrentUserPost);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <MoreHorizontal
          className={cn(
            "h-5 w-5 cursor-pointer icon_svg",
            className
          )}
        />
      </DialogTrigger>
      <DialogContent className="dialogContent">
      <DialogTitle className="hidden">Post Option Modal</DialogTitle>
        {isCurrentUserPost ===true && (
          <form
            action={async (formData) => {
              const { message } = await deletePost(formData);
              toast(message);
            }}
            className="postOption"
          >
            <input type="hidden" name="id" value={post.id} />
            <SubmitButton className="text-red-500 font-bold disabled:cursor-not-allowed w-full p-3">
              Delete post
            </SubmitButton>
          </form>
        )}

        {isCurrentUserPost && (
          <Link
            scroll={false}
            href={`/content/postModal/${post.id}/edit`}
            className="postOption p-3"
          >
            Edit
          </Link>
        )}

        <form action="" className="postOption border-0">
          <button className="w-full p-3">Hide like count</button>
        </form>
        {!isCurrentUserPost &&
         <form action="" className="postOption border-0">
          <button className="w-full p-3">Report as inappropriate</button>
        </form>
        }
      </DialogContent>
    </Dialog>
  );
}

export default PostOptions;
