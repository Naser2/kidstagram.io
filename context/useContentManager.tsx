
"use client";

import { useState, useEffect } from "react";
import { CommentWithExtras, PostWithExtras } from "@/lib/definitions";
import { toast } from "sonner";
// import { getUserId } from "@/lib/utils";
import { useSession } from "next-auth/react";
interface UseContentManagerProps {
  post: PostWithExtras;
  userId: string;
  userSession: any;
}

export function useContentManager({ post, userId, userSession }: UseContentManagerProps) {
  const [likes, setLikes] = useState(post?.likes.length || 0);
  const [shares, setShares] = useState(post?.shares?.length || 0);
  const [bookmarks, setBookmarks] = useState(post?.shares?.length || 0);
  const [comments, setComments] = useState<CommentWithExtras[]>(post?.comments || []);
  const [hasLiked, setHasLiked] = useState(post?.likes?.some((like) => like?.userId === userSession.user.id));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLikes(post?.likes.length);
    setShares(post?.shares?.length || 0);  // ✅ Ensure it's a number
    setComments(post?.comments);
  }, [post]);

  const handleLikeToggle = async () => {
    const isLiking = !hasLiked;
    setHasLiked(isLiking);
    setLikes((prev) => (isLiking ? prev + 1 : prev - 1));

    try {
      const res = await fetch("/api/post/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: post.id, userId: userSession.user.id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error("Failed to update like");

      if (data?.likes !== undefined) {
        setLikes(data.likes);
      }
      return data;
    } catch (error) {
      setHasLiked(!isLiking);
      setLikes((prev) => (isLiking ? prev - 1 : prev + 1));
    }
  };
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



  const handleBookmark = async () => {
    const res = await fetch("/api/post/bookmark", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId: post.id, userId }),
    });
    setBookmarks((prev) => (res.ok ? prev + 1 : prev - 1));
    // console.log("handleBookmark" , JSON.stringify({res }))
  
    if (res.ok) { 

    const data = await res.json(); 
      toast(data.message);
    // console.log("bookmark_API_response", data);
    return data; // 
     
    } else {
      toast("Failed to save post");
    }

  }

  // ✅ Centralized Comment Handler
  const handleNewComment = async (newComment: CommentWithExtras) => {
    setComments((prev) => [newComment, ...prev]); // Update UI optimistically

    try {
      const response = await fetch("/api/comment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: newComment.body, postId: post.id }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to post comment.");
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
    try {
      const response = await fetch("/api/comment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: newComment, postId: post.id }),
      });

      const data = await response.json();
  
    } catch (error) {
      setError("Failed to post comment.");
      // handleNewComment({  status: "failed" });
    } finally {
      toast("Comment posted successfully");
    }
  };

  const handleShare = async () => {
    navigator.clipboard.writeText(`${window.location.origin}/content/${post.id}`);
    setShares((prev) => prev + 1);
  
    const userId = session?.user.id;  // ✅ Fetch user ID properly
  
    await fetch("/api/post/shares", {
      method: "POST",
      headers: { "Content-Type": "application/json" },  // ✅ Ensure correct headers
      body: JSON.stringify({ postId: post.id, userId }),  // ✅ Pass userId
    });
  };
  
  return {
    likes,
    shares,
    bookmarks,
    comments,
    hasLiked,
    handleLikeToggle,
    handleNewComment,
    handleShare,
    handleBookmark
    // initialLikes,
    // initialShares, 
    // commentsCount
  };
}
