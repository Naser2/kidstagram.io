
// "use client"

import ProfileAvatar from "@/components/ProfileAvatar";
import ProfileDetails from "@/components/ProfileDetails";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileTabs from "@/components/ProfileTabs";
import { Skeleton } from "@/components/ui/skeleton";
import UserProfileHeaderButtons from "@/components/user/UserProfileHeaderButtonsDesktop";
import UserAvatar from "@/components/UserAvatar";

import { fetchProfile } from "@/lib/data";
import { UserWithExtras } from "@/lib/definitions";
import clsx from "clsx";

// import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import {notFound } from "next/navigation";
import ProfileStatsLinks from "./ProfileStatsLinks";
import { useProfile } from "@/context/ProfileContext";
import { auth } from "@/auth";
// import {  useSelectedLayoutSegment } from "next/navigation";
// import { headers } from "next/headers";
// import { useRouter } from "next/navigation";
// ... other imports

type Props = {
  params: Promise<{userid: string}>,
  children: React.ReactNode;
  isSettingsRoute: boolean
};




async function ProfileHeaderMobile({ profile}: { profile: UserWithExtras }){
    // const { isProfileOwner, loading} = useProfile();
    const session = await auth()

    const isProfileOwner = session?.user?.id === profile.id;
    // console.log(ProfileHeaderMobile

  //   if (loading) {
  //   return <Skeleton />;
  // }
  if (!profile) {
    return  <Skeleton />
  }

  return ( 
    <div className="min-[614px]:!hidden flex-col   sm:mt-4  gap-x-5 md:gap-x-10 px-4">
    <div className="max-[765px]:w-full max-[765px]:!inline-flex max-[765px]:pt-6 max-[765px]::flex-row  smax-[765px]::items-start max-[765px]:gap-5 px-4">
       {/* Profile Avatar - 1/3 Screen */}
        <div className=" flex-shrink-0 w-1/3  flex justify-center">
          <ProfileAvatar user={profile}>
            <UserAvatar
             isProfileOwner={isProfileOwner}
              user={profile}
              className="w-20 h-20 md:w-36 md:h-36 cursor-pointer"
            />
          </ProfileAvatar>
        </div>
        {/* Profile Stats - 2/3 Screen */}
        <div className="flex-grow sm:w-2/3 w-full flex flex-col items-center sm:items-start min-[765px]:hidden">
          <ProfileStatsLinks profile={profile} />
        </div>
      </div>
      <div className="md:px-10 space-y-4">
         <UserProfileHeaderButtons
            profileId={profile.id}
            followedBy={profile.followedBy}
            userId={profile.id || ""} 
        />
      {/* <ProfileHeader username={profile.username} /> */}
        <div className="max-[765px]:hidden">
         <ProfileStatsLinks profile={profile} />
        </div>
        <ProfileDetails
              name={profile.name}
              username={profile.username}
              passion={profile.passion} 
              additionalDetails={profile.additionalDetails} />
        <div className="text-sm primary-text-color !-mt-0">
          <div className="font-bold">{profile.name}</div>
          <p>{profile.bio}</p>
        </div>
      </div>
    </div>

  );
}

export default ProfileHeaderMobile;
