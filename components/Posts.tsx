import { fetchPosts } from "@/lib/data";
import Post from "./Post";
import Error from "./Error";
import { PostWithExtras } from "@/lib/definitions";

async function Posts() {

  const { posts, error } = await fetchPosts();  

  if (error) {
    return <Error res={{ message: error }} />;
  }

  if (!posts || posts.length === 0) {
    return <div className="justify-center min-h-screen py-[40vh] text-center text-xl">No posts found.</div>; 
  }

  return (
    <>
      {posts.map((post: PostWithExtras) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}

export default Posts;
