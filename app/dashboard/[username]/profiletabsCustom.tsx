import { auth } from "@/auth";
import FollowButton from "@/components/FollowButton";
import ProfileAvatar from "@/components/ProfileAvatar";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileTabs from "@/components/ProfileTabs";
import UserAvatar from "@/components/UserAvatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { fetchProfile } from "@/lib/data";
import { PostWithExtras, UserWithExtras } from "@/lib/definitions";
import { MoreHorizontal, Settings } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";

interface Props {
  username: string | null | undefined;
  children: React.ReactNode;
  profile: UserWithExtras;
  session: { user: { id: string } };
}
import Link from "next/link";
import { notFound } from "next/navigation";

// type Props = {
//    username: string | null | undefined;
//    children: React.ReactNode;
//    profile: UserWithExtras,
//    session: { user: { id: string } }
//    user: User
// };

export async function generateMetadata(
  { username }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  if (!username) {
    notFound();
  }
  const profile = await fetchProfile(username);

  return {
    title: `${profile?.name} (@${profile?.username})`,
  };
}

async function ProfileLayout({ children, profile, session, username  }: Props) {
//   const profile = await fetchProfile(username);
//   const session = await auth();
  const isCurrentUser = session.user.id === profile?.id;
  //   the followerId here is the id of the user who is following the profile
  const isFollowing = profile?.followedBy.some(
    (user) => user.followerId === session?.user.id
  );

  if (!profile) {
    notFound();
  }
  return (
    <>
      <ProfileHeader username={profile.username ?? null} />
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-x-5 md:gap-x-10 px-4">
          <ProfileAvatar user={profile}>
            <UserAvatar
              user={profile}
              className="w-20 h-20 md:w-36 md:h-36 cursor-pointer"
            />
          </ProfileAvatar>

          <div className="md:px-10 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-3">
              <p className="font-semibold text-xl">{profile.username}</p>
              {isCurrentUser ? (
                <>
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="md:order-last"
                  >
                    <Settings />
                  </Button>
                  <Link
                    href={`/dashboard/edit-profile`}
                    className={buttonVariants({
                      className: "!font-bold",
                      variant: "secondary",
                      size: "sm",
                    })}
                  >
                    Edit profile
                  </Link>
                  <Button
                    variant={"secondary"}
                    className="font-bold"
                    size={"sm"}
                  >
                    View archive
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="md:order-last"
                  >
                    <MoreHorizontal />
                  </Button>
                  <FollowButton
                    isFollowing={isFollowing}
                    profileId={profile.id}
                  />
                  <Button
                    variant={"secondary"}
                    className="font-bold"
                    size={"sm"}
                  >
                    Message
                  </Button>
                </>
              )}
            </div>

            <div className="flex items-center gap-x-7">
              <p className="font-medium">
                <strong>{profile.posts?.length || 0} posts</strong>
              </p>

              <Link
                href={`/dashboard/${profile.username}/followers`}
                className="font-medium"
              >
                <strong>{profile.followedBy?.length || 0 }</strong> followers
              </Link>

              <Link
                href={`/dashboard/${profile?.username}/following`}
                className="font-medium"
              >
                <strong>{profile.following?.length || 0}</strong> following
              </Link>
            </div>

            <div className="text-sm">
              <div className="font-bold">{profile.name}</div>
              <p>{profile.bio}</p>
            </div>
          </div>
        </div>

        <ProfileTabs profile={profile} isCurrentUser={isCurrentUser} />

        {/* <div class="absolute inset-0"><div data-state="open" class="fixed inset-0 z-50 bg-black/50 dark:bg-black/80" style="pointer-events: auto;"><div class="z-50 h-full w-full overflow-y-auto grid grid-cols-[10px_1fr_10px] grid-rows-[minmax(10px,_1fr)_auto_minmax(10px,_1fr)] md:grid-rows-[minmax(20px,_1fr)_auto_minmax(20px,_1fr)]"><div role="dialog" id="radix-:R4d35:" aria-describedby="radix-:R4d35H2:" aria-labelledby="radix-:R4d35H1:" data-state="open" class="popover relative start-1/2 col-auto col-start-2 row-auto row-start-2 h-full w-full bg-token-main-surface-primary text-start shadow-xl ltr:-translate-x-1/2 rtl:translate-x-1/2 rounded-2xl flex flex-col focus:outline-none max-w-md" tabindex="-1" style="pointer-events: auto;"><div class="px-4 pb-4 pt-5 sm:p-6 flex items-center justify-between"><div class="flex"><div class="flex items-center"><div class="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10 bg-yellow-100"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-lg text-yellow-700" aria-hidden="true"><path d="M12.8533 5.314C12.4634 4.67593 11.5366 4.67593 11.1467 5.314L3.71283 17.4785C3.30561 18.1449 3.78518 19 4.56611 19H19.4339C20.2148 19 20.6944 18.1449 20.2872 17.4785L12.8533 5.314ZM9.44015 4.2711C10.6099 2.3569 13.3901 2.3569 14.5598 4.2711L21.9937 16.4356C23.2154 18.4347 21.7767 21 19.4339 21H4.56611C2.22332 21 0.78462 18.4347 2.00627 16.4356L9.44015 4.2711ZM12 8.99999C12.5523 8.99999 13 9.44771 13 9.99999V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V9.99999C11 9.44771 11.4477 8.99999 12 8.99999ZM10.8516 16.5001C10.8516 15.865 11.3664 15.3501 12.0016 15.3501C12.6367 15.3501 13.1516 15.8649 13.1516 16.5001C13.1516 17.1352 12.6367 17.6501 12.0016 17.6501C11.3664 17.6501 10.8516 17.1352 10.8516 16.5001Z" fill="currentColor"></path></svg></div><div class="flex grow flex-col gap-1"><h2 id="radix-:R4d35H1:" class="text-lg font-semibold leading-6 text-token-text-primary">Your session has expired</h2><p id="radix-:R4d35H2:" class="text-sm text-token-text-tertiary">Please log in again to continue using the app.</p></div></div></div></div><div class="flex-grow overflow-y-auto p-4 sm:p-6 md:!pt-0"><div class="flex flex-col gap-3 sm:flex-row-reverse mt-1"><button class="btn relative btn-secondary" as="button"><div class="flex items-center justify-center">Log in</div></button></div></div></div></div></div></div> */}
      </div>
    </>
  );
}

export default ProfileLayout;
