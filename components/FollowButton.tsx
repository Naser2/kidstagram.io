import { useState, useTransition } from "react";
import { followUser } from "@/lib/actions";
import SubmitButton from "./SubmitButton";
import { buttonVariants } from "./ui/button";

function FollowButton({ profileId, isFollowing }: { profileId: string; isFollowing?: boolean }) {
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

  return (
    <form onSubmit={handleFollow} className="follow-form">
      <input type="hidden" name="id" value={profileId} />
      <SubmitButton
        className={buttonVariants({
          variant: localFollowState ? "primary" : "profile_header_btns",
          size: "sm",
        })}
        disabled={isPending}
      >
        {localFollowState ? "Unfollow" : "Follow"}
      </SubmitButton>
    </form>
  );
}

export default FollowButton;



// import { followUser } from "@/lib/actions";
// import SubmitButton from "./SubmitButton";
// import { buttonVariants } from "./ui/button";
// import { cn } from "@/lib/utils";
// import { Suspense } from "react";


// function FollowButton({
//   profileId,
//   isFollowing,
//   className,
//   buttonClassName,
// }: {
//   profileId: string;
//   isFollowing?: boolean;
//   className?: string;
//   buttonClassName?: string;
// }) {
//   return (
//     <Suspense fallback={<p className="text-sm">Loading...</p>}>
//       <form action={(formData) => followUser(formData)} className={className}>
//         <input type="hidden" value={profileId} name="id" />
//         <SubmitButton
//           className={buttonVariants({
//             variant: isFollowing ? "primary" : "secondary",
//             className: cn("!font-bold w-full", buttonClassName),
//             size: "sm",
//           })}
//         >
//           {isFollowing ? "Unfollow" : "Follow"}
//         </SubmitButton>
//       </form>
//     </Suspense>
//   );
// }

// export default FollowButton;


// function FollowButton({
//   profileId,
//   isFollowing,
//   className,
//   buttonClassName,
// }: {
//   profileId: string;
//   isFollowing?: boolean;
//   className?: string;
//   buttonClassName?: string;
// }) {
//   return (
//     <form action={followUser} className={className}>
//       <input type="hidden" value={profileId} name="id" />
//       <SubmitButton
//         className={buttonVariants({
//           variant: isFollowing ? "secondary" : "default",
//           className: cn("!font-bold w-full", buttonClassName),
//           size: "sm",
//         })}
//       >
//         {isFollowing ? "Unfollow" : "Follow"}
//       </SubmitButton>
//     </form>
//   );
// }

// export default FollowButton;

// 