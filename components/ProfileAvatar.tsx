"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { updateProfile } from "@/lib/actions";
import { UpdateUser } from "@/lib/schemas";
import { UploadButton } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import SubmitButton from "./SubmitButton";
import UserAvatar from "./UserAvatar";
import { Form } from "./ui/form";
import { Profile, UserWithExtras } from "@/lib/definitions";


function ProfileAvatar({ user, children }: { user: UserWithExtras, children?: React.ReactNode }) {

  console.log("PROFILE AVATAR MOUNTED", user);

  const { data: session } = useSession();
  const isCurrentUser = session?.user?.id === user?.id;
  const form = useForm<z.infer<typeof UpdateUser>>({
    resolver: zodResolver(UpdateUser),
    defaultValues: {
      id: user.id,
      image: user.image
        ? user.image
        : `https://api.dicebear.com/9.x/pixel-art/svg?seed=${user.name}`,
      name: user.name || "",
      username: user.username || "",
    },
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !session) return null;

  return (
    <>
      <button
        className="cursor-pointer"
        onClick={() => {
          if (isCurrentUser) {
            setOpen(true);
          }
        }}
      >
        <UserAvatar
          user={user}
          className="w-20 h-20  profile-avatar"
        />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="dialogContent">
          <DialogHeader>
            <DialogTitle className="mx-auto font-medium text-xl py-5">
              Change Profile Photo
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async (values) => {
                console.log("UPDATING PROFILE WITH:", values);
                const { message } = await updateProfile(values);
                toast(message);
                setOpen(false);
              })}
            >
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <UploadButton
                        className="text-sm h-11 ut-button:bg-transparent border-y border-zinc-300 dark:border-neutral-700 ut-button:text-blue-500 ut-button:font-bold ut-allowed-content:hidden ut-button:ring-0 ut-button:focus-visible:ring-0 ut-button:ring-offset-0 ut-button:w-full"
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          form.setValue("image", res[0].url);
                          inputRef.current?.click();
                        }}
                        onUploadError={(error: Error) => {
                          console.error("Upload error:", error);
                          toast.error("Upload failed");
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {user.image && (
                <SubmitButton
                  className="text-red-500 border-b border-zinc-300 dark:border-neutral-700 font-bold disabled:cursor-not-allowed w-full text-sm p-3"
                  onClick={() => {
                    form.setValue("image", "");
                    inputRef.current?.click();
                  }}
                  disabled={form.formState.isSubmitting}
                >
                  Remove Current Photo
                </SubmitButton>
              )}

              <input type="submit" hidden ref={inputRef} />
            </form>
          </Form>

          <DialogClose className="postOption border-0 w-full p-3">
            Cancel
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProfileAvatar;
