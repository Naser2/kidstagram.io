import FollowingModal from "@/components/FollowingModal";
import { fetchProfile, fetchProfileByID } from "@/lib/data";
import { console } from "inspector";



export default async function FollowingPage({params} :{ params:Promise <{userId: string }>}){
  const { userId } = await params;
  console.log("FollowingPage_username", userId)
  const profile = await fetchProfileByID(userId);
  const following = profile?.following

  return <FollowingModal following={following} userid={userId} />
}

// import FollowingPage from "@/components/FollowersModal";
// import { fetchProfile } from "@/lib/data";

// async function FollowingPage({
//   params: { username },
// }: {
//   params: {
//     username: string;
//   };
// }) {
//   const profile = await fetchProfile(username);
//   const following = profile?.following;

//   return <FollowingModal following={following} username={username} />;
// }

// export default FollowingPage;
