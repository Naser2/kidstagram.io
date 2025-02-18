import { Avatar } from "./avatar";
import type { AvatarProps } from "@radix-ui/react-avatar";
import { PlusIcon } from "lucide-react";
import type { User } from "next-auth";
import Image from "next/image";

type Props = Partial<AvatarProps> & {
  user: User | undefined;
  isProfileOwner?: boolean;
};

function UserAvatarLarge({ user, isProfileOwner, ...avatarProps }: Props) {
  // console.log("USER_AVATAR_isProfileOwner", isProfileOwner)
// console.log("USER_AVATAR", user)
  const avatarUrl = user?.image
    ? user.image
    : `https://api.dicebear.com/9.x/pixel-art/svg?seed=${encodeURIComponent(user?.name || "User")}`;
      return (<div className="relative flex items-center justify-center">
                <div className="absolute  h-44 w-44 rounded-full bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 p-[2px] ">
                <div className="h-full w-full rounded-full bg-black "></div>
               </div>
                <Avatar className="relative p-[1.1rem]" {...avatarProps}>
                  <img src={avatarUrl}
                      sizes="90px"
                      alt={`${user?.name}'s profile picture`}
                      className="rounded-full object-cover"
                    />
                  </Avatar> 
                  {isProfileOwner &&
                   <PlusIcon className="absolute border-4  border-background bottom-[0rem] z-50 right-[-0.4rem] w-9 h-9 bg-[rgb(var(--ig-primary-button))] text-white rounded-full text-black" />
                   }
            </div>
          
  );
}

export default UserAvatarLarge;
