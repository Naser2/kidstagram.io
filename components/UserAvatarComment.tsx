import { AvatarLarge } from "@/components/ui/avatar";
import type { AvatarProps } from "@radix-ui/react-avatar";
import type { User } from "next-auth";
import Image from "next/image";

type Props = Partial<AvatarProps> & {
  user: User | undefined;
};

function UserAvatar({ user, ...avatarProps }: Props) {
// console.log("USER_AVATAR", user)
  const avatarUrl = user?.image
    ? user.image
    : `https://api.dicebear.com/9.x/pixel-art/svg?seed=${encodeURIComponent(user?.name || "User")}`;
  return (<div className="relative flex items-center justify-center">
    <div className="absolute h-17 w-17 rounded-full bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 p-[2px] ">
    <div className="h-full w-full rounded-full bg-black "></div>
  </div>
  
  <AvatarLarge className="relative h-16 w-16 p-[0.1rem]" {...avatarProps}>
      <img
        src={avatarUrl}
       
        sizes="40px"
        alt={`${user?.name}'s profile picture`}
        className="rounded-full object-cover"
      />
    </AvatarLarge></div>
  );
}

export default UserAvatar;
