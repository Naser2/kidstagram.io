// ----------------NEW ---------
"use client";

import { useState, useEffect } from "react";
import { CommentWithExtras, PostWithExtras } from "@/lib/definitions";
import { toast } from "sonner";
import { getUserId } from "@/lib/utils";

interface UseContentManagerProps {
  post: PostWithExtras;
  userId: string;
}

export function useContentManager({ post, userId }: UseContentManagerProps) {
  // let initialLikes = post?.likes?.length || 0;
  // let initialShares = post?.shares || 0;
  // let initialComments = post?.comments?.length || 0;



  // const [commentsCount, setCommentsCount] = useState(initialComments);
  const [likes, setLikes] = useState(post?.likes.length || 0);
  const [shares, setShares] = useState(post?.shares?.length || 0); // ✅ Ensure count
  const [bookmarks, setBookmarks] = useState(post?.shares?.length || 0); // ✅ Ensure count
  const [comments, setComments] = useState<CommentWithExtras[]>(post?.comments || []);
  const [hasLiked, setHasLiked] = useState(post?.likes?.some((like) => like?.userId === userId));
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<{ user?: any } | null>(null);
  const [loading, setLoading] = useState(true);

  console.log("DATA_LIKES", likes)

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/auth/session"); // Client-side fetch
        if (response.ok) {
          const sessionData = await response.json();
          setSession(sessionData);
        } else {
          console.error("Failed to fetch session");
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  
  // Effect to update when post changes
  useEffect(() => {
    setLikes(post?.likes.length);
    setShares(post?.shares?.length || 0);  // ✅ Ensure it's a number
    setComments(post?.comments);
  }, [post]);

  const handleBookmark = async () => {
    const res = await fetch("/api/post/bookmark", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId: post.id, userId }),
    });
    setBookmarks((prev) => (res.ok ? prev + 1 : prev - 1));
    console.log("handleBookmark" , JSON.stringify({res }))
  
    if (res.ok) { 

    const data = await res.json(); 
      toast(data.message);
    console.log("bookmark_API_response", data);
    return data; // 
     
    } else {
      toast("Failed to save post");
    }

  }
 const handleLikeToggle = async () => {
  const isLiking = !hasLiked;

  // Optimistic Update
  setHasLiked(isLiking);
  setLikes((prev) => (isLiking ? prev + 1 : prev - 1));

  try {
    const res = await fetch("/api/post/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId: post.id, userId }),
    });

    const data = await res.json();
    console.log("handleLikeToggle_API_LIKE_Response:", data);

    if (!res.ok) throw new Error("Failed to update like");

    // ✅ Ensure UI updates with server response
    if (data?.likes !== undefined) {
      setLikes(data.likes);
    }
    return data
  } catch (error) {
    console.error("Like toggle error:", error);

    // Rollback if request fails
    setHasLiked(!isLiking);
    setLikes((prev) => (isLiking ? prev - 1 : prev + 1));
  
  }
};
  
  // const handleLikeToggle = async () => {
  //   setHasLiked(!hasLiked);
  //   setLikes((prev) => (hasLiked ? prev - 1 : prev + 1));

  //   try {
  //     const res = await fetch("/api/post/like", {
  //       method: "POST",
  //       body: JSON.stringify({ postId: post.id, userId }),
  //     });
  //     if (!res.ok) throw new Error("Failed to update like");
  //   } catch (error) {
  //     setHasLiked(!hasLiked);
  //     setLikes((prev) => (hasLiked ? prev + 1 : prev - 1));
  //   }
  // };

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
      console.log("Comment Response: ", data);

      // if (response.ok && data.message === "Created Comment.") {
      //   setComment(""); 
      //   // handleNewComment({ status: "success", id: data.comment.id });
      // } else {
      //   throw new Error(data?.message || "Something went wrong.");
      // }
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

// import { useState, useEffect } from "react";
// import { CommentWithExtras, PostWithExtras } from "@/lib/definitions";
// // import { fetchPostDetails, fetchComments } from "@/lib/api";

// interface UseContentManagerProps {
//   post: PostWithExtras;
//   userId: string;
// }

// export function useContentManager({ post, userId }: UseContentManagerProps) {
//   const [likes, setLikes] = useState(post?.likes.length || 0);
//   const [shares, setShares] = useState(post?.shares || 0);
//   const [comments, setComments] = useState<CommentWithExtras[]>(post?.comments || []);
//   const [hasLiked, setHasLiked] = useState(post?.likes?.some((like) => like?.userId === userId));

//   console.log("POST_COMMENTS", post.comments)
//   useEffect(() => {
//     setLikes(post?.likes.length);
//     setShares(post?.shares);
//     setComments(post?.comments);
//   }, [post]);

//   const handleLikeToggle = async () => {
//     setHasLiked(!hasLiked);
//     setLikes((prev) => (hasLiked ? prev - 1 : prev + 1));

//     try {
//       const res = await fetch("/api/post/like", {
//         method: "POST",
//         body: JSON.stringify({ postId: post.id, userId }),
//       });
//       if (!res.ok) throw new Error("Failed to update like");
//     } catch (error) {
//       setHasLiked(!hasLiked);
//       setLikes((prev) => (hasLiked ? prev + 1 : prev - 1));
//     }
//   };

//   const handleNewComment = (newComment: CommentWithExtras) => {
//     setComments((prev) => [newComment, ...prev]);
//   };

//   const handleShare = async () => {
//     navigator.clipboard.writeText(`${window.location.origin}/content/${post.id}`);
//     setShares((prev:number) => prev + 1);

//     await fetch("/api/post/share", {
//       method: "POST",
//       body: JSON.stringify({ postId: post.id }),
//     });
//   };

//   return {
//     likes,
//     shares,
//     comments,
//     hasLiked,
//     handleLikeToggle,
//     handleNewComment,
//     handleShare,
//   };
// }


// import { useState, useEffect } from "react";
// import { CommentWithExtras, PostWithExtras } from "@/lib/definitions";
// import { fetchPostById, fetchComments } from "@/lib/data";

// interface ContentManagerState {
//   post: PostWithExtras | null;
//   comments: CommentWithExtras[];
//   initialLikes: number;
//   initialShares: number;
//   handleNewComment: (newComment: CommentWithExtras) => void;
// }

// export function useContentManager(postId: string): ContentManagerState {
//   const [post, setPost] = useState<PostWithExtras | null>(null);
//   const [comments, setComments] = useState<CommentWithExtras[]>([]);
//   const [initialLikes, setInitialLikes] = useState<number>(0);
//   const [initialShares, setInitialShares] = useState<number>(0);

//   useEffect(() => {
//     async function loadPostData() {
//       try {
//         const {data} = await fetchPostById(postId);
//         const postData = data
//         setPost(postData);
//         setInitialLikes(postData.likes);
//         setInitialShares(postData.shares);
//       } catch (error) {
//         console.error("Error fetching post data:", error);
//       }
//     }

//     async function loadComments() {
//       try {
//         const commentsData = await fetchComments(postId);
//         setComments(commentsData);
//       } catch (error) {
//         console.error("Error fetching comments:", error);
//       }
//     }

//     loadPostData();
//     loadComments();
//   }, [postId]);

//   const handleNewComment = (newComment: CommentWithExtras) => {
//     setComments((prevComments) => [newComment, ...prevComments]);
//   };

//   return { post, comments, initialLikes, initialShares, handleNewComment };
// }

