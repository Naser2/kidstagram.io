"use client"; // Important: Add "use client" directive

import PostsGrid from "@/components/PostsGrid";
import { PostsSkeleton } from "@/components/Skeletons";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchSavedPostsByUsername } from "@/lib/data";
import { Post } from "@prisma/client";
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

type SavedPost = {
  post: Post;
  
};

export default function SavedPost() {
  const params = useParams<{ userId: string }>();
  const [posts, setPosts] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    
    async function loadSavedPosts() {
      setLoading(true); // Show loading indicator while fetching data
      try {
        const response = await fetch(`/api/saved-posts/${params.userId}`);
        const data = await response.json();
        const fetchedPosts: Post[] = data.savedPosts?.map((savedPost: SavedPost) => savedPost.post) || [];
        setPosts(fetchedPosts);
        setLoading(false); // Hide loading indicator
      } catch (error) {
        console.error("Error fetching saved posts", error);
      }
    }

    loadSavedPosts();
  }, [params]);
  if(loading) return <PostsSkeleton />

  if (!posts) return <Skeleton />; // Or a loading indicator component

  return <PostsGrid posts={posts} />;
}
