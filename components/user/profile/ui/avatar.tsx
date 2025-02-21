"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"


type AvatarLargeProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
  avatarSize?: string;
};

const AvatarLarge = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarLargeProps
>(({ className, avatarSize, ...props }, ref) => (
  <AvatarPrimitive.Root id="AVATAR_LARGE"
    ref={ref}
    className={cn(avatarSize? avatarSize : "h-64 w-64", "relative flex   shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
AvatarLarge.displayName = AvatarPrimitive.Root.displayName


const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export {  AvatarLarge, AvatarFallback }
