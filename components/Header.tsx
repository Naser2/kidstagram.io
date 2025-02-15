"use client"

import { Heart, Search, MessageCircleIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { calSans } from "@/app/fonts";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
interface HeaderProps {
  session?: Session  | null ;
}
function Header({ session }: HeaderProps) {
  const router = useRouter()
  return (
    <header className="fixed md:hidden bg-white top-0 flex items-center justify-between dark:bg-neutral-950 w-full z-50 border-b border-zinc-300 dark:border-neutral-700 px-3 py-2 sm:-ml-6">
      <Link href={"/"}>
        <p className={`font-semibold text-xl ${calSans.className}`}>
          Kidstagram
        </p>
      </Link>

      <div className="flex items-center space-x-2 pr-4">
        {/* <div className="flex items-center text-neutral-600 dark:text-neutral-400 bg-zinc-100 dark:bg-neutral-800 gap-x-2 rounded-md px-3.5 py-1.5">
          <Search className="h-4 w-4" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent placeholder:text-neutral-600 dark:placeholder:text-neutral-400 flex-1 outline-none"
          />
        </div> */}

        <Button size={"icon"} variant={"ghost"} onClick={()=>router.push("/app-notifications")}>
          <Heart />
        </Button>
        <Button size={"icon"} variant={"ghost"} onClick={()=>router.push("/app-inboxes")}>
        <svg aria-label="Messenger" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Messenger</title><path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.739"></path><path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z" fillRule="evenodd"></path></svg>
        </Button>
      </div>
    </header>
  );
}

export default Header;
