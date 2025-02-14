import { auth } from "@/auth";

import { fetchPostById, fetchProfile } from "@/lib/data";

// import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import {notFound } from "next/navigation";

type Props = {
  params: { post: string };
  children: React.ReactNode;
  isSettingsRoute: boolean
};


async function ProfileLayout({children, params} :{children: React.ReactNode, params: Promise<{postId: string}>, isSettingsRoute: boolean}){
  const {postId} = await params

  // Read `isSettingsRoute` from parent DOM attribute
  const isSettingsRoute =
    typeof window !== "undefined"
      ? JSON.parse(
          document.querySelector("div[data-is-settings-route]")?.getAttribute("data-is-settings-route") || "{}"
        ).isSettingsRoute
      : false;

  console.log(" Route_Is_Settings:", isSettingsRoute);
  // const profile = {}
  const post = await fetchPostById(postId); 
  // Fetch profile data (only once)
  console.log("ProfileLayout_Profile", post)
  const session = await auth();
  
  if (!post) {

    // confirm('Profile not found');
    notFound();
  }

  return (
    <>
      <div className="max-w-4xl mx-auto">
       <h1>{post.user.name}</h1>
           {children}
      </div>
    </>
  );
}

export default ProfileLayout;
