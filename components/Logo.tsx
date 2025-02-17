import { SwitchCamera } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { calSans } from "@/app/fonts";

function Logo() {
  return (
    <Link
      href={"/"}
      className={buttonVariants({
        className:
          "hidden md:flex navLink !mb-12 lg:hover:bg-transparent lg:!p-2",
        variant: "ghost",
        size: "lg",
      })}
    >
      <SwitchCamera className="h-6 w-6 shrink-0 lg:hidden" />
      <p
        className={`font-semibold text-xl hidden lg:block ${calSans.className}`}
      >
        Kidstagram
      </p>
    </Link>
  );
}

export default Logo;
