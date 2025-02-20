// import { useState, useTransition } from "react";
// import { followUser } from "@/lib/actions";
// import SubmitButton from "@/components/SubmitButton";

// function PostFollowButton({  
//   isFollowing, 
//   sessionUserId, 
//   isCurrentUserPost 
// }: { 
//   isCurrentUserPost: boolean; 
//   sessionUserId: string; 
//   isFollowing?: boolean;
// }) {
//   const [isPending, startTransition] = useTransition();
//   const [localFollowState, setLocalFollowState] = useState(isFollowing);

//   async function handleFollow(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     startTransition(async () => {
//       const formData = new FormData(event.currentTarget);
//       await followUser(formData);
//       setLocalFollowState(true); // Once followed, keep it as followed (no Unfollow)
//     });
//   }

//   // 🔹 Hide the button if the user is viewing their own post
//   if (isCurrentUserPost) return <p className="text-sm text-gray-500">Yours</p>;

//   // 🔹 Hide the button if the user is already following
//   if (localFollowState) return null;

//   return ( 
//     <form onSubmit={handleFollow} className="follow-form">
//       <input type="hidden" name="id" value={sessionUserId} />
//       <SubmitButton 
//         className="follow-text hover:bg-blue-500 hover:text-white transition px-4 py-2 rounded-md"
//         disabled={isPending}
//       >
//         Follow
//       </SubmitButton>
//     </form>
//   );
// }

// export default PostFollowButton;


import { useState, useTransition } from "react";
import { followUser } from "@/lib/actions";
import SubmitButton from "@/components/SubmitButton";
import { buttonVariants } from "@/components//ui/button";
import Link from "next/link";

function PostFollowButton({  isFollowing , buttonClassName, sessionUserId, isCurrentUserPost, postUserId}: {isCurrentUserPost:boolean, postUserId:string, sessionUserId: string; isFollowing?: boolean , buttonClassName?:string}) {
  const [isPending, startTransition] = useTransition();
  const [localFollowState, setLocalFollowState] = useState(isFollowing);

  async function handleFollow(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => {
      const formData = new FormData(event.currentTarget);
      await followUser(formData);
      setLocalFollowState((prev) => !prev); // Toggle UI immediately after server response
    });
  }
  if (isCurrentUserPost) return <p className="text-sm text-gray-500">Yours </p>;


  // 🔹 Hide the button if the user is already following
  if (localFollowState) return <Link href={`/profile/${postUserId}`}><p className="text-sm not-visibble group-hover:visible group-hover:flex follow-text">Following</p></Link>;

  return ( 
    <form onSubmit={handleFollow} className="follow-form">
      <input type="hidden" name="id" value={postUserId} />
      <SubmitButton 
        className={buttonVariants({
          variant: localFollowState ? "primary" : "post_follow_btn",
          size: "sm",
        })}
        disabled={isPending}
      >
        {localFollowState ? "Unfollow" : "Follow"}
      </SubmitButton>
    </form>
  );
}

export default PostFollowButton;

