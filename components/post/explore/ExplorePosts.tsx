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
      <HashtagHeader /> 
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
export function HashtagHeader() {
  return (
    <div className="flex items-center space-x-3 p-4 md:p-6">
      <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
        {/* Hashtag SVG */}
        <svg
          width="60"
          height="60"
          viewBox="0 0 48 48"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 md:w-14 md:h-14 text-black dark:text-white"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.41 17L18.9739 7.47047C18.9895 7.20626 19.2083 7 19.473 7H20.4682C20.7558 7 20.9841 7.24206 20.9673 7.52919L20.4135 17H28.41L28.9739 7.47047C28.9895 7.20626 29.2083 7 29.473 7H30.4682C30.7558 7 30.9841 7.24206 30.9673 7.52919L30.4135 17H38.5C38.7761 17 39 17.2239 39 17.5V18.5C39 18.7761 38.7761 19 38.5 19H30.2958L29.7664 28H37.5C37.7761 28 38 28.2239 38 28.5V29.5C38 29.7761 37.7761 30 37.5 30H29.6488L29.0276 40.5596C29.0114 40.8353 28.7748 41.0456 28.4991 41.0294L27.5009 40.9706C27.2252 40.9544 27.0149 40.7178 27.0311 40.4422L27.6453 30H19.6488L19.0276 40.5596C19.0114 40.8353 18.7748 41.0456 18.4991 41.0294L17.5009 40.9706C17.2252 40.9544 17.0149 40.7178 17.0311 40.4422L17.6453 30H9.5C9.22386 30 9 29.7761 9 29.5V28.5C9 28.2239 9.22386 28 9.5 28H17.763L18.2924 19H10.5C10.2239 19 10 18.7761 10 18.5V17.5C10 17.2239 10.2239 17 10.5 17H18.41ZM20.2958 19L19.7664 28H27.763L28.2924 19H20.2958Z"
          />
        </svg>
      </div>
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white">#Explore</h2>
        <p className="text-gray-500 text-sm md:text-base">4554 posts</p>
      </div>
    </div>
  );
}
