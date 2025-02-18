import { Metadata, ResolvingMetadata } from "next"; // Import necessary types
import PostsGrid from "@/components/PostsGrid";
import { fetchPostsByUserID, fetchPostsByUsername, fetchProfile, fetchProfileByID } from "@/lib/data";
import { Suspense } from "react";
import { PostsSkeleton } from "@/components/Skeletons";

// ✅ Ensure `params` is treated as a `Promise`
export async function generateMetadata(
  { params }: { params: Promise<{ userId: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { userId } = await params; // ✅ Await params

  try {
    const profile = await fetchProfileByID(userId);

    if (!profile) {
      return { title: "User not found" };
    }

    return { title: `${profile.name} (@${profile.username})` };
  } catch (error) {
    console.error("Error in generateMetadata:", error);
    return { title: "Error loading profile" };
  }
}


export default async function ProfilePage({
  params,
}: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  // console.log("USERNAME_userId" + userId);
  const posts = await fetchPostsByUserID(userId);

  return   <Suspense fallback={<PostsSkeleton/>}>
             <PostsGrid posts={posts} />
           </Suspense>

}
