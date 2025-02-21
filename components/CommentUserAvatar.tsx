import { Avatar } from "@/components/ui/avatar";
import { isProfileOwner } from "@/context/isAuthorized";
import type { AvatarProps } from "@radix-ui/react-avatar";
import { PlusIcon } from "lucide-react";
import type { User } from "next-auth";
import Image from "next/image";
import UserAvatarSmall from "./user/profile/ui/UserAvatarSmall";

type Props = Partial<AvatarProps> & {
  user?: User | undefined;
};

function CommentUserAvatar({ user, ...avatarProps }: Props) {
// console.log("USER_AVATAR", user)
  const avatarUrl = user?.image
    ? user.image
    : `https://api.dicebear.com/9.x/pixel-art/svg?seed=${encodeURIComponent(user?.name || "User")}`;
  return (<div className="relative flex items-center justify-center">
    {/* <div className="absolute h-24 w-24 rounded-full bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 p-[2px] ">
    <div className="h-full w-full rounded-full bg-black "></div>
  </div>
   */}
  <div className="absolute  h-[3rem] w-[3rem] rounded-full bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 p-[2px] ">
                <div className="h-full w-full rounded-full bg-black "></div>
               </div>
           <UserAvatarSmall
              user={user}
              className="rounded-full cursor-pointer"
            />
    
    </div>
  );
}

export default CommentUserAvatar;
