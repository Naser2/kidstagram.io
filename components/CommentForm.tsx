"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import { CreateComment } from "@/lib/schemas";

function CommentForm({
  postId,
  className,
  inputRef,
  userSession,
  handleNewComment
}: {
  userSession: Session;
  postId: string;
  className?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  handleNewComment: Function;
}) {
  const form = useForm<z.infer<typeof CreateComment>>({
    resolver: zodResolver(CreateComment),
    defaultValues: {
      body: "",
      postId,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const body = form.watch("body");

  const handleSubmit = async (values: z.infer<typeof CreateComment>) => {
    if (!values.body.trim()) return;

    setIsSubmitting(true);

    const newComment = {
      id: Date.now().toString(), // Temporary ID for immediate UI update
      body: values.body,
      user: userSession.user,
      createdAt: new Date(),
      updatedAt: new Date(),
      postId: postId,
      userId: userSession.user.id,
    };

    handleNewComment(newComment);
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn(
          "max-[640px]:border-b border-t min-h-[56px] relative border-gray-200 dark:border-neutral-800 py-3 flex items-center space-x-2 w-full px-3",
          className
        )}
      >
        {isSubmitting && (
          <div className="flex justify-center items-center w-full absolute">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem className="w-full flex">
              <FormControl>
                <input
                  disabled={isSubmitting}
                  type="text"
                  placeholder="Add a comment..."
                  className="bg-transparent text-sm border-none focus:outline-none flex-1 dark:text-[var(--ig-primary-text)] placeholder-neutral-400 font-medium disabled:opacity-30 "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          disabled={!body.trim().length || isSubmitting}
          type="submit"
          className="text-sky-500 text-sm font-semibold hover:text-sky-700 dark:hover:text-white disabled:cursor-not-allowed dark:disabled:text-slate-500 disabled:text-sky-500/40 mr-4 text-[var(--ig-primary-button: 0, 149, 246;)]"
        >
          Post
        </button>
      </form>
    </Form>
  );
}

export default CommentForm;
