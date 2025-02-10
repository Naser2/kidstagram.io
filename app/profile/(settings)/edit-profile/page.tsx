import { auth } from "@/auth";
import ProfileForm from "@/components/ProfileForm";
import { fetchProfile } from "@/lib/data";
import { Profile, UserWithExtras } from "@/lib/definitions";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit profile",
  description: "Edit profile",
};

async function EditProfile(profile: Profile) {
  const session = await auth();
  const p = await fetchProfile(session?.user.username!);
  // const p = await profile
  if (!profile) {
    notFound();
  }

  return (
    <div className="px-12">
      <h1 className="text-2xl font-medium ml-4 md:ml-20  lg:ml-24 xl:ml-32">Edit profile</h1>

      <ProfileForm profile={p} />
    </div>
  );
}

export default EditProfile;
