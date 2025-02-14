
"use client";

import { CommentWithExtras } from "@/lib/definitions";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import Comment from "../Comment";
import { DialogTitle } from "@radix-ui/react-dialog";

interface AddCommentModalProps {
  postId: string;
  userSession: any;
  comments: CommentWithExtras[];
  handleNewComment: Function
  open: boolean;
  toggleCommentsModal: (open: boolean) => void;
}

function AddCommentModal({
  postId,
  userSession,
  comments,
  handleNewComment,
  open,
  toggleCommentsModal,
}: AddCommentModalProps) {
  const [comment, setComment] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);


   const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!comment.trim()) return;

  setFormSubmitting(true);

  const newComment = {
    id: Date.now().toString(), // Temporary ID
    body: comment,  // Change 'content' to 'body' for consistency
    user: userSession.user,
    createdAt: new Date(),
    updatedAt: new Date(),
    postId: postId,
    userId: userSession.user.id,
  };

  handleNewComment(newComment);

  // ✅ Clear the input field after submitting
  setComment("");

  setFormSubmitting(false);
};

  

  return (
    <div className="!sm:right-0  margin-x-[30vw] sm:top-0">
    <Drawer open={open} onOpenChange={toggleCommentsModal}  >
      <DrawerTrigger asChild>
        <button className="hidden" aria-label="Open Comments" />
      </DrawerTrigger>
      <DrawerContent className="rounded-lg w-full sm:max-w-md p-4 ">
        <DialogTitle className="hidden">Comments</DialogTitle>
        <div className="flex justify-between items-center border-b  pb-2">
          <h3 className="text-lg font-semibold hidden">Comments</h3>
          <button onClick={() => toggleCommentsModal(false)} className="text-gray-600">×</button>
        </div>
        <div className="max-h-96 overflow-y-auto my-3">
          
          {comments.slice(0, 10).map((comment) => (
            <Comment  
                key={comment.id}
                postId={postId}
                comment={comment}
                userSession={userSession} /> 
            // <div key={comment.id} className="p-2 border-b">
            //   <p className="text-sm font-bold">{comment.user.username}</p>
            //   <p className="text-sm text-gray-700">{comment.body}</p>
            // </div>
          ))}
        </div>
        <div className="sticky bottom-0 p-3 border-t">
          <form onSubmit={handleSubmit} className="flex items-center px-3">
            {formSubmitting && <Loader2 className="h-4 w-4 animate-spin absolute" />}
            <img
              alt={userSession.user.username ?? "User Avatar"}
              className="comment_user_avatar mr-2"
              draggable="false"
              src={userSession.user?.image}
            />
            <input
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              disabled={formSubmitting}
              type="text"
              placeholder="Add a comment..."
              className="text-input text-input-sm text-input-full flex-1 !border-0"
            />
            {comment.trim().length > 0 ? (
              <button
                disabled={!comment.trim().length || formSubmitting}
                type="submit"
                className="bg-sky-500 px-6 py-2 rounded-lg font-semibold"
              >
                Post
              </button>
            ) : <button
                    disabled={!comment.trim().length || formSubmitting}
                    type="submit"
                    className="text-sky-500 px-6 py-2  font-semibold"
                  >
                    Post
                  </button>
                  }

          </form>
        </div>
      </DrawerContent>
    </Drawer></div>
  );
}

export default AddCommentModal;


// import { CommentWithExtras, PostWithExtras } from "@/lib/definitions";
// import Comment  from "/"
// import { Loader2 } from "lucide-react";

// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer"
// import clsx from "clsx"
// import ActionIcon from "@/components/ActionIcon";
// import { MessageCircle } from "lucide-react";
// import Link from "next/link";
// import CommentSection from "@/components/CommentSection";
// import { Post, User } from "@prisma/client";
// import { Session } from "inspector/promises";

  
// interface AddCommentModalProps {
//     postId: string;
//     userSession: any;
//     comments: CommentWithExtras[];
//     className?: string;
//     handleNewComment?: (newComment: any) => void; 
//     fullScreen?: boolean;
//     open:boolean,
//     // setOpen:React.Dispatch<React.SetStateAction<boolean>>;
//     midScreen?: boolean;
//     toggleCommentsModal?: Function;

//   }
//   export default function AddCommentModal({
//     postId,
//     userSession,
//     handleNewComment,
//     open,
//     toggleCommentsModal,
//   }: AddCommentModalProps) {
//     const [comment, setComment] = useState("");
//     const [formSubmitting, setFormSubmitting] = useState(false);
//     const [error, setError] = useState<string | null>(null);
  
//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       if (!comment.trim()) return;
  
//       setFormSubmitting(true);
//       setError(null);
  
//       // Optimistic UI Update
//       const tempComment = {
//         body: comment,
//         userId: userSession?.user?.id,
//         postId,
//         createdAt: new Date().toISOString(),
//         status: "pending",
//       };
  
//       handleNewComment(tempComment);
  
//       try {
//         const response = await fetch("/api/comment/create", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ body: comment, postId }),
//         });
  
//         const data = await response.json();
//         if (response.ok && data.message === "Created Comment.") {
//           handleNewComment({ ...tempComment, status: "success" });
//           setComment("");
//         } else {
//           throw new Error(data?.message || "Something went wrong.");
//         }
//       } catch (error) {
//         setError("Failed to post comment.");
//         handleNewComment({ ...tempComment, status: "failed" });
//       } finally {
//         setFormSubmitting(false);
//       }
//     };
  
//     return (
//       <Drawer open={open} onOpenChange={toggleCommentsModal}>
//         <DrawerTrigger asChild>
//           <ActionIcon>
//             <MessageCircle className="h-6 w-6" />
//           </ActionIcon>
//         </DrawerTrigger>
//         <DrawerContent className="fixed inset-x-0 bottom-0 bg-black h-[90vh]">
//           <DrawerHeader />
//           {/* {//ChatGPT pleas map over over comments here (use imported "Comment.tsx") when open to still show comments still show   } */}
//           <div className="sticky bottom-0 bg-black p-3 border-t border-[rgb(var(--ig-stroke))]">
//             <form onSubmit={handleSubmit} className="flex items-center px-3">
//               {formSubmitting && (
//                 <Loader2 className="h-4 w-4 animate-spin absolute" />
//               )}
//               <img
//                 alt={userSession.user.username ?? "User Avatar"}
//                 className="comment_user_avatar mr-2"
//                 draggable="false"
//                 src={userSession.user?.image}
//               />
//               <input
//                 onChange={(e) => setComment(e.target.value)}
//                 value={comment}
//                 disabled={formSubmitting}
//                 type="text"
//                 placeholder="Add a comment..."
//                 className="text-input flex-1 border-none"
//               />
//               {comment.trim().length > 0 && (
//                 <button
//                   disabled={!comment.trim().length || formSubmitting}
//                   type="submit"
//                   className="text-sky-500 font-semibold"
//                 >
//                   Post
//                 </button>
//               )}
//             </form>
//           </div>
//         </DrawerContent>
//       </Drawer>
//     );
//   }
