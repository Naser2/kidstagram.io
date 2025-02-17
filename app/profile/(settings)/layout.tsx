"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ProfileProvider } from "@/context/ProfileContext";
const tabs = [
  { title: "Edit profile", value: "edit-profile" },
  { title: "Personnal account", value: "personnal-account" },
  { title: "Custodian account", value: "custodian-account" },
  { title: "Notifications", value: "notifications" },
  { title: "Security | Password", value: "security" },
  { title: "Privacy and security", value: "privacy-and-security" },
  { title: "Login activity", value: "login-activity" },
  { title: "Wallet", value: "wallet" },
  { title: "Payments", value: "payments" },
  { title: "Privacy ", value: "privacy" },
  { title: "Blocked List ", value: "blocked" },
  { title: "Emails from Instagram", value: "emails-from-instagram" },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [username, setUsername] = useState<string | null>(null);
  console.log("SettingsLayout", session);
  useEffect(() => {
    if (session?.user.username) {
      setUsername(session.user.username);
    }
  }, [session]);

  return (
 
    <div className="flex">
      <Tabs
        defaultValue="edit-profile"
        className="my-8 sm:my-0 max-[500px]:max-w-[200px] md:w-[250px] min-h-screen fixed space-y-8 left-4 top-0 md:ml-20 lg:ml-64 h-full flex flex-col lg:border-r px-6 py-12"
        orientation="vertical"
      >
        <h4 className="font-extrabold text-xl text-white ml-1">Settings</h4>
        <TabsList className="md:max-w-[250px] flex flex-col items-start justify-start h-full bg-transparent">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "min-[600px]:dark:text-slate-100 data-[state=active]:bg-zinc-100 dark:data-[state=active]:bg-neutral-800 dark:hover:bg-neutral-900 w-full justify-start !px-3"
              )}
            >
              <Link href={`${tab.value}`}>{tab.title}</Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex-1 ml-[230px] xl:ml-54 min-h-screen bg-white dark:bg-neutral-950">
        {children}
      </div>
    </div>
 
  );
}

