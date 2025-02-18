

"use client";

import { useSession } from "next-auth/react";
import SinglePost from "@/components/SinglePost";
import { SinglePostSkeleton } from "@/components/Skeletons";
import { fetchPostById } from "@/lib/data";
import { notFound } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { PostWithExtras } from "@/lib/definitions";
import {PostByIDLoading} from "@/components/post/ui/laodings/PostByIDLoading";
import { Separator } from "@radix-ui/react-dropdown-menu";
// import MorePosts from "@/components/MorePosts";

;

export default function PostModalPage({ params }: {params: Promise<{ postId: string }>} ) {
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
    <div>
     <Suspense fallback={<SinglePostSkeleton />}>
      <SinglePost post={post} userSession={session} />
    </Suspense>
      <Separator className="my-8 sm:my-12 max-w-3xl lg:max-w-4xl mx-auto" />

       {/*<Suspense>
        <MorePosts postId={post.id} />
      </Suspense> */}
    </div>
  );
}

