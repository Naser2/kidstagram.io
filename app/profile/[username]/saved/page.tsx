"use client"; // Important: Add "use client" directive

import PostsGrid from "@/components/PostsGrid";
import { fetchSavedPostsByUsername } from "@/lib/data";
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SavedPost() {
  const params = useParams<{ username: string }>();
  const [posts, setPosts] = useState<any[] | null>(null);

  useEffect(() => {
    async function loadSavedPosts() {
      try {
        const response = await fetch(`/api/saved-posts/${params.username}`);
        const data = await response.json();
        const fetchedPosts = data.savedPosts?.map((savedPost) => savedPost.post);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching saved posts", error);
      }
    }

    loadSavedPosts();
  }, [params]);

  if (!posts) return <div>Loading...</div>;

  return <PostsGrid posts={posts} />;
}

// function SavedPosts() {
//   const params = useParams<{ username: string }>();
//   const username = params.username;
//   const [posts, setPosts] = useState<any[] | null>(null);

//   useEffect(() => {
//     async function loadSavedPosts() {
//       const savedPosts = await fetchSavedPostsByUsername(username);
//       const fetchedPosts = savedPosts?.map((savedPost) => savedPost.post);
//       setPosts(fetchedPosts);
//     }

//     loadSavedPosts();
//   }, [username]);

//   if (!posts) {
//     return <div>Loading...</div>; // Or a loading indicator component
//   }

//   return <PostsGrid posts={posts} />;
// }

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
