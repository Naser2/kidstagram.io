"use client";

import { useSession } from "next-auth/react";

import { fetchPostById } from "@/lib/data";
import { notFound } from "next/navigation";
import { SinglePostSkeleton } from "@/components/Skeletons";
import { Suspense, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import SinglePost from "@/components/SinglePost";
import MorePosts from "@/components/MorePosts";
import { PostByIDLoading } from "@/components/post/ui/laodings/PostByIDLoading";
// import { useParams } from 'next/navigation'; // Import useParams

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
  return (<>
    <Suspense fallback={<SinglePostSkeleton />}>
      <SinglePost post={post} userSession={session} />
    </Suspense>
     <Separator className="my-12 max-w-3xl lg:max-w-4xl mx-auto" />

     <Suspense>
       <MorePosts postId={post.id} />
     </Suspense></>
  );
}





// import { SinglePostSkeleton } from "@/components/Skeletons";
// import { Suspense } from "react";
// import { Separator } from "@/components/ui/separator";
// import SinglePost from "@/components/SinglePost";
// import MorePosts from "@/components/MorePosts";

// type Props = {
//   params: Promise<{ postId: string }>; // ✅ Ensure params is a Promise
// };

// export default async function PostPage({ params }: Props) {
//   const { postId } = await params; // ✅ Await params before extracting `postId`
//   console.log("DASHBOARD/P/_PARAMS_ID_" + postId);


//   return (
//     <div>
//       <Suspense fallback={<SinglePostSkeleton />}>
//         <SinglePost id={postId} />
//       </Suspense>

//       <Separator className="my-12 max-w-3xl lg:max-w-4xl mx-auto" />

//       <Suspense>
//         <MorePosts postId={postId} />
//       </Suspense>
//     </div>
//   );
// }


// import { SinglePostSkeleton } from "@/components/Skeletons";
// import { Suspense } from "react";
// import { Separator } from "@/components/ui/separator";
// import SinglePost from "@/components/SinglePost";
// import MorePosts from "@/components/MorePosts";
// // import { useParams } from 'next/navigation'; // Import useParams

// export default async function PostPage({ params }: { params: { postId: string } }) {
//   const postId = params.postId;
//   //  Array.isArray(params.id) ? params.id[0] : params.id || ""; // Ensure id is a string

//   return (
//     <div>
//       <Suspense fallback={<SinglePostSkeleton />}>
//         <SinglePost id={postId} />
//       </Suspense>

//       <Separator className="my-12 max-w-3xl lg:max-w-4xl mx-auto" />

//       <Suspense>
//         <MorePosts postId={postId} />
//       </Suspense>
//     </div>
//   );
// }

// export default PostPage;

// import { SinglePostSkeleton } from "@/components/Skeletons";
// import { Suspense } from "react";
// import { Separator } from "@/components/ui/separator";
// import SinglePost from "@/components/SinglePost";
// import MorePosts from "@/components/MorePosts";

// function PostPage({ params: { id } }: { params: { id: string } }) {
//   return (
//     <div>
//       <Suspense fallback={<SinglePostSkeleton />}>
//         <SinglePost id={id} />
//       </Suspense>

//       <Separator className="my-12 max-w-3xl lg:max-w-4xl mx-auto" />

//       <Suspense>
//         <MorePosts postId={id} />
//       </Suspense>
//     </div>
//   );
// }

// export default PostPage;
