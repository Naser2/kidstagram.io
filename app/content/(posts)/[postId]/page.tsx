"use client";

import { useSession } from "next-auth/react";
import SinglePost from "@/components/SinglePost";
import { SinglePostSkeleton } from "@/components/Skeletons";
import { fetchPostById } from "@/lib/data";
import { notFound } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { PostWithExtras } from "@/lib/definitions";
import {PostByIDLoading} from "@/components/post/ui/laodings/PostByIDLoading";

;

export default function PostPage({ params }: {params: Promise<{ postId: string }>} ) {
  const { data: session, status } = useSession();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const {postId} = await params; 
     console.log("PostPage_postId", postId);
      const response = await fetch(`/api/post/${postId}`);
       const parsedPost = await response.json();
      if (!parsedPost) notFound();
      setPost(parsedPost);
      setLoading(false);
    }
    fetchData();
  }, [params]); // Dependency: params (since it's a Promise)

  if (status === "loading" || loading) return <PostByIDLoading />;
  if (!session) return <div>No session</div>;
  return (
    <Suspense fallback={<SinglePostSkeleton />}>
      <SinglePost post={post} userSession={session} />
    </Suspense>
  );
}
