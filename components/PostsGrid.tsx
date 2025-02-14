import { PostWithExtras } from "@/lib/definitions";
import { Post } from "@prisma/client";
import { HeartIcon, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function PostsGrid({ posts }: { posts: Post[] }) {
  if (posts?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-3 max-w-3xl lg:max-w-4xl mx-auto pb-20">
        <p className="font-semibold text-sm text-neutral-400">No more posts in La.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {posts?.map((post) => (
        <Link
          href={`/content/${post.id}`}
          key={post.id}
          className="relative flex items-center justify-center h-[9.2rem]  md:h-[20rem] lg:h-80 group col-span-1"
        >
          <Image
            src={post.fileUrl}
            fill
            alt="Post preview"
            className="object-cover -z-10 transition group-hover:filter group-hover:blur-[2px] group-hover:brightness-90 rounded-sm "
          />
          <div className="opacity-0 group-hover:opacity-100 flex transition items-center justify-center space-x-6">
            {post.likes.length > 0 && (
              <div className="flex items-center font-bold space-x-1">
                <HeartIcon className="text-white fill-white" />
                <p className="text-white">{post.likes.length}</p>
              </div>
            )}

            {post.comments.length > 0 && (
              <div className="flex items-center font-bold space-x-1">
                <MessageCircle className="text-white fill-white" />
                <p className="text-white">{post.comments.length}</p>
              </div>
            )}
          </div>
          {/* {pahname ==/profile/username && post.isPinned && <svg aria-label="Pinned post icon" class="x1lliihq x1n2onr6 x9bdzbf" fill="currentColor" height="20" role="img" viewBox="0 0 24 24" width="20"><title>Pinned post icon</title><path d="m22.707 7.583-6.29-6.29a1 1 0 0 0-1.414 0 5.183 5.183 0 0 0-1.543 3.593L8.172 8.79a5.161 5.161 0 0 0-4.768 1.42 1 1 0 0 0 0 1.414l3.779 3.778-5.89 5.89a1 1 0 1 0 1.414 1.414l5.89-5.89 3.778 3.779a1 1 0 0 0 1.414 0 5.174 5.174 0 0 0 1.42-4.769l3.905-5.287a5.183 5.183 0 0 0 3.593-1.543 1 1 0 0 0 0-1.414Z"></path></svg>} */}
        </Link>
      ))}
    </div>
  );
}

export default PostsGrid;
