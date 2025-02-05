"use client"; // Important: Add "use client" directive

import PostsGrid from "@/components/PostsGrid";
import { fetchSavedPostsByUsername } from "@/lib/data";
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

async function SavedPosts() {
  const params = useParams<{ username: string }>();
  const username = params.username;
  const [posts, setPosts] = useState<any[] | null>(null);

  useEffect(() => {
    async function loadSavedPosts() {
      const savedPosts = await fetchSavedPostsByUsername(username);
      const fetchedPosts = savedPosts?.map((savedPost) => savedPost.post);
      setPosts(fetchedPosts);
    }

    loadSavedPosts();
  }, [username]);

  if (!posts) {
    return <div>Loading...</div>; // Or a loading indicator component
  }

  return <PostsGrid posts={posts} />;
}

export default SavedPosts;

// import PostsGrid from "@/components/PostsGrid";
// import { fetchSavedPostsByUsername } from "@/lib/data";

// async function SavedPosts({
//   params: { username },
// }: {
//   params: { username: string };
// }) {
//   const savedPosts = await fetchSavedPostsByUsername(username);
//   const posts = savedPosts?.map((savedPost) => savedPost.post);

//   return <PostsGrid posts={posts} />;
// }

// export default SavedPosts;
