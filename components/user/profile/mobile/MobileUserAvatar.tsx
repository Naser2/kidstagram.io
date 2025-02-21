"use client"; // Important: This is a client component

import { ProfileAvatarImage } from "./MobileAvatar"
// import { isProfileOwner } from "@/context/isAuthorized"; // No longer needed here
import type { AvatarProps } from "@radix-ui/react-avatar";
import clsx from "clsx";
import { PlusIcon } from "lucide-react";
import type { User } from "next-auth";
import Image from "next/image";
import { usePathname } from "next/navigation"; // Import usePathname

type Props = Partial<AvatarProps> & {
  user: User | undefined;
  isProfileOwner?: boolean;
  avatarSize?: string; // avatarSize is now optional as well. It defaults to "w-9 h-9" if not provided.
}; // isProfileOwner is now optional

function MobileUserAvatar({ user,avatarSize, ...avatarProps }: Props) {
  const pathname = usePathname(); // Get the current path
  const isProfilePage = pathname?.startsWith("/profile"); // Check if on /profile path

  const avatarUrl = user?.image
    ? user.image
    : `https://api.dicebear.com/9.x/pixel-art/svg?seed=${encodeURIComponent(user?.name || "User")}`;

  return (
    <div className="relative flex items-center justify-center">
       <div className="absolute  h-[8.58rem] w-[8.58rem] rounded-full bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 p-[2px] ">
                <div className="h-full w-full rounded-full bg-black "></div>
               </div>
      <ProfileAvatarImage className={clsx(avatarSize ? avatarSize : "h-9 w-9" , "relative  p-[1.1rem]")} {...avatarProps}>
        <img
          src={avatarUrl}
          sizes="30px"
          alt={`${user?.name}'s profile picture`}
          className="rounded-full object-cover"
        />
      </ProfileAvatarImage>
      {isProfilePage && user && ( // Conditionally render the icon
        <PlusIcon className="absolute border-4  border-background bottom-[1rem] z-50 right-[-0.4rem] w-9 h-9 bg-[rgb(var(--ig-primary-button))] text-white rounded-full text-black" />
      )}
    </div>
  );
}

export default MobileUserAvatar;