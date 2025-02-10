"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const routeName = useSelectedLayoutSegment();

  const [isSettingsRoute, setIsSettingsRoute] = useState(false);

  useEffect(() => {
   console.log("ProfileLayout:_loaded");
    const isSettingsRoute = routeName?.includes("/account") ? true : false;
    setIsSettingsRoute(true);
    console.log("Is Settings Route:", isSettingsRoute);
  }, []);
  // const routeName = useSelectedLayoutSegment();
  // const isSettingsRoute = routeName?.includes("account");

  // console.log("Is Settings Route:", isSettingsRoute);
    // const routeName = useSelectedLayoutSegment();
    // const isSettingsRoute = routeName === "account";

  return (
    // <div data-page-props={JSON.stringify({ isSettingsRoute })}>
    <div className="!max-w-screen">
      {children}
    </div>
  );
}
