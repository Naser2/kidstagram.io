"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"


interface AvatarLargeProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  avatarSize?: string;
}

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

const AvatarMedium = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-9 w-9  sm:h-10 sm:w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
AvatarMedium.displayName = AvatarPrimitive.Root.displayName


const AvatarSM = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-[2.6rem] w-[2.6rem] rounded-full",
      className
    )}
    {...props}
  />
))
AvatarSM.displayName = AvatarPrimitive.Root.displayName


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

export {  AvatarLarge, AvatarSM,AvatarMedium,  AvatarFallback }

