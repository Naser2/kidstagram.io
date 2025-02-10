
import { auth } from "@/auth";
import ProfileForm from "@/components/ProfileForm";
import { fetchProfile } from "@/lib/data";
import { Profile } from "@/lib/definitions";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Personal Account",
  description: "Personal Account Settings",
};

async function PersonalAccount(profile: Profile) {

  if (!profile) {
    notFound();
  }

  return (
    <div className="px-12">
      <h1 className="text-2xl font-medium lg:ml-12 xl:ml-20">Personal Account</h1>

      <ProfileForm profile={profile} />
    </div>
  );
}

export default PersonalAccount;
