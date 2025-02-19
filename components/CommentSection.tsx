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

import { User } from "next-auth";
import Link from "next/link";
import { useEffect, useOptimistic, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Comment from "./Comment";
import NewComment from "./NewComment";
import { usePathname } from "next/navigation"; 
// import NewCommentModal from "@/components/ui/Modal/NewCommentModal";
function CommentSection({
  postId,
  comments,
  userSession,

}: {
  postId: string;
  comments: CommentWithExtras[];
  userSession?:  any;
}) {
  console.log("CommentSection_userSession", userSession);
  const pathname = usePathname(); // ✅ Get current path
  const isPostPage = pathname.startsWith(`/content/${postId}`);
  const [visibleComments, setVisibleComments] = useState<CommentWithExtras[]>([]);
  const [hasMore, setHasMore] = useState(comments.length > 10);
  
  let [isPending, startTransition] = useTransition();
  

  const handleNewComment = (newComment: CommentWithExtras) => {
    setVisibleComments((prev) => [newComment, ...prev]);
  };

  const form = useForm<z.infer<typeof CreateComment>>({
    resolver: zodResolver(CreateComment),
    defaultValues: {
      body: "",
      postId,
    },
  });

  // const [optimisticComments, addOptimisticComment] = useOptimistic( // Correct usage
  //   comments, // Initial state
  //   (state, newComment) => [ // Update function
  //     { 
  //       ...(typeof newComment === 'object' ? newComment : {}), // Spread newComment to include all its properties, especially user
  //       body: (newComment as CommentWithExtras).body, 
  //       userId: userSession?.user?.id, 
  //       postId, 
  //       user: { // Ensure user is correctly structured
  //         id: userSession?.user.id,
  //         // ... other user properties if needed
  //       }
  //     },
  //     ...state,
  //   ]
  // );

  // Show only the first 10 comments initially
  useEffect(() => {
    setVisibleComments(comments.slice(0, 10));
  }, [comments]);

  // Load more comments on scroll
  const loadMoreComments = () => {
    const nextBatch = comments.slice(visibleComments.length, visibleComments.length + 10);
    setVisibleComments([...visibleComments, ...nextBatch]);
    setHasMore(visibleComments.length + nextBatch.length < comments.length);
  }; 
  
  const body = form.watch("body");


  // const commentsCount = optimisticComments.length;
  return (
    <div className="space-y-0.5 px-3 sm:px-0 overflow-y-auto">
    {/* <div className="flex-col"> */}
    {!isPostPage && comments.length > 1  && (
        <Link
          scroll={false}
          href={`/content/${postId}`}
          className="text-neutral-500 text-sm text_stats_time text_secondary ml-[1rem]"
        >
          {/* View  {commentsCount} comments */}
        </Link>
      )}
     <div className="flex-grow overflow-y-auto min-h-[230px] max-h-[440px] border-b">
        {visibleComments.map((comment, i) => {
        const username = comment.user?.username;
        return (
          <div key={i}>
             <Comment postId={postId} 
               comment={comment}
                userSession={userSession}/>
          </div>
        );
      })}
      </div>
      {/* <NewCommentModal 
        postId={postId} 
        userSession={userSession} 
        handleNewComment={handleNewComment} 
      /> */}
    </div>
  );
}

export default CommentSection;



{/* <div className="max-lg:hidden">
<Form {...form} >
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
          className="text-sky-500 text-sm font-semibold hover:text-white disabled:hover:text-sky-500 disabled:cursor-not-allowed ml-auto"
        >
          Post
        </button>
      )}
  </form>
</Form>
</div> */}