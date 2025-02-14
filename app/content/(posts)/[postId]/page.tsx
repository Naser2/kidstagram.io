import { auth } from "@/auth";
import SinglePost from "@/components/SinglePost";
import { SinglePostSkeleton } from "@/components/Skeletons";

import { fetchPostById, fetchProfile } from "@/lib/data";

// import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import {notFound } from "next/navigation";
import { Suspense } from "react";
// import { PostContext } from "@/context/PostContext"; // Import context
type Props = {
  params: { post: string };
  children: React.ReactNode;
};


async function PostPage({children, params} :{children: React.ReactNode, params: Promise<{postId: string}>}){
  const {postId} = await params

  // Read `isSettingsRoute` from parent DOM attribute
  // const isSettingsRoute =
  //   typeof window !== "undefined"
  //     ? JSON.parse(
  //         document.querySelector("div[data-is-settings-route]")?.getAttribute("data-is-settings-route") || "{}"
  //       ).isSettingsRoute
  //     : false;

  console.log("PostPage_POST_ID", postId);
  // const profile = {}
  const post = await fetchPostById(postId); 
  console.log("PostPage_POST", post)
  // Fetch profile data (only once)
  console.log("ProfileLayout_Profile", post)
  const session = await auth();
  console.log("PostPage_SESSION", session)
  if (!session){
   throw new Error("User has no Session")
  }
 
  if (!post) {
    // confirm('Profile not found');
    notFound();
  }
 const postUsername = post?.user?.username;
  return (  <Suspense fallback={<SinglePostSkeleton />}>
              <SinglePost post={post} userSession={session} />
            </Suspense>
  );
}

export default PostPage;

