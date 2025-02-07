

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Metadata } from "next";
import Head from "next/head";
import Image from "next/image";
import screenshot1 from "/public/screenshot4-2x.png";
import Login from "@/components/LoginForm";
import Posts from "@/components/Posts";
import { PostsSkeleton } from "@/components/Skeletons";
import { Suspense } from "react";

const metadata: Metadata = {title: "Kidstagram", description: "A productuction-ready social media platform for kids to be productive and creative."};
export default async function LandingPage() {
  const session = await auth();

  if (!session?.user) {
    return <LandingPage />
    // redirect("/dashboard"); // Redirect if logged in
  }

  return (
    <div>
    <Head>
      <title>{String(metadata.title) ?? "Kidstagram"}</title>
      <meta name="description" content={metadata.description ?? "A platform for kids to be productive and creative "} />
    </Head>
   <>
   <main className="flex w-full flex-grow">
    {session.user &&  <div className="flex flex-col flex-1 gap-y-8 max-w-lg mx-auto pb-20">
       <Suspense fallback={<PostsSkeleton />}>
         <Posts />
       </Suspense>
     </div> 
     }
   </main> 
  </>
    </div>
  );
}
// export default async function Page() {
//   const session = await auth();

//   if (session?.user) {
//     redirect("/dashboard"); // Redirect logged-in users to dashboard
//   }

//   return (
//     <div>
//       <h1>Welcome to Kidstagram</h1>
//       <p>Explore or log in to access more features.</p>
//     </div>
//   );
// }
// import { redirect } from "next/navigation";
// export default function Page() {
//   redirect("/dashboard");
// }
