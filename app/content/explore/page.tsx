import React, { Suspense } from "react";
import Image from "next/image";
import { PostsSkeleton } from "@/components/Skeletons";
import ExplorePosts from "@/components/post/explore/ExplorePosts";

const posts = [
  // Example data structure; replace with actual data
  {
    id: 1,
    username: "kidstagrammm",
    verified: true,
    imageUrl: "/images/post1.jpg",
    caption: "most unorthodox moshpit ever",
  },
  {
    id: 2,
    username: "sjaxphotography",
    verified: false,
    imageUrl: "/images/post2.jpg",
    caption: "My Jax Kids are working",
  },
  // Add more posts dynamically
];

interface Post {
  id: number;
  username: string;
  verified: boolean;
  imageUrl: string;
  caption: string;
}


const ExplorePage = () => {


  return (
    <Suspense fallback={<PostsSkeleton />}>
              <ExplorePosts />
     </Suspense>
   
  );
};

export default ExplorePage;
