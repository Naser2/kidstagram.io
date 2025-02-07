import { Metadata, ResolvingMetadata } from "next"; // Import necessary types
import PostsGrid from "@/components/PostsGrid";
import { fetchPostsByUsername, fetchProfile } from "@/lib/data";

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

// ✅ Fix `params` in `ProfilePage`
export default async function ProfilePage({
  params,
}: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  console.log("USERNAME_" + username);
  const posts = await fetchPostsByUsername(username);

  return <PostsGrid posts={posts} />;
}

// import { Metadata, ResolvingMetadata } from "next"; // Import necessary types
// import PostsGrid from "@/components/PostsGrid";
// import { fetchPostsByUsername, fetchProfile } from "@/lib/data";

// type Props = {
//   params: Promise<{ username: string }>;
// };

// // **Metadata generation function**
// export async function generateMetadata(
//   { params }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const { username } = await params; // Await params to extract `username`

//   try {
//     const profile = await fetchProfile(username);

//     if (!profile) {
//       return {
//         title: "User not found", // Default title for non-existent users
//       };
//     }

//     return {
//       title: `${profile.name} (@${profile.username})`, // Profile-based title
//     };
//   } catch (error) {
//     console.error("Error in generateMetadata:", error);
//     return {
//       title: "Error loading profile", // Fallback error title
//     };
//   }
// }

// // **Main ProfilePage Component**
// export default async function ProfilePage({ params }: Props) {
//   const { username } = await params; // Await params to extract `username`
//   const posts = await fetchPostsByUsername(username);

//   return <PostsGrid posts={posts} />;
// }


// import PostsGrid from "@/components/PostsGrid";
// import { fetchPostsByUsername } from "@/lib/data";

// export default async function ProfilePage({
//   params,
// }: {
//   params: Promise<{ username: string }>;
// }) {
//   const { username } = await params; // Await the params to extract `username`
//   const posts = await fetchPostsByUsername(username);

//   return <PostsGrid posts={posts} />;
// }

// import PostsGrid from "@/components/PostsGrid";
// import { fetchPostsByUsername } from "@/lib/data";

// async function ProfilePage({
//   params: { username },
// }: {
//   params: { username: string };
// }) {
//   const posts = await fetchPostsByUsername(username);

//   return <PostsGrid posts={posts} />;
// }

// export default ProfilePage;
