import { auth } from "@/auth";
import FollowButton from "@/components/FollowButton";
import ProfileAvatar from "@/components/ProfileAvatar";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileTabs from "@/components/ProfileTabs";
import UserAvatar from "@/components/UserAvatar";
import { Button, buttonVariants } from "@/components/ui/button";
// import { fetchProfile } from "@/lib/data";
import { MoreHorizontal, Settings } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// ... other imports

type Props = {
  params: { username: string };
  children: React.ReactNode;
};

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const username = await params.username;
//   const profile = await fetchProfile(username); // Fetch profile data

//   return {
//     title: `${profile?.name} (@${profile?.username})` || "Profile" // Handle null profile
//   };
// }


// type Props = {
//   params: {
//     username: string;
//   };
//   children: React.ReactNode;
// };

// export async function generateMetadata(
//   { params }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const username = params.username;

//   const profile = await fetchProfile(username);

//   return {
//     title: `${profile?.name} (@${profile?.username})`,
//   };
// }

// async function ProfileLayout({ children, params: { username } }: Props) {
//   const profile = await fetchProfile(username);
//   const session = await auth();
//   const isCurrentUser = session?.user.id === profile?.id;
  //   the followerId here is the id of the user who is following the profile
  // const isFollowing = profile?.followedBy.some(
  //   (user) => user.followerId === session?.user.id
  // );

  // if (!profile) {
  //   notFound();
  // }
async function ProfileLayout({children, params} :{children: React.ReactNode, params:Promise <{username: string }>}){
  // const {username} = await params
  // const profile = await fetchProfile(username); // Fetch profile data (only once)
  // const session = await auth();
  // const isCurrentUser = session?.user.id === profile?.id;
  // const isFollowing = profile?.followedBy.some(
  //   (user) => user.followerId === session?.user.id
  // );




  // useEffect(() => {
  //   async function loadSavedPosts() {
  //     const username = await /dashboard/;
  //     setUsername(username);
 
  //     const savedPosts = await fetchSavedPostsByUsername(username);
  //     const fetchedPosts = savedPosts?.map((savedPost) => savedPost.post);
  //     setPosts(fetchedPosts);
  //   }

  //   loadSavedPosts();
  // }, [params]);
  // if (!profile) {

    // confirm('Profile not found');
    notFound();
  }

  return (
    <>
      
    </>
  );
}

export default ProfileLayout;
