"use client";

import { SinglePostSkeleton } from "@/components/Skeletons";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import SinglePost from "@/components/SinglePost";
import MorePosts from "@/components/MorePosts";
import { useParams } from 'next/navigation'; // Import useParams

function PostPage() {
  const params = useParams(); // Access params using useParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id || ""; // Ensure id is a string

  return (
    <div>
      <Suspense fallback={<SinglePostSkeleton />}>
        <SinglePost id={id} />
      </Suspense>

      <Separator className="my-12 max-w-3xl lg:max-w-4xl mx-auto" />

      <Suspense>
        <MorePosts postId={id} />
      </Suspense>
    </div>
  );
}

export default PostPage;

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
