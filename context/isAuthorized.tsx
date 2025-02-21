import { useSession } from "next-auth/react";

export function isProfileOwner(id?: any) {
  const { data: session } = useSession();
  return { isAuthorized: session?.user?.id === id ||  false };
}

export function isPostOwner(postOwnerId?: string) {
  const { data: session } = useSession();
  return { isAuthorized: session?.user?.id === postOwnerId, userId: session?.user?.id || "" };
}

export function isCommentOwner(commentOwnerId?: string) {
  const { data: session } = useSession();
  return { isAuthorized: session?.user?.id === commentOwnerId, userId: session?.user?.id || "" };
}
