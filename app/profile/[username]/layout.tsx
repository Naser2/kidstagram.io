import { auth } from "@/auth";
import FollowButton from "@/components/FollowButton";
import ProfileAvatar from "@/components/ProfileAvatar";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileTabs from "@/components/ProfileTabs";
import UserAvatar from "@/components/UserAvatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { fetchProfile } from "@/lib/data";
import { MoreHorizontal, Settings } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// ... other imports

type Props = {
  params: { username: string };
  children: React.ReactNode;
};

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const username = await params.username;
//   const profile = await fetchProfile(username); // Fetch profile data

//   return {
//     title: `${profile?.name} (@${profile?.username})` || "Profile" // Handle null profile
//   };
// }


// type Props = {
//   params: {
//     username: string;
//   };
//   children: React.ReactNode;
// };

// export async function generateMetadata(
//   { params }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const username = params.username;

//   const profile = await fetchProfile(username);

//   return {
//     title: `${profile?.name} (@${profile?.username})`,
//   };
// }

// async function ProfileLayout({ children, params: { username } }: Props) {
//   const profile = await fetchProfile(username);
//   const session = await auth();
//   const isCurrentUser = session?.user.id === profile?.id;
  //   the followerId here is the id of the user who is following the profile
  // const isFollowing = profile?.followedBy.some(
  //   (user) => user.followerId === session?.user.id
  // );

  // if (!profile) {
  //   notFound();
  // }
async function ProfileLayout({children, params} :{children: React.ReactNode, params:Promise <{username: string }>}){
  const {username} = await params

  console.log("profile/ User_NAme / ProfileLayout_username", username)
  // const profile = {}
  const profile = await fetchProfile(username); 
  // Fetch profile data (only once)
  console.log("ProfileLayout_Profile", profile)
  const session = await auth();
  const isCurrentUser = session?.user.id === profile?.id;
  const isFollowing = profile?.followedBy.some(
    (user) => user.followerId === session?.user.id
  );




  // useEffect(() => {
  //   async function loadSavedPosts() {
  //     const username = await /dashboard/;
  //     setUsername(username);
 
  //     const savedPosts = await fetchSavedPostsByUsername(username);
  //     const fetchedPosts = savedPosts?.map((savedPost) => savedPost.post);
  //     setPosts(fetchedPosts);
  //   }

  //   loadSavedPosts();
  // }, [params]);
  if (!profile) {

    // confirm('Profile not found');
    notFound();
  }

  return (
    <>
      <ProfileHeader username={profile.username} />
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
                    <svg aria-label="Options" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Options</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                    {/* <Settings /> */}
                  </Button>
                  <Link
                    href={`/dashboard/edit-profile`}
                    className={buttonVariants({
                      className: "!font-bold primary-text-color",
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
              <p className="font-medium primary-text-color">
                <strong>{profile.posts.length} posts</strong>
              </p>

              <Link
                href={`/dashboard/${profile.username}/followers`}
                className="font-medium primary-text-color"
              >
                <strong>{profile.followedBy.length}</strong> followers
              </Link>

              <Link
                href={`/dashboard/${profile.username}/following`}
                className="font-medium primary-text-color"
              >
                <strong>{profile.following.length}</strong> following
              </Link>
            </div>

            <div className="text-sm primary-text-color">
              <div className="font-bold">{profile.name}</div>
              <p>{profile.bio}</p>
            </div>
          </div>
        </div>

        <ProfileTabs profile={profile} isCurrentUser={isCurrentUser} />

        {children}
      </div>
    </>
  );
}

export default ProfileLayout;
