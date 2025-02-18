


import { auth } from "@/auth";

import ProfileAvatar from "@/components/ProfileAvatar";
import ProfileDetails from "@/components/ProfileDetails";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileTabs from "@/components/ProfileTabs";
import UserProfileHeaderButtons from "@/components/user/UserProfileHeaderButtonsDesktop";
import UserAvatar from "@/components/UserAvatar";

import { fetchProfile } from "@/lib/data";
import clsx from "clsx";

// import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import {notFound } from "next/navigation";
// import {  useSelectedLayoutSegment } from "next/navigation";
// import { headers } from "next/headers";
// import { useRouter } from "next/navigation";
// ... other imports

type Props = {
  params: Promise<{userId: string}>,
  children: React.ReactNode;
  isSettingsRoute: boolean
};

export default function ProfileStatsLinks({ profile }: { profile: any }) {
  return (
    <div className="flex items-center gap-x-2 py-2">
      <Link href={`/profile/${profile.id}/posts`} className="font-medium primary-text-color">
        <strong>{profile.posts.length}</strong> posts
      </Link>

      <Link href={`/profile/${profile.id}/followers`} className="font-medium primary-text-color">
        <strong>{profile.followedBy.length}</strong> followers
      </Link>

      <Link href={`/profile/${profile.id}/following`} className="font-medium primary-text-color">
        <strong>{profile.following.length}</strong> following
      </Link>
    </div>
  );
}
