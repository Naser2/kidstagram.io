import { fetchPosts } from "@/lib/data";
import Post from "./Post";
import Error from "./Error";
import { PostWithExtras } from "@/lib/definitions";
import { ScrollArea } from "@radix-ui/react-scroll-area";



async function Posts({ userSession }: { userSession: any }) {
  if (!userSession?.user) {
    return <div className="justify-center min-h-screen py-[40vh] text-center text-xl">No posts found.</div>;
  }

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
    <div className="h-[calc(100vh-80px)] overflow-y-auto">
      <ScrollArea>
        {posts.map((post: PostWithExtras) => (
              <Post key={post.id}
                    postUserId={post.user.id} 
                    post={post}
                    userSession={userSession}
                    postUsername={post.user?.username ?? ''} />
            ))}
      </ScrollArea>
    </div>
  );
}


export default Posts;
