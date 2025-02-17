
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
  console.log(`useContentManager -> userSession`, userSession);
  const [sayHelloMessage, setSayHelloMessage] = useState("initial Message");  // ✅ Add message state
  const [commentsModalOpen, setCommentsModalOpen] = useState(false);
  const [likes, setLikes] = useState(post?.likes.length || 0);
  const [shares, setShares] = useState(post?.shares?.length || 0);
  const [bookmarks, setBookmarks] = useState(post?.shares?.length || 0);
  const [comments, setComments] = useState<CommentWithExtras[]>(post?.comments || []);
  const [hasLiked, setHasLiked] = useState(post?.likes?.some((like) => like?.userId === userSession.user.id));
  const [error, setError] = useState<string | null>(null);
  const [latestComment, setLatestComment] = useState<CommentWithExtras | null>(null);

  useEffect(() => {
    setLikes(post?.likes.length);
    setShares(post?.shares?.length || 0);  // ✅ Ensure it's a number
    setComments(post?.comments);
  }, [post]);


  console.log("USE_COINTENT_MANAGER_OPEN_MODAL" + commentsModalOpen);

  console.log("ContentManager_Comments_handleNewComment_API_response", comments);
  const handleNewComment = async (newComment: CommentWithExtras) => {
    setLatestComment(newComment); // ✅ Store it temporarily
  
    try {
      const response = await fetch("/api/comment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: newComment.body, postId: post.id }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to post comment.");
  
      const confirmedComment = { ...newComment, id: data.id };
  
      setLatestComment(null); // ✅ Reset latestComment AFTER global state updates
      setComments((prev) => [confirmedComment, ...prev]);
  
      return confirmedComment;
    } catch (error) {
      console.error("Failed to post comment:", error);
      setLatestComment(null);
      return null;
    }
  };
  // const handleNewComment = async (newComment: CommentWithExtras) => {
  //   setLatestComment(newComment); // ✅ Store the latest comment temporarily
  //   setComments((prev) => [newComment, ...prev]); // ✅ Optimistically update
  
  //   try {
  //     const response = await fetch("/api/comment/create", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ body: newComment.body, postId: post.id }),
  //     });
  
  //     const data = await response.json();
  //     if (!response.ok) throw new Error(data.message || "Failed to post comment.");
  
  //     const confirmedComment = { ...newComment, id: data.id };
  
  //     setLatestComment(null); // ✅ Reset latest comment after confirmed
  //     setComments((prev) => [confirmedComment, ...prev]); // ✅ Ensure global state updates
  
  //     return confirmedComment;
  //   } catch (error) {
  //     console.error("Failed to post comment:", error);
  //     setComments((prev) => prev.filter((c) => c.id !== newComment.id)); // Rollback
  //     setLatestComment(null);
  //     return null;
  //   }
  // };

  // const handleNewComment = async (newComment: CommentWithExtras) => {
  //   setComments((prev) => [newComment, ...prev]); // ✅ Update global state
  
  //   try {
  //     const response = await fetch("/api/comment/create", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ body: newComment.body, postId: post.id }),
  //     });
  
  //     const data = await response.json();
  //     if (!response.ok) throw new Error(data.message || "Failed to post comment.");
  
  //     const confirmedComment = { ...newComment, id: data.id };
  
  //     // ✅ Ensure `useContentManager` contains the latest comment
  //     setComments((prev) => [confirmedComment, ...prev]);
  //     toast("Comment posted successfully");
  //     return confirmedComment;
  //   } catch (error) {
  //     console.error("Failed to post comment:", error);
  //     setComments((prev) => prev.filter((c) => c.id !== newComment.id)); // Rollback
  //     return null;
  //   }
  // };
  
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



  const handleShare = async () => {
    navigator.clipboard.writeText(`${window.location.origin}/content/${post.id}`);
    setShares((prev) => prev + 1);
  
    // const userSession = session?.user.id;  // ✅ Fetch user ID properly
  
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
    latestComment,
    hasLiked,
    handleLikeToggle,
    handleNewComment,
    handleShare,
    handleBookmark,
    commentsModalOpen,
    setCommentsModalOpen,
    sayHelloMessage,       // ✅ Make available
    setSayHelloMessage,    // ✅ Make available
    // initialLikes,
    // initialShares, 
    // commentsCount
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