
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea,  } from "@/components/ui/textarea";

import { updateProfile } from "@/lib/actions";
import { Profile, UserWithExtras } from "@/lib/definitions";
import { UserSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ProfileAvatar from "./ProfileAvatar";
import UserAvatar from "./UserAvatar";

function ProfileForm({ profile }: { profile: Profile }) {
  console.log("ProfileForm-->", profile);
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      id: profile.id,
      image: profile.image ? profile.image : `https://api.dicebear.com/9.x/pixel-art/svg?seed=${profile.name}`,
      name: profile.name || "",
      username: profile.username || "",
      bio: profile.bio || "",
      website: profile.website || "",
      passion: profile.passion || "",
      additionalDetails: profile.additionalDetails || "",
      gender: profile.gender || "",
     
    },
  });

  console.log("ProfileF-->", profile);
  const { isDirty, isSubmitting, isValid } = form.formState;
  console.log("ProfileFormisDirty", isDirty, "isSubmitting",isSubmitting, "isValid", isValid, "formState", form.formState);

  return (
    <div className="space-y-8 py-10 lg:p-10 max-w-xl">
      <div className="flex items-center gap-x-2 md:gap-x-5">
        {/* <ProfileAvatar user={profile}>
          <div className="md:w-20 flex md:justify-end">
            <UserAvatar user={profile} className="w-11 h-11 cursor-pointer" />
          </div>
        </ProfileAvatar> */}
        <div className=" flex justify-center ml-4 md:ml-20">
          {/* <p className="font-medium">{profile.username}</p> */}
          <ProfileAvatar user={profile}>
            <p className="text-blue-500 text-sm font-bold cursor-pointer hover:text-white">
              Change profile photo
            </p>
          </ProfileAvatar>
        </div>
      </div>
 <Form {...form}>
  <form
    onSubmit={form.handleSubmit(async (values) => {
      const { message } = await updateProfile(values);
      toast(message);
    })}
    className="space-y-8"
  >
    {/* Name Field */}
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-col gap-y-1">
            <FormLabel className="font-bold text-sm mb-1 ">Username</FormLabel>
            <FormControl>
              <Input className="resize-none w-full" {...field} />
            </FormControl>
            
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
    {/*Passion Field */}
        <FormField
      control={form.control}
      name="passion"
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-col gap-y-1">
            <FormLabel className="font-bold text-sm mb-1 ">Passion</FormLabel>
            <FormControl>
              <Input className="resize-none w-full" {...field} />
            </FormControl>
            
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  {/* Website Field */}
    <FormField
      control={form.control}
      name="website"
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-col gap-y-1">
            <FormLabel className="font-bold text-sm mb-1">Website</FormLabel>
            <FormControl>
              <Input className="resize-none w-full" {...field} />
            </FormControl>
            <FormDescription className="text-xs">
              Editing your links is only available on mobile. Visit the
              Instagram app and edit your profile to change the websites in your bio.
            </FormDescription>
            <FormMessage />
          </div>
        </FormItem>

      )}
    />
     {/* Website Field */}
     <FormField
      control={form.control}
      name="additionalDetails"
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-col gap-y-1">
            <FormLabel className="font-bold text-sm mb-1">Site Links</FormLabel>
            <FormControl>
              <Input className="resize-none w-full" {...field} />
            </FormControl>
            {/* <FormDescription className="text-xs">
              Editing your links is only available on mobile. Visit the
              Instagram app and edit your profile to change the websites in your bio.
            </FormDescription> */}
            <FormMessage />
          </div>
        </FormItem>
        
      )}
    />
    {/* Site link */}
    <FormField
      control={form.control}
      name="bio"
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-col gap-y-1">
            <FormLabel className="font-bold text-sm mb-1">Bio</FormLabel>
            <FormControl>
              <Textarea
                className="resize-none w-full"
                maxLength={150}
                {...field}
              />
            </FormControl>
            <FormDescription className="text-xs">
              {field.value?.length} / 150
            </FormDescription>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />

    {/* Gender Field */}
    <FormField
      control={form.control}
      name="gender"
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-col gap-y-1">
            <FormLabel className="font-bold text-sm mb-1">Gender</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Prefer not to say" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="prefer-not-to-say">
                  Prefer not to say
                </SelectItem>
              </SelectContent>
            </Select>
            <FormDescription className="text-xs">
              This won't be part of your public profile.
            </FormDescription>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />

    <Button
      type="submit"
      className="action-button"
      disabled={isSubmitting}
    >
      Submit
    </Button>
  </form>
</Form>

      
    </div>
  );
}

export default ProfileForm;
