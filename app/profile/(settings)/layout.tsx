"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useWindowSize } from "@/hooks/useWindowSize"; // Custom hook to get window size
import {
  UserIcon,
  LockIcon,
  BellIcon,
  ShieldIcon,
  CreditCardIcon,
  GlobeIcon,
  MailIcon,
  ListIcon,
  WalletIcon,
  KeyIcon,
  ActivityIcon,
  UserCheckIcon,
} from "lucide-react";
import clsx from "clsx";

const tabs = [
  { title: "Edit profile", value: "edit-profile", icon: <UserIcon size={20} /> },
  { title: "Personnal account", value: "personnal-account", icon: <UserCheckIcon size={20} /> },
  { title: "Custodian account", value: "custodian-account", icon: <KeyIcon size={20} /> },
  { title: "Notifications", value: "notifications", icon: <BellIcon size={20} /> },
  { title: "Security | Password", value: "security", icon: <LockIcon size={20} /> },
  { title: "Privacy and security", value: "privacy-and-security", icon: <ShieldIcon size={20} /> },
  { title: "Login activity", value: "login-activity", icon: <ActivityIcon size={20} /> },
  { title: "Wallet", value: "wallet", icon: <WalletIcon size={20} /> },
  { title: "Payments", value: "payments", icon: <CreditCardIcon size={20} /> },
  { title: "Privacy", value: "privacy", icon: <GlobeIcon size={20} /> },
  { title: "Blocked List", value: "blocked", icon: <ListIcon size={20} /> },
  { title: "Emails from Instagram", value: "emails-from-instagram", icon: <MailIcon size={20} /> },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [username, setUsername] = useState<string | null>(null);
  const { width } = useWindowSize(); // Get current window width

  useEffect(() => {
    if (session?.user.username) {
      setUsername(session.user.username);
    }
  }, [session]);

  return (
    <div className="flex">
      <Tabs
        defaultValue="edit-profile"
        className="my-8 sm:my-0 max-[500px]:max-w-[200px] md:w-[250px] min-h-screen fixed space-y-8 left-4 top-0 md:ml-20 lg:ml-64 h-full flex flex-col lg:border-r px-4 py-12"
        orientation="vertical"
      >

      <h4 className="font-extrabold text-xl text-white ml-1 flex items-center">
      {width > 740 && "Settings"} {/* Show text only if width > 740px */}
      {width < 740 && (
        <Link href="/profile/edit-profile" className="md:order-last ">
          <svg
            aria-label="Options"
            className="x1lliihq x1n2onr6 x5n08af ml-2 mt-1"
            fill="currentColor"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <title>Options</title>
            <circle
              cx="12"
              cy="12"
              fill="none"
              r="8.635"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></circle>
            <path
              d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096"
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </svg>
        </Link>
      )}
    </h4>
        <TabsList className="md:max-w-[250px]  flex flex-col items-start justify-start h-full bg-transparent gap-y-2">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "min-[600px]:dark:text-slate-100 data-[state=active]:bg-zinc-100 dark:data-[state=active]:bg-neutral-800 dark:hover:bg-neutral-900 w-full justify-start !px-3 max-[740px]:max-w-12"
              )}
            >
              <Link href={`${tab.value}`} className="flex items-center gap-3">
                {tab.icon} {/* Show icon */}
                {width > 740 && <span>{tab.title}</span>} {/* Show text only if width > 740px */}
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className={clsx(width > 740 ? "ml-[230px]" : " ml-[70px] flex-1  xl:ml-54 min-h-screen h-full bg-white dark:bg-neutral-950")}>
        {children}
      </div>
    </div>
  );
}
