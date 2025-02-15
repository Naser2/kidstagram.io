// "use client"

// import getCourseById from "@/sanity/lib/courses/getCourseById";
import { fetchPostById } from "@/lib/data";
import { redirect } from "next/navigation";

interface PostPageProps {
  params: Promise<{
    postId: string;
  }>;
}

export default async function CoursePage({ params }: PostPageProps) {
  console.log("PostPage ID", params);
  const { postId } = await params;
  const course = await fetchPostById(postId);
  console.log("PostPage ID", params);

  const post = await fetchPostById(postId);

  if (!post) {
    console.log("No post  ID", post);
    return redirect("/p");
  }

  // Redirect to the first lesson of the first module if available
  // if (post.comments?.[0]?.users?.[0]?._id) {
  //   return redirect(
  //     `/p/${postId}/settings}`
  //   );
  // }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Welcome to {post.user.name} &apos;s Post</h2>
        <p className="text-muted-foreground">
          This post has no comments yet. Please add a new one to show support.
        </p>
      </div>
    </div>
  );
}

