import { auth } from "@/auth";

import ProfileAvatar from "@/components/ProfileAvatar";
import ProfileDetails from "@/components/ProfileDetails";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileTabs from "@/components/ProfileTabs";
import UserProfileHeaderButtons from "@/components/user/UserProfileHeaderButtons";
import UserAvatar from "@/components/UserAvatar";

import { fetchProfile } from "@/lib/data";
import clsx from "clsx";

// import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import {notFound } from "next/navigation";
// import {  useSelectedLayoutSegment } from "next/navigation";
// import { headers } from "next/headers";
// import { useRouter } from "next/navigation";
// ... other imports

type Props = {
  params: Promise<{username: string}>,
  children: React.ReactNode;
  isSettingsRoute: boolean
};

function ProfileStatsLinks({ profile }: { profile: any }) {
  return (
    <div className="flex items-center gap-x-7">
      <Link href={`/profile/${profile.username}/posts`} className="font-medium primary-text-color">
        <strong>{profile.posts.length}</strong> posts
      </Link>

      <Link href={`/profile/${profile.username}/followers`} className="font-medium primary-text-color">
        <strong>{profile.followedBy.length}</strong> followers
      </Link>

      <Link href={`/profile/${profile.username}/following`} className="font-medium primary-text-color">
        <strong>{profile.following.length}</strong> following
      </Link>
    </div>
  );
}




async function ProfileLayout({children, params}:{children: React.ReactNode, params: Promise<{username: string}>, isSettingsRoute: boolean}){
  const {username} = await params
  const profile = await fetchProfile(username); 
  if (!profile) {
    notFound();
  }
  return (<div className={clsx("!max-w-[99vw] mx-auto px-4 w-full overflow-x-hidden porfile_content_wrap")}>
          {/* <ProfileHeader username={profile.username} /> */}
          <div className="max-w-4xl mx-auto">
            <div className="flex-col  sm:!inline-flex sm:mt-4  gap-x-5 md:gap-x-10 px-4">
            <div className="max-[765px]:w-full max-[765px]:!inline-flex max-[765px]:pt-6 max-[765px]::flex-row  smax-[765px]::items-start max-[765px]:gap-5 px-4">
               {/* Profile Avatar - 1/3 Screen */}
                <div className=" flex-shrink-0 w-1/3  flex justify-center">
                  <ProfileAvatar user={profile}>
                    <UserAvatar
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
                    username={profile.username || ""} 
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
            <ProfileTabs profile={profile}/>
            {children}
       </div>
     </div>
  );
}

export default ProfileLayout;
