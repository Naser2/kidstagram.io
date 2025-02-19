"use client";

import { CommentWithExtras } from "@/lib/definitions";
import CommentOptions from "@/components/CommentOptions";
import UserAvatar from "@/components/UserAvatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Timestamp from "./Timestamp";

type Props = {
  comment: CommentWithExtras;
  inputRef?: React.RefObject<HTMLInputElement>;
  userSession: any;
  postId: string;
};

function Comment({ comment, inputRef, userSession }: Props) {
  const { data: session } = useSession();
  const username = comment.user.username;
  const href = `/profile/${username}`;

  // Determine if the current user is the profile owner
  const isProfileOwner = session?.user.id === comment.user.id; // Correct comparison

  return (
    <div className="group py-2 p-x0 sm:p-3 px-3.5  flex items-start space-x-2.5">
      <div className="space-y-1 w-full">
        <div className="p-1 rounded-lg text-sm flex items-start font-medium bg-[var(--comment-background-main)] min-w-[22rem] max-w-[90vw] w-full">
          <Link href={href}>
            <UserAvatar user={comment.user} 
            isProfileOwner={isProfileOwner}
             className="comment_user_avatar" /> {/* Pass the prop */}
          </Link>
          <div className="flex-1 ml-2 mt-3 min-w-[18rem]">
            <Link href={`/profile/${comment.user.id}`} className="font-semibold mr-1 whitespace-nowrap text-[rgb(var(--ig-link))] comment_user_name">
              {username}
            </Link>
            <span className="text_secondary break-words">{comment.body}</span>
          </div>
          <div className="comment_heart justify-center px-6 py-auto">
            <svg aria-label="Like" className="comment_heart_svg" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12">
              <title>Like</title>
              <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
          </div>
        </div>
        <div className="flex h-5 items-center space-x-2.5">
          <Timestamp createdAt={comment.createdAt} />
          <button className="text-xs font-semibold text-neutral-500" onClick={() => inputRef?.current?.focus()}>
            Reply
          </button>
          {comment.userId === userSession?.user.id && <CommentOptions comment={comment} />}
        </div>
      </div>
    </div>
  );
}

export default Comment;