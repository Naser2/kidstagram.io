
import ProfileTabs from "@/components/ProfileTabs";
import ProfileHeaderDesktop from "@/components/user/profile/ProfileHeaderDesktop";
import ProfileHeaderMobile from "@/components/user/profile/ProfileHeaderMobile";

// import UserProfileHeaderButtons from "@/components/user/UserProfileHeaderButtonsDesktop";
// import UserAvatar from "@/components/UserAvatar";

import { fetchProfile, fetchProfileByID } from "@/lib/data";
import clsx from "clsx";
import { Metadata } from "next";

// import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const siteUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://kidstagram.io";

type Props = {
  params: { username: string };
  children: React.ReactNode;
};

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const profile = await fetchProfile(params.username);

//   if (!profile) {
//     return {
//       title: "Profile Not Found - Kidstagram",
//       description: "This profile does not exist.",
//       icons: {
//         icon: "/kidstagram_ico.png",
//         apple: "/kidstagram_ico.png",
//       },
//       openGraph: {
//         title: "Profile Not Found - Kidstagram",
//         description: "This profile does not exist.",
//         url: `${siteUrl}/user/${params.username}`,
//         type: "profile",
//         images: [
//           {
//             url: `${siteUrl}/kidstagram_ico.png`,
//             width: 400,
//             height: 400,
//             alt: "Default Kidstagram profile image",
//           },
//         ],
//       },
//       twitter: {
//         card: "summary_large_image",
//         title: "Profile Not Found - Kidstagram",
//         description: "This profile does not exist.",
//         images: [`${siteUrl}/kidstagram_ico.png`],
//       },
//     };
//   }


//   return {
//     title: `${profile.name} (@${profile.username}) - Kidstagram`,
//     description: profile.bio || "Check out this profile on Kidstagram!",
//     icons: {
//       icon: profile.avatar || "/kidstagram_ico.png",
//       apple: profile.avatar || "/kidstagram_ico.png",
//     },
//     openGraph: {
//       title: `${profile.name} (@${profile.username}) - Kidstagram`,
//       description: profile.bio || "View this Kidstagram profile.",
//       url: `${siteUrl}/user/${profile.username}`,
//       type: "profile",
//       images: [
//         {
//           url: profile.image || `${siteUrl}/kidstagram_ico.png`,
//           width: 400,
//           height: 400,
//           alt: `${profile.name}'s profile picture`,
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: `${profile.name} (@${profile.username}) - Kidstagram`,
//       description: profile.bio || "Discover this Kidstagram profile.",
//       images: [profile.avatar || `${siteUrl}/kidstagram_ico.png`],
//     },
//   };
// }

async function ProfileLayout({children, params}:{children: React.ReactNode, params: Promise<{userId: string}>}){
  const {userId} = await params
  console.log("ProfileLayout_userId", userId);
  
  const profile = await fetchProfileByID(userId); 

  if (!profile) {
    console.log("ProfileLayout_profile", profile);
    notFound();
  }
  return (<div className={clsx("!max-w-[99.9vw] mx-auto  w-full overflow-x-hidden porfile_content_wrap")}>
     
          {/* <ProfileHeader username={profile.username} /> */}
          <div className="max-w-4xl mx-auto">
           
          
            <ProfileHeaderMobile profile={profile} />
            <ProfileHeaderDesktop profile={profile}  />
            <ProfileTabs profile={profile}/>
            {children}
       </div>
     </div>
  );
}

export default ProfileLayout;
