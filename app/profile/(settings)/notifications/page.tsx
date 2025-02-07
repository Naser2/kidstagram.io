import { auth } from "@/auth";
import LoadingComments from "@/components/LoadingComments";
import ProfileForm from "@/components/ProfileForm";
import { fetchProfile } from "@/lib/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Notifications Settings",
  description: "Edit your notifications settings",
};

async function EditProfile() {
  const session = await auth();
  // const profile = await fetchProfile(session?.user.username!);

  // if (!profile) {
  //   notFound();
  // }

  return (
    <div className="px-12">
      <h1 className="text-2xl font-medium lg:ml-12 xl:ml-20">Notifications Settings</h1>
      <LoadingComments />
      {/* <ProfileForm profile={profile} /> */}
    </div>
  );
}

export default EditProfile;
