
"use client";

import { cn } from "@/lib/utils";
import ActionIcon from "@/components/ActionIcon";
import { Bookmark } from "lucide-react";
import { useState } from "react";

type Props = {
  post: { id: string; savedBy: { userId: string }[] };
  userId?: string;
  handleBookmark: (postId: string) => Promise<{ message: string }>;
};

function BookmarkButton({ post, userId, handleBookmark }: Props) {
  const [message, setMessage] = useState<string>(
    post.savedBy.some((bookmark) => bookmark.userId === userId)
      ? "Bookmarked Post."
      : "Unbookmarked Post."
  );

  return (
    <form
      action={async (formData: FormData) => {
        const postId = formData.get("postId") as string;

        // 🔹 Optimistic update: Assume the action will succeed
        setMessage((prev) =>
          prev === "Bookmarked Post." ? "Unbookmarked Post." : "Bookmarked Post."
        );

        // 🔹 Send request to API
        const response = await handleBookmark(postId);
        console.log("bookmark_API_response_MESSAGE:", response.message);

        // 🔹 Ensure UI reflects API response (correcting if needed)
        setMessage(response.message);
      }}
      className="ml-auto"
    >
      <input type="hidden" name="postId" value={post.id} />

      <ActionIcon>
       <svg
          className={cn("h-6 w-6", {
            "text-white fill-none": message === "Unbookmarked Post.", // Empty with white outline
            "text-white fill-white": message === "Bookmarked Post.", // Fully white when saved
          })}
          aria-label="Save"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <title>Save</title>
          <polygon
            points="20 21 12 13.44 4 21 4 3 20 3 20 21"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          ></polygon>
        </svg>
      </ActionIcon>
    </form>
  );
}

export default BookmarkButton;
