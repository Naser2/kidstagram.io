
"use client";

import { useState, useEffect } from "react";
import { CommentWithExtras, PostWithExtras } from "@/lib/definitions";
import { toast } from "sonner";
// import { getUserId } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { handleClientScriptLoad } from "next/script";
interface UseContentManagerProps {
  post?: PostWithExtras;
  userId?: string | undefined;
  userSession?: any;
}


interface UseAccountManagerProps { // If using TypeScript
  userId: string;
  userSession?: any; // Replace 'any' with the actual type of userSession
}

export function useAccountManager({ userId, userSession }: UseAccountManagerProps) {
  // console.log(`useContentManager -> userSession`, userSession); // Remove in production

  const [suggestAccountsVisible, setSuggestAccountsVisible] = useState(false);

  const toggleSuggestAccountsVisible = () => {
    setSuggestAccountsVisible(!suggestAccountsVisible);
  };

  return {
    suggestAccountsVisible,
    toggleSuggestAccountsVisible,
  };
}


  // const handleLikeToggle = async () => {
  //   const isLiking = !hasLiked;
  
  //   // Optimistic Update
  //   setHasLiked(isLiking);
  //   setLikes((prev) => (isLiking ? prev + 1 : prev - 1));
  
  //   try {
  //     const res = await fetch("/api/post/like", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ postId: post.id, userId }),
  //     });
  
  //     const data = await res.json();
  //     // console.log("handleLikeToggle_API_LIKE_Response:", data);
  
  //     if (!res.ok) throw new Error("Failed to update like");
  
  //     // ✅ Ensure UI updates with server response
  //     if (data?.likes !== undefined) {
  //       setLikes(data.likes);
  //     }
  //     return data
  //   } catch (error) {
  //     // console.error("Like toggle error:", error);
  
  //     // Rollback if request fails
  //     setHasLiked(!isLiking);
  //     setLikes((prev) => (isLiking ? prev - 1 : prev + 1));
    
  //   }
  // };