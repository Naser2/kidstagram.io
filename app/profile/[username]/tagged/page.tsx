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

export default function UserReels() {
  const params = useParams<{ username: string }>();
  const [posts, setPosts] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    
    async function loadSavedPosts() {
      setLoading(true); // Show loading indicator while fetching data
      try {
        const response = await fetch(`/api/post/reels/${params.username}`);
        console.log("UserReels_params", params.username);

        const data = await response.json();
        const fetchedPosts: Post[] = data.savedPosts?.map((savedPost: SavedPost) => savedPost.post) || [];    
         console.log("UserReels_response", data);
        setPosts(fetchedPosts);
      
        setLoading(false); // Hide loading indicator
      } catch (error) {
        console.error("Error fetching saved posts", error);
      }
    }

    loadSavedPosts();
  }, [params]); 
   console.log("UserReels_posts", posts);
  if(loading) return <PostsSkeleton />

  if (!posts) return <Skeleton />; // Or a loading indicator component

  return (<PostsGrid posts={posts} />);
}
