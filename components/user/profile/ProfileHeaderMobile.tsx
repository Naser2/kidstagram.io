
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
      <div className="md:px-10 space-y-3 mx-4 my-4 ">
        
      {/* <ProfileHeader username={profile.username} /> */}
        {/* <div className="max-[765px]:hidden">
         <ProfileStatsLinks profile={profile} />
        </div> */}
        <ProfileDetails
              name={profile.name}
              username={profile.username}
              passion={profile.passion} 
              additionalDetails={profile.additionalDetails} />
        <div className="text-sm primary-text-color pb-3">
          <div className="font-semibold text-[rgb(var(--ig-primary-button))]">{profile?.location ?? "New York, New York"}</div>
          <p className="truncate py-1 pb-2">{profile.bio}</p>
          <div className="flex items-center space-x-2 px-[7px] label label_tag rounded-full">
        <div className="py-1 flex ">
          <svg aria-label="Threads" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="16" role="img" viewBox="0 0 192 192" width="16"><title>Threads</title><path className="xcslo1z" d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z">
            </path>
          </svg>
          <span className="px-2">
           {profile.username} 
           </span> 
         </div>
      </div>
        </div>
       { isProfileOwner && <div className="relative bg-background_2 flex-block items-center justify-center whitespace-nowrap rounded-md text-sm font-medium 
                        ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
                        focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                        dark:text-[rgb(var(--ig-primary-text))] max-[600px]:w-[39rem] 
                        max-w-[87vw] h-20 rounded-md px-3 !font-bold primary-text-color  
                        py-5 px-4">
                  <h2> Proffesionall Dashboard</h2>    
          <p className="text-sm primary-text-color font-normal dark:text-white/50 pb-2 py-2">
            New tools available</p>
            <Link href={`/profile/${profile.id}/dashboard`}  className="absolute w-full h-full inset-0"></Link>
        </div>}
      
        <UserProfileHeaderButtons
            profileId={profile.id}
            followedBy={profile.followedBy}
            userId={profile.id || ""} 
        />
          {/* <div className="bg-background flex-block items-center justify-center whitespace-nowrap rounded-md text-sm font-medium 
                        ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
                        focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                        dark:text-[rgb(var(--ig-primary-text))] max-[600px]:w-[39rem] 
                        max-w-[87vw] h-24 rounded-md px-3 !font-bold primary-text-color  
                        py-6">
                  <h2> Highlights </h2>    
          
        </div> */}
      </div>
    </div>

  );
}

export default ProfileHeaderMobile;
