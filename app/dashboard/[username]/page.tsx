import PostsGrid from "@/components/PostsGrid";
import { fetchPostsByUsername } from "@/lib/data";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params; // Await the params to extract `username`
  const posts = await fetchPostsByUsername(username);

  return <PostsGrid posts={posts} />;
}

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
