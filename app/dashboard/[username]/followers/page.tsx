import FollowersModal from "@/components/FollowersModal";
import { fetchProfile } from "@/lib/data";

export default async function fetchPostById({params} :{ params:Promise <{username: string }>}){
  const { username } = await params;

  const profile = await fetchProfile(username);
  const followers = profile?.followedBy;

  return <FollowersModal followers={followers} username={username} />;
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
