"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserWithExtras } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";
import { Bookmark, Clapperboard, Contact, Grid3X3 } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
const getIcon = (icon: JSX.Element, size: number, color: string) => {
  return React.cloneElement(icon, {
    width: size,
    height: size,
    className: `text-${color} fill-current`,
    style: {
      stroke: color,
      fill: "currentColor",
    },
  });
};

const profileTabs = [
  {
    title: "Posts",
    href: "",
    Icon: (isActive: boolean) =>
      getIcon(
        <svg
          aria-label=""
          viewBox="0 0 24 24"
        >
          <rect fill="none" height="18" stroke="currentColor" strokeWidth="2" width="18" x="3" y="3"></rect>
          <line fill="none" stroke="currentColor" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line>
          <line fill="none" stroke="currentColor" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line>
          <line fill="none" stroke="currentColor" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line>
          <line fill="none" stroke="currentColor" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line>
        </svg>,
        18, // Size
        isActive ? "white" : "gray" // Color
      ),
  },
  
  {
    title: "Reels",
    href: "reels",
    Icon: (isActive: boolean) =>
      getIcon(
        <svg aria-label="" className="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title></title><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fillRule="evenodd"></path></svg>,
  
        18, // Size
        isActive ? "white" : "gray" // Color
      ),
  },
  
  {
    title: "Saved",
    href: "saved",
    Icon: (isActive: boolean) =>
      getIcon(
        <svg aria-label="" className="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title></title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
        ,18, // Size
        isActive ? "white" : "gray" // Color
      ),

  },
  {
    title: "Tagged",
    href: "tagged",
    Icon: (isActive: boolean) =>
      getIcon(
        <svg aria-label="" className="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title></title><path d="M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><circle cx="12.072" cy="11.075" fill="none" r="3.556" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
        </svg>
        ,18, // Size
        isActive ? "white" : "gray" // Color
      ),

  },
];

function ProfileTabs({
  profile,

}: {
  profile: UserWithExtras;

}) {
  
  const { data: session } = useSession(); // Instant session access
  const isCurrentUser = session?.user.id === profile.id;
  const isFollowing = profile.followedBy.some(
    (user) => user.followerId === session?.user.id
  );
  const pathname = usePathname();

  return (
    <Tabs defaultValue="posts" className="max-[765px]:mt-4 md:mt-14 pb-[0.1rem] md:pb-1 border-t ">
      <TabsList className="relative flex justify-center w-full  gap-x-4 md:gap-x-10 !bg-transparent !rounded-[0]">
        {profileTabs
          .filter((tab) => isCurrentUser || tab.href !== "saved")
          .map((tab) => {
            const profilePage = `/${profile.id}`;
            const isActive =
              tab.href === `${profilePage}/${tab.href}`
                ? pathname === profilePage
                : pathname === `${profilePage}/${tab.href}`;

            return (
              <TabsTrigger
                key={tab.href}
                value={tab.href}
                className={cn(
                  "relative flex flex-col items-center gap-y-1 px-4 py-2 text-sm font-bold uppercase transition-all !rounded-[0]",
                  // isActive
                  //   ? "border-t !border-t-2 border-white text-white after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:h-[2px] after:bg-white"
                  "tab_icon", // Apply the custom class
                  isActive ?  `data-[state=active]:text-[rgb(var(--ig-primary-button))] ${profilePage}/${tab.href}` // Ensure Tailwind handles the active state
              
                    : "text-neutral-400"
                )}
                asChild
              >
                <Link href={`/profile/${profile.id}/${tab.href}`}>
                  <div className="flex items-center gap-x-2">
                  {tab.Icon(isActive)}

               
                    <span>{tab.title}</span>
                  </div>
                </Link>
              </TabsTrigger>
            );
          })}
      </TabsList>
    </Tabs>
  );
}

export default ProfileTabs;

