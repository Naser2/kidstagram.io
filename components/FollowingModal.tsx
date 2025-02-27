"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useMount from "@/hooks/useMount";
import { FollowingWithExtras } from "@/lib/definitions";
import { usePathname, useRouter } from "next/navigation";
import Following from "./Following";
import UserAvatar from "./UserAvatar";
import { ScrollArea } from "./ui/scroll-area";

function FollowingModal({
  following,
  userid,
}: {
  following: FollowingWithExtras[] | undefined;
  userid: string;
}) {

  const pathname = usePathname();
  const router = useRouter();
  // const isFollowingPage = pathname === `/${username}/following`;
  const isFollowingPage = true



  return (
    <Dialog
      open={isFollowingPage}
      onOpenChange={(isOpen) => !isOpen && router.back()}
    >
      <DialogContent className="dialogContent p-6 max-w-[26rem]">
      <DialogTitle className="hidden">Following Modal</DialogTitle>
        <DialogHeader className="border-b border-zinc-300 dark:border-neutral-700 py-2 w-full ">
          <DialogTitle className="mx-auto font-bold text-[rgb(var(--ig-primary-text))] p-2">
            Following
          </DialogTitle>
        </DialogHeader>

        {following?.length === 0 && <p className="text-center text-[rgb(var(--ig-primary-text))]">Not following any profile.</p>}

        <ScrollArea className="min-h-fit max-h-[350px] p-4">
          {following?.map((following) => (
            <Following key={following.followingId} following={following} />
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default FollowingModal;
