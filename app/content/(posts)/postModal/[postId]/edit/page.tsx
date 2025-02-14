import { fetchPostById } from "@/lib/data";
import EditPost from "@/components/EditPost";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ postId: string }>; // ✅ Fix `params` type to be a Promise
};

export default async function EditPostPage({ params }: Props) {
  const { postId } = await params; // ✅ Await params before extracting `id`
  console.log(`EditPostPage id: ${postId}`);
  const post = await fetchPostById(postId);
  console.log(`Post:`, post);

  if (!post) {
    notFound();
  }

  return <EditPost id={postId} post={post} />;
}


// import { fetchPostById } from "@/lib/data";
// import EditPost from "@/components/EditPost";
// import { notFound } from "next/navigation";

// type Props = {
//   params: {
//     id: string;
//   };
// };

// async function EditPostPage({ params: { id } }: Props) {
//   const post = await fetchPostById(id);

//   if (!post) {
//     notFound();
//   }

//   return <EditPost id={id} post={post} />;
// }

// export default EditPostPage;
