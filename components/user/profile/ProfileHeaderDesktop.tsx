

import VerifiedIcon from "@/components/VerifiedIcon";
import ProfileStatsLinks from "./ProfileStatsLinks";
import ProfileAvatar from "./ui/ProfileAvatarLarge";
import UserAvatar from "./ui/UserAvatarLarge";
import { UserWithExtras } from "@/lib/definitions";
import UserProfileHeaderButtonsDesktop from "../UserProfileHeaderButtonsDesktop";
import { useProfile } from "@/context/ProfileContext";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/auth";
import { SuggestedAccounts } from "./SuggestedAccounts";
import UserAvatarLarge from "./ui/UserAvatarLarge";

export default async function ProfileHeaderDesktop({profile}:{profile:UserWithExtras}) {
if (!profile) {
  return  <Skeleton />
}
const session = await auth()
const isProfileOwner = session?.user?.id === profile.id;

    // const session = await auth()


    return (
      <div className="max-[614px]:!hidden max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 p-4">
        {/* Left Section - Profile Image */}
        <div className="lg:w-1/4 w-full flex justify-center">
        {/* <div className=" flex-shrink-0 w-1/3  flex justify-center"> */}
          <ProfileAvatar user={profile} isProfileOwner={isProfileOwner}>
            <UserAvatarLarge   
               isProfileOwner={isProfileOwner}
              user={profile}
              className="w-36 h-36 rounded-full lg:w-48 lg:h-48 cursor-pointer"
            />
          </ProfileAvatar>
    
        </div>
  
        {/* Right Section - Bio and Content */}
        <div className="lg:w-3/4 w-full">
          {/* Profile Header */}
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
            <div className="text-center lg:text-left">
             <div className="inline-flex justify-center items-center gap-x-1">
             {/* profile?.verified ? "verified" : */}
               <h1 className="text-xl lg:text-3xl xl:!font-bold large_text pr-1">{profile.username}</h1> {profile?.verified ? "verified" : <VerifiedIcon/>}</div>
              <ProfileStatsLinks profile={profile} />
              {/* <p className="text-gray-400">{profile.posts.length} posts • {profile.followedBy.length} followers • {profile.following.length} following</p> */}
            </div>
            <UserProfileHeaderButtonsDesktop  profileId={profile.id} followedBy={profile.followedBy}  userId={profile.id} />
         
            {/* <div className="mt-3 lg:mt-0 flex gap-2">
              <button className="bg-gray-800 text-white px-4 py-2 rounded">Following</button>
              <button className="bg-gray-800 text-white px-4 py-2 rounded">Message</button>
            </div> */}
          </div>
  
          {/* Bio Section */}
          <div className="mt-3 text-sm">
            <p className="text-white text-lg font-semibold setting_icon_tag_tab">{profile.name}</p>
            <p className="pb-4 passion mb-[1.5px] text-gray-400 text-sm font-medium text-[rgb(var(--ig-primary-button))]">{profile.passion}</p>
            <div className="font-semibold text-[rgb(var(--ig-primary-button))] !text-xl">{profile?.location ?? "Somwhere undefined"}</div>
            <p className="text-sm primary-text-color !-mt-0">{profile.bio ?? "5 years of connecting a global audience to Africa."}  🌍</p>
            <p className="text-[rgb(var(--ig-primary-button))] !text-lg">🔗 <a href="#" className="">{profile.website ?? "linkin.bio/okayafrica"}</a></p>
          </div>
  
          {/* Suggested Accounts */}
        {  <SuggestedAccounts userId={profile.id}/>}
        </div>
      </div>
    );
  }
  
