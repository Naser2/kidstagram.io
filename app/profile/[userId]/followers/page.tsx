import FollowersModal from "@/components/FollowersModal";
import {  fetchProfileByID } from "@/lib/data";

export default async function fetchPostById({params} :{ params:Promise <{userId: string }>}){
  const { userId } = await params;
  console.log("FOLLOWERS: " + userId)

  const profile = await fetchProfileByID(userId);
  const followers = profile?.followedBy;

  return <FollowersModal followers={followers} userId={userId} />;
}





// import FollowersModal from "@/components/FollowersModal";
// import { fetchProfile } from "@/lib/data";

// async function FollowersPage({
//   params: { username },
// }: {
//   params: {
//     username: string;
//   };
// }) {
//   const profile = await fetchProfile(username);
//   const followers = profile?.followedBy;

//   return <FollowersModal followers={followers} username={username} />;
// }

// export default FollowersPage;
