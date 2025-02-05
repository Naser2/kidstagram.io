import PostView from "@/components/PostView";
import { fetchPostById } from "@/lib/data";
import { notFound } from "next/navigation";

// type Props = {
//   params: {
//     id: string;
//   };
// };


export default async function PostModal({params} :{ params:Promise <{postId: string }>}){
  const { postId } = await params;
  const post = await fetchPostById(postId);

  if (!post) {
    notFound();
  }

  //  Array.isArray(params.id) ? params.id[0] : params.id || ""; // Ensure id is a string

  return (
    <div>
     <PostView id={postId} post={post} />;
    </div>
  );
}

// async function PostModal({ params: { id } }: Props) {
//   const post = await fetchPostById(id);

//   if (!post) {
//     notFound();
//   }

//   return <PostView id={id} post={post} />;
// }

// export default PostModal;
