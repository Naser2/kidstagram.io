
"use client";

import { CommentWithExtras } from "@/lib/definitions";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import CustomComment from "../CustomComment";
import { DialogTitle } from "@radix-ui/react-dialog";

interface AddCommentModalProps {
  postId: string;
  userSession: any;
  comments: CommentWithExtras[];
  handleNewComment: Function
  open: boolean;
  toggleCommentsModal: (open: boolean) => void
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

// alert(open)
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
          
          {comments.slice(0, 10).map((comment, idx) => (
            <CustomComment  
                key={idx}
                postId={postId}
                comment={comment}
                userSession={userSession} /> 
          ))}
        </div>
        <div className="sticky bottom-0 p-3 xl:border-t">
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
                className="bg-[var(--primary-button-background)] text-white hover:bg-sky-700 px-6 py-2 rounded-lg font-semibold"
              >
                Post {formSubmitting && <Loader2 className="h-4 w-4 animate-spin absolute" /> }
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

