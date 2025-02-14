"use client";

import { createComment } from "@/lib/actions";
import { CommentWithExtras } from "@/lib/definitions";
import { CreateComment } from "@/lib/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Comment } from "@prisma/client";
import { User } from "next-auth";
import Link from "next/link";
import { useOptimistic, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function Comments({
  postId,
  comments,
  userSession,
}: {
  postId: string;
  comments: CommentWithExtras[];
  userSession: any ;
}) {
  const form = useForm<z.infer<typeof CreateComment>>({
    resolver: zodResolver(CreateComment),
    defaultValues: {
      body: "",
      postId,
    },
  });
  let [isPending, startTransition] = useTransition();
  const [optimisticComments, addOptimisticComment] = useOptimistic<
    CommentWithExtras[]
  >(
    comments,
    // @ts-ignore
    (state: Comment[], newComment: string) => [
      { body: newComment, userId: userSession.user?.id, postId, userSession},
      ...state,
    ]
  );
  const body = form.watch("body");
  const commentsCount = optimisticComments.length;
   console.log("COMMENT_COMP", userSession.user)
  return (
    <div className="space-y-0.5 px-3 sm:px-0">
     
      {optimisticComments.slice(0, 10).map((comment, i) => {
        const username = comment.user?.username;
        const commentor_avatar = userSession.user.picture
        return (
          <div key={i} className="p-1 rounded-lg text-sm flex items-start font-medium bg-[var(--comment-background-main)]">
          {/* Avatar */}
          <img 
            alt={username ?? "no username for alt"} 
            className="comment_user_avatar mr-2 shrink-0" 
            draggable="false" 
            src={commentor_avatar}
          />
        
          {/* Text Container (username + comment) */}
          <div className="flex-1">
            <Link href={`/profile/${username}`} className="font-semibold mr-1 whitespace-nowrap text-[rgb(var(--ig-link))] comment_user_name">
              {username}
            </Link>
            <span className="text_secondary break-words">
              {comment.body}
            </span>
          </div>
        </div>
        );
      })}
     
    </div>
  );
}

export default Comments;


 {/* {commentsCount > 1 && (
        <Link
          scroll={false}
          href={`/content/${postId}`}
          className="text-neutral-500 text-sm text_stats_time text_secondary"
        >
          View  {commentsCount} comments
        </Link>
      )} */}

 {/* <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (values) => {
            const valuesCopy = { ...values };
            form.reset();
            startTransition(() => {
              addOptimisticComment(valuesCopy.body);
            });

            await createComment(valuesCopy);
          })}
          className="border-b border-gray-300 dark:border-neutral-800 pb-3 py-1 flex items-center space-x-2"
        >
          <FormField
            control={form.control}
            name="body"
            render={({ field, fieldState }) => (
              <FormItem className="w-full flex">
                <FormControl>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="bg-transparent text-sm border-none focus:outline-none flex-1 placeholder-neutral-500 dark:text-white dark:placeholder-neutral-400 font-medium"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {body.trim().length > 0 && (
            <button
              type="submit"
              className="text-sky-500 text-sm font-semibold hover:text-white disabled:hover:text-sky-500 disabled:cursor-not-allowed"
            >
              Post
            </button>
          )}
        </form>
      </Form> */}