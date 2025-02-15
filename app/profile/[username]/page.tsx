import { Metadata, ResolvingMetadata } from "next"; // Import necessary types
import PostsGrid from "@/components/PostsGrid";
import { fetchPostsByUsername, fetchProfile } from "@/lib/data";
import { Suspense } from "react";
import { PostsSkeleton } from "@/components/Skeletons";

// ✅ Ensure `params` is treated as a `Promise`
export async function generateMetadata(
  { params }: { params: Promise<{ username: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { username } = await params; // ✅ Await params

  try {
    const profile = await fetchProfile(username);

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
}: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  console.log("USERNAME_" + username);
  const posts = await fetchPostsByUsername(username);

  return   <Suspense fallback={<PostsSkeleton/>}>
             <PostsGrid posts={posts} />
           </Suspense>

}
