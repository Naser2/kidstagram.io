"use client";

import { cn } from "@/lib/utils";
import type { User } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";
import UserAvatar from "./UserAvatar";
import CommentUserAvatar from "./CommentUserAvatar";

function ProfileLink({ user }: { user: User }) {
  const pathname = usePathname();

  const href = `/profile/${user.id}`;
  // console.log("ProfileLink", user);
  // console.log("ProfileLink", user.id);
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: isActive ? "secondary" : "ghost",
        className: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:!bg-secondary/80 h-10 px-4 py-2 navLink space-x-4 primary-text-color",
        size: "lg",
      })}
    >
     <img src={ user.image ? user.image
    : `https://api.dicebear.com/9.x/pixel-art/svg?seed=${encodeURIComponent(user?.name || "User")}`} 
      className="h-6 w-6 rounded-full shrink-0 " />
      {/* <CommentUserAvatar
        user={user}
        className={`h-6 w-6 ${isActive && "border-2 border-white"}`}
      /> */}

      <p
        className={`${cn("hidden lg:block", {
          "navLink space-x-0 primary-text-color font-bold": isActive,
        })}`}
      >
        Profile
      </p>
    </Link>
  );
}

export default ProfileLink;
