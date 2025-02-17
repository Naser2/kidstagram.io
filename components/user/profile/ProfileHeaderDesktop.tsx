

import VerifiedIcon from "@/components/VerifiedIcon";
import ProfileStatsLinks from "./ProfileStatsLinks";
import ProfileAvatar from "./ui/ProfileAvatarLarge";
import UserAvatar from "./ui/UserAvatarLarge";
import { UserWithExtras } from "@/lib/definitions";
import UserProfileHeaderButtonsDesktop from "../UserProfileHeaderButtonsDesktop";
import { useProfile } from "@/context/ProfileContext";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/auth";

export default async function ProfileHeaderDesktop({profile}:{profile:UserWithExtras}) {
if (!profile) {
  return  <Skeleton />
}
    const session = await auth()

    // const isProfileOwner = session?.user?.id === profile.id;
// const { isProfileOwner, loading} = useProfile();

// if (loading) {
// return <Skeleton />;
// }
// if (!profile) {
// return  <Skeleton />
// }

    return (
      <div className="max-[614px]:!hidden max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 p-4">
        {/* Left Section - Profile Image */}
        <div className="lg:w-1/4 w-full flex justify-center">
        {/* <div className=" flex-shrink-0 w-1/3  flex justify-center"> */}
          <ProfileAvatar user={profile} >
            <UserAvatar   
              //  isProfileOwner={isProfileOwner}
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
               <h1 className="text-xl lg:text-3xl xl:!font-bold large_text">{profile.username}</h1> {profile?.verified ? "verified" : <VerifiedIcon/>}</div>
              <ProfileStatsLinks profile={profile} />
              {/* <p className="text-gray-400">{profile.posts.length} posts • {profile.followedBy.length} followers • {profile.following.length} following</p> */}
            </div>
            <UserProfileHeaderButtonsDesktop  profileId={profile.id} followedBy={profile.followedBy}  username={profile.username} />
         
            {/* <div className="mt-3 lg:mt-0 flex gap-2">
              <button className="bg-gray-800 text-white px-4 py-2 rounded">Following</button>
              <button className="bg-gray-800 text-white px-4 py-2 rounded">Message</button>
            </div> */}
          </div>
  
          {/* Bio Section */}
          <div className="mt-3 text-sm">
            <p><strong>{profile.name}</strong></p>
            <p>{profile.bio ?? "5 years of connecting a global audience to Africa."}  🌍</p>
            <p>🔗 <a href="#" className="text-blue-500">{profile.website ?? "linkin.bio/okayafrica"}</a></p>
          </div>
  
          {/* Suggested Accounts */}
          <div className="mt-6">
            <div className="my-4">            <h2 className="text-lg font-semibold mb-3 name my-4">Suggested for you</h2></div>

            <div className="overflow-x-auto w-full">
              <div className="flex space-x-4">
                {["BBC News", "Ebony Magazine", "Tyla", "Amplify Africa", "Kelly Rowland"].map((name, index) => (
                  <div key={index} className="min-w-[150px]"> 
                    <div className="bg-[rgb(var(--ig-primary-background))] rounded-lg flex flex-col items-center border border-[rgb(var(--ig-separator))]">
                      <div className="p-4">
                        <img src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${name}`} className="w-16 h-16 bg-gray-700 rounded-full" />
                      </div>
                      <p className="text-sm font-semibold border-b border-[rgb(var(--ig-separator))] p-4 name">{name}</p>
                      <button className="mt-2 text-blue-400 text-xs p-4 follow-text">Follow</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
  