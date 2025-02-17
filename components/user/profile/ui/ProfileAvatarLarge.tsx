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
import SubmitButton from "@/components/SubmitButton";
import UserAvatarLarge from "./UserAvatarLarge";
import { Form } from "@/components/ui/form";
import { Profile, UserWithExtras } from "@/lib/definitions";
import { useProfile } from "@/context/ProfileContext";
import { redirect } from "next/navigation";

function ProfileAvatarLarge({ user,children }: { user: UserWithExtras, children?: React.ReactNode }) {

  // // console.log("PROFILE AVATAR MOUNTED", user);
  // const { data: session } = useSession();
    const { profile, isProfileOwner, isOwner , loading} = useProfile();

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

  // useEffect(() => {
  //   setMounted(true);
  // }, []);



  return (
    <>
      <button
        className="cursor-pointer"
        onClick={() => {
          if (isProfileOwner) {
            setOpen(true);
          }
        }}
      >
        <UserAvatarLarge isProfileOwner={isProfileOwner}
          user={user}
          className="w-[10rem] h-[10rem]"
        />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="dialogContent profile_setting_modal mx-6 max-w-[85vw] rounded-lg sm:max-w-[60vw] lg:max-w-[31vw] xl:max-w-[25vw]">
          <DialogHeader>
            <DialogTitle className="mx-auto font-medium text-xl py-5">
              Change Profile Photo
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
          <form
                onSubmit={form.handleSubmit(async (values) => {
                  console.log("UPDATING PROFILE WITH:", values);

                  try {
                    const res = await fetch("/api/users/update", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(values),
                    });

                    const data = await res.json();

                    if (!res.ok) {
                      toast.error(data.error || "Profile update failed.");
                    } else {
                      toast.success(data.success);
                      redirect(`/profile${user.username}`);
                      setOpen(false);
                    }
                  } catch (error) {
                    console.error("Profile update failed:", error);
                    toast.error("An unexpected error occurred.");
                  }
                })}
              >

            {/* <form
              onSubmit={form.handleSubmit(async (values) => {
                console.log("UPDATING PROFILE WITH:", values);
                const { message } = await updateProfile(values);
                toast(message);
                setOpen(false);
              })}
            > */}
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
                  className="danger border-b border-zinc-300 dark:border-neutral-700 font-bold disabled:cursor-not-allowed w-full text-sm p-3"
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

export default ProfileAvatarLarge;


// function ProfileAvatarLarge({ user, children }: { user: UserWithExtras, children?: React.ReactNode }) {

//   // console.log("PROFILE AVATAR MOUNTED", user);

//   const { data: session } = useSession();
//   const isCurrentUser = session?.user?.id === user?.id;
//   const form = useForm<z.infer<typeof UpdateUser>>({
//     resolver: zodResolver(UpdateUser),
//     defaultValues: {
//       id: user.id,
//       image: user.image
//         ? user.image
//         : `https://api.dicebear.com/9.x/pixel-art/svg?seed=${user.name}`,
//       name: user.name || "",
//       username: user.username || "",
//     },
//   });
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [open, setOpen] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted || !session) return null;

//   return (
//     <>
//       <button
//         className="cursor-pointer"
//         onClick={() => {
//           if (isCurrentUser) {
//             setOpen(true);
//           }
//         }}
//       >
//         <UserAvatarLarge
//           user={user}
//           className="w-64 h-64"
//         />
//       </button>

//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="dialogContent profile_setting_modal  mx-6 max-w-[85vw] rounded-lg sm:max-w-[60vw] lg:max-w-[31vw] xl:max-w-[25vw]">
//           <DialogHeader>
//             <DialogTitle className="mx-auto font-medium text-xl py-5">
//               Change Profile Photo
//             </DialogTitle>
//           </DialogHeader>

//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(async (values) => {
//                 console.log("UPDATING PROFILE WITH:", values);
//                 const { message } = await updateProfile(values);
//                 toast(message);
//                 setOpen(false);
//               })}
//             >
//               <FormField
//                 control={form.control}
//                 name="image"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <UploadButton
//                         className="text-sm h-44 ut-button:bg-transparent border-y border-zinc-300 dark:border-neutral-700 ut-button:text-blue-500 ut-button:font-bold ut-allowed-content:hidden ut-button:ring-0 ut-button:focus-visible:ring-0 ut-button:ring-offset-0 ut-button:w-full"
//                         endpoint="imageUploader"
//                         onClientUploadComplete={(res) => {
//                           form.setValue("image", res[0].url);
//                           inputRef.current?.click();
//                         }}
//                         onUploadError={(error: Error) => {
//                           console.error("Upload error:", error);
//                           toast.error("Upload failed");
//                         }}
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />

//               {user.image && (
//                 <SubmitButton
//                   className="danger border-b border-zinc-300 dark:border-neutral-700 font-bold disabled:cursor-not-allowed w-full text-sm p-3"
//                   onClick={() => {
//                     form.setValue("image", "");
//                     inputRef.current?.click();
//                   }}
//                   disabled={form.formState.isSubmitting}
//                 >
//                   Remove Current Photo
//                 </SubmitButton>
//               )}

//               <input type="submit" hidden ref={inputRef} />
//             </form>
//           </Form>

//           <DialogClose className="postOption border-0 w-full p-3">
//             Cancel
//           </DialogClose>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

// export default ProfileAvatarLarge;
