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
    return <div>No posts found.</div>; 
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
