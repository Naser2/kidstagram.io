import { redirect } from "next/navigation";
import { getUserId } from "@/lib/utils";
import { fetchPostById } from "@/lib/data";
import PostView from "@/components/PostView";

interface SinglePostLayout {
  children: React.ReactNode;
  params: Promise<{
    postId: string;
  }>;
}

export default async function SinglePostLayout({
  children,
  params,
}: SinglePostLayout) {
  console.log("POST_ID_LAYOUT_params", params);
  const userId = await getUserId();
  const { postId } = await params;
  console.log("POST_ID_LAYOUT_" + postId);

  if (userId) {
    return redirect("/");
  }

  // const authResult = await checkCourseAccess(userId || null, courseId);
  // if (!authResult.isAuthorized || !user?.id) {
  //   return redirect(authResult.redirect!);
  // }

const post = await fetchPostById(postId);
console.log("POST_ID_LAYOUT_" + post);

  if (!post) {
    return redirect("/my-courses");
  }

  return (
    <div className="h-full">
      <PostView post={post} alreadSeen={post.wiewers.find(userId)} />
      <main className="h-full lg:pt-[64px] pl-20 lg:pl-96">{children}</main>
    </div>
  );
}
