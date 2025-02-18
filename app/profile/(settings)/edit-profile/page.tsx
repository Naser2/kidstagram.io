"use client"
import ProfileForm from "@/components/ProfileForm";
import { fetchProfile } from "@/lib/data";
import { Profile, UserWithExtras } from "@/lib/definitions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { useProfile } from "@/context/ProfileContext";
import { Skeleton } from "@/components/ui/skeleton";

// export const metadata: Metadata = {
//   title: "Edit profile",
//   description: "Edit profile",
// };

function EditProfile() {

  const { profile, isProfileOwner, isOwner , loading} = useProfile();

  // console.log("EDIT_PROFILE_profile", profile, "EDIT_PROFILE_isProfileOwner->", isProfileOwner, "EDIT_PROFILE_isOwner-->", isOwner, "EDIT_PROFILE_LOADINGH->", loading);
  // const p = await fetchProfile(session?.user.username!);
  // const p = await profile
  if (loading) return <Skeleton />;
  if (!profile) return <div>User not found</div>;
  if (!isOwner) return notFound();
  if (!isProfileOwner) return notFound();

  return (
    <div className="px-12">
      <h1 className="text-2xl font-medium ml-4 md:ml-20  lg:ml-24 xl:ml-32">Edit profile</h1>
      <ProfileForm profile={profile} />
    </div>
  );
}

export default EditProfile;
