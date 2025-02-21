"use client"
import clsx from "clsx";
import { AvatarLarge } from "./avatar";
import type { AvatarProps } from "@radix-ui/react-avatar";
import { PlusIcon } from "lucide-react";
import type { User } from "next-auth";
import Image from "next/image";
import { usePathname } from "next/navigation";

type Props = Partial<AvatarProps> & {
  user: User | undefined;
  isProfileOwner?: boolean;
  avatarSize?: string;
  viewPort?: string;
  recentlyUploaded?: string;
};

function UserAvatarLarge({ user, recentlyUploaded, isProfileOwner, avatarSize, viewPort,  ...avatarProps }: Props) {
  console.log("UserAvatarLarge", user)
  const pathname = usePathname();
  // console.log("USER_AVATAR_isProfileOwner", isProfileOwner)
// console.log("USER_AVATAR", user)
const isSettingPath = pathname.includes("/profile/edit-profile")
  const avatarUrl = recentlyUploaded ? recentlyUploaded : user?.image
    ? user.image
    : `https://api.dicebear.com/9.x/pixel-art/svg?seed=${encodeURIComponent(user?.name || "User")}`;
  return (<div className="relative flex items-center justify-center">
              { !isSettingPath &&  <div className={clsx(viewPort === "sm-md" ?  "h-[7rem] w-[7rem] sm:h-44 sm:w-44" : "h-44 w-44" , "absolute  rounded-full bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 p-[2px] ")}>
                <div className="h-full w-full rounded-full bg-black "></div>
               </div>}
                <AvatarLarge className={clsx(avatarSize ?  avatarSize : "relative p-[1.1rem]")} {...avatarProps}>
                  <img src={avatarUrl}
                      sizes="100px"
                      alt={`${user?.name}'s profile picture`}
                      className={clsx(avatarSize ?  avatarSize : "rounded-full object-cover")}
                     
                    />
                  </AvatarLarge> 
                  {isProfileOwner &&
                   <PlusIcon className="absolute border-4  border-background bottom-[0rem] z-50 right-[-0.4rem] w-9 h-9 bg-[rgb(var(--ig-primary-button))] text-white rounded-full text-black" />
                   }
            </div>
          
  );
}

export default UserAvatarLarge;
