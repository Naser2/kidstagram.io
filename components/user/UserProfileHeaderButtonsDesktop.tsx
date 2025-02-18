"use client"; // Convert to client component

import { useSession } from "next-auth/react";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import FollowButton from "@/components/FollowButton";
import { Button, buttonVariants } from "@/components/ui/button";
import { MoreHorizontal, Settings } from "lucide-react";
import AddUserIcon from "./profile/ui/icons/AddUserIcon";

interface Session {
  user: {
    id: string;
  };
}
interface FollowedBy {
    followerId: string;
}

interface UserProfileHeaderButtonsProps {
    profileId: string;
    followedBy: FollowedBy[];
    userId: string | null;
}


export default function UserProfileHeaderButtons({  profileId,followedBy,  userId }: UserProfileHeaderButtonsProps) {
    const { data: session } = useSession(); // Instant session access
 
    const isCurrentUser = session?.user.id === profileId;
    const isFollowing = followedBy.some(
      (user) => user.followerId === session?.user.id
    );

       return  (
        <div className="mt-3 lg:mt-0 flex gap-2">
      {/* //  <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-x-[1.75rem] gap-3"> */}
        {/* <p className="font-semibold text-xl">{username}</p> */}
        {isCurrentUser ? (
          <>
            <Link href="/profile/edit-profile"
             className="md:order-last"
            >
              <svg aria-label="Options" className="x1lliihq x1n2onr6 x5n08af ml-2 mt-1" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Options</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
              {/* <Settings /> */}
            </Link>
           
            <Link
              href={`/profile/edit-profile`}
              className={buttonVariants({
                className: "!font-bold primary-text-color  x1gjpkn9",
                variant: "secondary",
                size: "sm",
              })}
            >
              Edit profile
            </Link>
            <Link
              href={`/profile/${userId}/saved`}
              className={buttonVariants({
                className: "!font-bold primary-text-color x1gjpkn9",
                variant: "secondary",
                size: "sm",
              })}
            >
              View archive
            </Link>
          
          </>
        ) : (
          <>
          
            <Button
              size={"icon"}
              variant={"ghost"}
              className="md:order-last"
            >
              <MoreHorizontal />
            </Button>
            <FollowButton
              isFollowing={isFollowing}
              profileId={profileId}
            />
            <Button
              variant={"profile_header_btns"}
              className="font-bold"
              size={"sm"}
            >
              Message
            </Button>
        
          <AddUserIcon />  </>
        )}
      </div>
    );
}