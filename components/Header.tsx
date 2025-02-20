"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { calSans } from "@/app/fonts";
import { useRouter, usePathname } from "next/navigation";
import { useMemo } from "react";

const pageTitles: Record<string, string> = {
  "/app-notifications": "Notifications",
  "/app-inboxes": "Messages",
  "/profile/edit-profile": "Edit Profile",
  "/settings": "Settings",
  "/wallet": "Wallet",
  "/payments": "Payments",
  "/privacy": "Privacy",
  "/blocked": "Blocked List",
  "/security": "Security",
  "/login-activity": "Login Activity",
  "/profile/notifications": "Notifications", // ✅ Fix added
};

// Titles for dynamic profile pages (last segment after user ID)
const profilePageTitles: Record<string, string> = {
  followers: "Followers",
  followings: "Following",
  saved: "Saved",
  posts: "Posts",
  messages: "Messages",
  archived: "Archived",
  email: "Email",
};

function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // Get the last segment of the URL (e.g., 'followers' in '/profile/[userId]/followers')
  const pathSegments = pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1]; // Extract last part of URL

  // Determine page title dynamically
  const pageName = useMemo(() => {
    if (pageTitles[pathname]) return pageTitles[pathname]; // Exact matches first
    if (profilePageTitles[lastSegment]) return profilePageTitles[lastSegment]; // Handle dynamic profile pages
    return "Kidstagram"; // Default fallback
  }, [pathname, lastSegment]);

  return (
    <header className="fixed md:hidden bg-white top-0 flex items-center justify-between dark:bg-neutral-950 w-full z-50 border-b border-zinc-300 dark:border-neutral-700 px-3 py-2">
      <div className="flex items-center">
        {/* Show Back Button only if NOT on the home page */}
        {pathname !== "/" && (
          <button onClick={() => router.back()} className="mr-2">
            <svg width="24" height="24" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.58579 22.5858L20.8787 6.29289C21.2692 5.90237 21.9024 5.90237 22.2929 6.29289L23.7071 7.70711C24.0976 8.09763 24.0976 8.7308 23.7071 9.12132L8.82843 24L23.7071 38.8787C24.0976 39.2692 24.0976 39.9024 23.7071 40.2929L22.2929 41.7071C21.9024 42.0976 21.2692 42.0976 20.8787 41.7071L4.58579 25.4142C3.80474 24.6332 3.80474 23.3668 4.58579 22.5858Z"></path>
            </svg>
          </button>
        )}
        <p className={`font-semibold text-xl text-[var(--ig-primary-text)] ${calSans.className}`}>
          {pathname !== "/" ? pageName : "Kidstagram"}
        </p>
      </div>

      <div className="flex items-center space-x-2 pr-4">
        <Button size={"icon"} variant={"ghost"} onClick={() => router.push("/app-notifications")}>
          <Heart />
        </Button>
        <Button size={"icon"} variant={"ghost"} onClick={() => router.push("/app-inboxes")}>
          <svg aria-label="Messenger" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
            <title>Messenger</title>
            <path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.739"></path>
            <path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z" fillRule="evenodd"></path>
          </svg>
        </Button>
      </div>
    </header>
  );
}

export default Header;
