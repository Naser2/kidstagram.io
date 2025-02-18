"use client"; // This is CRUCIAL - it must be a Client Component

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { fetchPostsByUserID } from "@/lib/data"; // Import your data fetching function
import PostsGrid from "@/components/PostsGrid"; // Or your component to display posts
import { PostWithExtras } from "@/lib/definitions"; // Import your types
import { PostByIDLoading } from "@/components/post/ui/laodings/PostByIDLoading"; // Import your loading component

const UsernamePostPage = () => {
  const params = useParams<{ userId: string }>();
  const userId = params.userId;
  const [posts, setPosts] = useState<PostWithExtras[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const fetchedPosts = await fetchPostsByUserID(userId);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        // Handle error, e.g., display an error message
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [userId]);

  if (loading) {
    return <PostByIDLoading />; // Or a loading indicator
  }

  if (!posts) {
    return <div>No posts found.</div>; // Or a message indicating no posts
  }

  return (
    <div lang="en" className="dark" suppressHydrationWarning>
      <div className="h-screen flex flex-col">
        <PostsGrid posts={posts} /> {/* Use your component to display posts */}
      </div>
    </div>
  );
};

export default UsernamePostPage;