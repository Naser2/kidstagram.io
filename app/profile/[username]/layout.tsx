


import { auth } from "@/auth";

import ProfileAvatar from "@/components/ProfileAvatar";
import ProfileDetails from "@/components/ProfileDetails";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileTabs from "@/components/ProfileTabs";
import ProfileHeaderDesktop from "@/components/user/profile/ProfileHeaderDesktop";
import ProfileHeaderMobile from "@/components/user/profile/ProfileHeaderMobile";
import UserProfileHeaderButtons from "@/components/user/UserProfileHeaderButtonsDesktop";
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




async function ProfileLayout({children, params}:{children: React.ReactNode, params: Promise<{username: string}>, isSettingsRoute: boolean}){
  const {username} = await params
  const profile = await fetchProfile(username); 
  if (!profile) {
    notFound();
  }
  return (<div className={clsx("!max-w-[99.9vw] mx-auto  w-full overflow-x-hidden porfile_content_wrap")}>
          {/* <ProfileHeader username={profile.username} /> */}
          <div className="max-w-4xl mx-auto">
           
          
            <ProfileHeaderMobile profile={profile} />
            <ProfileHeaderDesktop profile={profile} />
            <ProfileTabs profile={profile}/>
            {children}
       </div>
     </div>
  );
}

export default ProfileLayout;
