import { redirect } from "next/navigation";

import { fetchPostById } from "@/lib/data";
import PostView from "@/components/PostView";

interface PostsLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    postId: string;
  }>;
}

export default async function CourseLayout({
  children,
  params,
}: PostsLayoutProps) {

  const { postId } = await params;

  // if (!user?.id) {
  //   return redirect("/");
  // }

  // const authResult = await checkCourseAccess(user?.id || null, postId);
  // if (!authResult.isAuthorized || !user?.id) {
  //   return redirect(authResult.redirect!);
  // }

  const post = await fetchPostById(postId)

  if (!post) {
    return redirect("/my-courses");
  }

  return (
    <div className="h-full">
     <PostView id={postId} post={post}  />
      <main className="h-full lg:pt-[64px] pl-20 lg:pl-96">{children}</main>
    </div>
  );
}
