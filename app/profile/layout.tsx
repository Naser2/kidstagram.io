"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="!max-w-screen">
      {children}
    </div>
  );
}
