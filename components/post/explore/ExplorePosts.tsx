import React from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { PostWithExtras } from "@/lib/definitions";
import { fetchPosts } from "@/lib/data";
import ExploreCard from "./ExploreCard";



async function ExplorePosts(){


  const posts: PostWithExtras[] = await fetchPosts();
  const error = null; // Handle error appropriately if fetchPosts can throw

  console.log("Posts: FETCHED_POSTS", posts);

  if (error) {
    return <h1>{error }</h1>
  }

  if (!posts || posts.length === 0) {
    return <div className="justify-center min-h-screen py-[40vh] text-center text-xl">No posts found.</div>;
  }

  return (
    <ScrollArea>
            <div className="grid grid-cols-2 gap-x-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-4 md:gap-8  p-4">
    {posts.map((post: PostWithExtras) => (
          <ExploreCard key={post.id}
                    post={post}
                 />
        ))}
        </div>
  </ScrollArea>

   
  );
};

export default ExplorePosts;
