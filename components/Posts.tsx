import { fetchPosts } from "@/lib/data";
import Post from "./Post";
import Error from "./Error";
import { PostWithExtras } from "@/lib/definitions";

async function Posts({userSession}:{userSession:any}) {

  const { posts, error } = await fetchPosts();  
  console.log("Posts: FETCHED_POSTS", posts);

  if (error) {
    return <Error res={{ message: error }} />;
  }

  if (!posts || posts.length === 0) {
    return <div className="justify-center min-h-screen py-[40vh] text-center text-xl">No posts found.</div>; 
  }

  return (
    <div className="relative">
      {posts.map((post: PostWithExtras) => (
        <Post key={post.id}
         postUserId={post.user.id} 
         post={post}
         userSession={userSession}
         postUsername={post.user?.username ?? ''} />
      ))}
    </div>
  );
}

export default Posts;
