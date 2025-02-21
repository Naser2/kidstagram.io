"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"

const ProfileAvatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
))

ProfileAvatar.displayName = "ProfileAvatar"

const ProfileAvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))

ProfileAvatarImage.displayName = "ProfileAvatarImage"

const ProfileAvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-gray-300", className)}
    {...props}
  />
))

ProfileAvatarFallback.displayName = "ProfileAvatarFallback"

export { ProfileAvatar, ProfileAvatarImage, ProfileAvatarFallback }
