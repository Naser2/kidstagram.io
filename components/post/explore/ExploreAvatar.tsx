import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Ensure this points to the right file
import type { AvatarProps } from "@radix-ui/react-avatar";
import type { User } from "next-auth";

type Props = Partial<AvatarProps> & {
  user: User | undefined;
};

function ExploreAvatar({ user, ...avatarProps }: Props) {
  const avatarUrl = user?.image
    ? user.image
    : `https://api.dicebear.com/9.x/pixel-art/svg?seed=${encodeURIComponent(user?.name || "User")}`;

  return (
    <div className="relative flex items-center justify-center">
      <Avatar className="h-6 w-6" {...avatarProps}>
        <AvatarImage src={avatarUrl} alt={`${user?.name}'s profile picture`} />
        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
    </div>
  );
}

export default ExploreAvatar;
