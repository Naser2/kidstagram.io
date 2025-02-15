"use client"

import LoadingComments from "@/components/LoadingComments";
import PostView from "@/components/PostView";
import { fetchPostById } from "@/lib/data";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
interface PostPageProps {
  params: {
    postId: string;
  };
}

// import ChatInterface from "@/components/ChatInterface";
// import { Id } from "@/convex/_generated/dataModel";
// import { api } from "@/convex/_generated/api";
// import { getConvexClient } from "@/lib/convex";
import { redirect } from "next/navigation";
// import { auth } from "@clerk/nextjs/server";
import { Post } from "@prisma/client";

export default  function PostPage({ params }: PostPageProps) {
  const [post, setPost] = useState<any | null>(null);
  const [postId, setPostId] = useState<any | null>(null);
  console.log("POST_PARAMS_ID_" + postId);
      useEffect(() => {
      
      const getPost = async () => {
        const { postId } =  params;
        setPostId(postId);
        console.log("POST_PARAMS_EFFECT_ID_" + postId);
        const post = await fetchPostById(postId);
        if(!post === null) {
          setPost(post);
       
        }
       else  notFound();
        console.log("POST_ID_" + postId);
      };
      getPost();
      console.log("POST_ID_" + post.id);
    }, [params]);


  // Get user authentication
  // const { postId } = await auth();

  if (!post) {
    return <LoadingComments/>
    // notFound();
    // redirect("/");


  }

  try {
    // Get Convex client and fetch chat and messages
    // const convex = getConvexClient();

    // Check if chat exists & user is authorized to view it
    // const post = fetchPostById(postId);
    // const chat = await convex.query(api.chats.getChat, {
    //   id: chatId,
    //   userId,
    // });

    if (!post) {
      console.log(
        "⚠️ post not found or unauthorized, redirecting to dashboard"
      );
      redirect("/dashboard");
    }

    // Get messages
    // const initialMessages = await convex.query(api.messages.list, { chatId });

    return (
      <div className="flex-1 overflow-hidden">
       {/* <PostView id={postId} post={post} />; */}
      </div>
    );
  } catch (error) {
    console.error("🔥 Error loading chat:", error);
    redirect("/dashboard");
  }
}
// export default  function PostPage({ params }: PostPageProps) {

//   const [post, setPost] = useState<any | null>(null);

//    const { postId } = params;
//   // const { postId } = await params;
//     console.log("POST_PARAMS_ID_" + postId);
//     useEffect(() => {
//       const getPost = async () => {
//         const post = await fetchPostById(postId);
//         if(!post === null) {
//           setPost(post);
       
//         }
//        else  notFound();
//         console.log("POST_ID_" + postId);
//       };
//       getPost();
//       console.log("POST_ID_" + postId);
//     }, [postId]);
//   // const post = await fetchPostById(postId);
//       // const post = null
//   if (!post) {
//   //  return <PostNotFound />;
//       return  <LoadingComments />;
//   }

//   //  Array.isArray(params.id) ? params.id[0] : params.id || ""; // Ensure id is a string

//   return (
//     <div>
//      <PostView id={postId} post={post} />;
//     </div>
//   );
// }

// // async function PostModal({ params: { id } }: Props) {
// //   const post = await fetchPostById(id);

// //   if (!post) {
// //     notFound();
// //   }

// //   return <PostView id={id} post={post} />;
// // }

// // export default PostModal;

// const PostNotFound = () => {
//   return <div className="mx-auto max-w-2xl px-6 text-center py-16">
//     <div className="m-auto mb-3 inline-block text-blue">
//       <svg width="64" height="64"><use href="/_next/static/media/icons.f96adb88.svg#table-xl"></use></svg>
//         </div>
        
//       <h2 className="mb-1 text-pretty text-lg font-semibold text-primary">
//         No posts found</h2>
//         <div className="mb-3 text-pretty text-secondary">
//           fetching this post caused produced an error or was not properly linked to user.
//           </div>
//     </div>
// }