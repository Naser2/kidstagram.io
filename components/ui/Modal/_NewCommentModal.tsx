
"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CommentForm from "@/components/CommentForm";
import { createComment } from "@/lib/actions";
import { CommentWithExtras, PostWithExtras } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateComment } from "@/lib/schemas";
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import clsx from "clsx"
import ActionIcon from "@/components/ActionIcon";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import CommentSection from "@/components/CommentSection";
import { Post, User } from "@prisma/client";
import { Session } from "inspector/promises";
// interface Comment   {
//     id: string;
//     body: string;
//     tempId?: string;
//     status: "pending" | "failed" | "success"; // Add "success" here
//     onNewComment?: Function; //
//     className?: string;
//     postId: string;
//   }
  
interface CommentModalProps {
    postId: string;
    userSession: any;
    comments: CommentWithExtras[];
    className?: string;
    handleNewComment?: (newComment: any) => void; 
    fullScreen?: boolean;
    open:boolean,
    // setOpen:React.Dispatch<React.SetStateAction<boolean>>;
    midScreen?: boolean;
    toggleCommentsModal?: Function;

  }
  export default function NewCommentModal({ postId,
    userSession,
     comments,
     className, 
     handleNewComment,
    open,
    toggleCommentsModal,
    fullScreen, 
    midScreen }: CommentModalProps) {
    
      const [comment, setComment] = useState("");
      const [formSubmitting, setFormSubmitting] = useState(false);
      const [error, setError] = useState<string | null>(null);
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!comment.trim()) return;
    
        setFormSubmitting(true);
        setError(null);
    
        // Optimistic UI
        const tempId = `temp-${Date.now()}`;
        const optimisticComment = {
          id: tempId,
          body: comment,
          status: "pending",
          userId: userSession?.user?.id,
          postId,
          user: { username: userSession?.user?.username, image: userSession?.user?.image },
          createdAt: new Date().toISOString(),
        };
    
        handleNewComment && handleNewComment(optimisticComment); // ✅ No more errors
    
        try {
          const response = await fetch("/api/comment/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ body: comment, postId }),
          });
    
          const data = await response.json();
          console.log("Comment Response: ", data);
    
          if (response.ok && data.message === "Created Comment.") {
            setComment(""); 
            handleNewComment({ ...optimisticComment, status: "success", id: data.comment.id });
          } else {
            throw new Error(data?.message || "Something went wrong.");
          }
        } catch (error) {
          setError("Failed to post comment.");
          handleNewComment({ ...optimisticComment, status: "failed" });
        } finally {
          setFormSubmitting(false);
        }
      };
  return (
        <Drawer>
          <DrawerTrigger asChild>
          {/* onClick={() => toggleCommentsModal && toggleCommentsModal(true)} */}
          <ActionIcon>
            <MessageCircle className={"h-6 w-6"} />
          </ActionIcon> 
            {/* <Button variant="outline" className="themeButton text-sm text_stats_time">comments</Button> */}
          </DrawerTrigger>
          <DrawerContent className={clsx(fullScreen && "!bg-black fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background h-[90vh]", midScreen && "!bg-black fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background h-[65vh]", "top-24" )}>

            <div className="mx-auto w-full">
              <DrawerHeader>
                <DrawerTitle className="sr-only"></DrawerTitle>
              </DrawerHeader> 
              <CommentSection 
                      postId={postId} 
                      comments={comments} 
                      userSession={userSession}
                  />

                {error && <p className="error">{error}</p>}
                <div className="sticky bottom-0 bg-black p-3 border-t border-[rgb(var(--ig-stroke))]">
                <form onSubmit={handleSubmit} className="border-b relative border-gray-200 dark:border-neutral-800 py-3 flex items-center w-full px-3">
                {formSubmitting && (
                  <div className="absolute flex justify-center items-center w-full">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                )}

                {/* Avatar */}
                <img 
                  alt={userSession.user.username ?? "no username for alt"} 
                  className="comment_user_avatar mr-2 shrink-0" 
                  draggable="false" 
                  src={userSession.user?.image}
                />

                {/* Input and button wrapper */}
                <div className="flex w-full items-center space-x-3">
                  {/* Input takes up remaining space */}
                  <input
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    disabled={formSubmitting}
                    type="text"
                    placeholder="Add a comment..."
                    className="text-input text-input-sm text-input-full flex-1 !border-0"
                  />

                  {/* Button aligned to the far right */}
                  {comment.trim().length > 0 && (
                    <button
                      disabled={!comment.trim().length || formSubmitting}
                      type="submit"
                      className="text-sky-500 text-sm font-semibold hover:text-white disabled:hover:text-sky-500 disabled:cursor-not-allowed"
                    >
                      Post
                    </button>
                  )}
                </div>
                </form>  
                </div>

            </div>
          </DrawerContent>
        </Drawer>      
      
  );
} 

{/* { comment.reply &&  <input onChange={(e) => setCommentReply(e.target.value)}
                       className="text-input text-input-sm text-input-full"
                       type="text" 
                        name="comment-reply" 
                        placeholder="Password" 
                        value={commentReply}/>
                } */}