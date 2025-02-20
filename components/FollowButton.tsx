import { useState, useTransition } from "react";
import { followUser } from "@/lib/actions";
import SubmitButton from "./SubmitButton";
import { buttonVariants } from "./ui/button";

function FollowButton({ profileId, isFollowing , buttonClassName}: { profileId: string; isFollowing?: boolean , buttonClassName?:string}) {
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

