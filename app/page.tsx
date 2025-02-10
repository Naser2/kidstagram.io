

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
import AuthenticationModal from "@/components/authentication/AuthenticationModal";

const metadata: Metadata = {title: "Kidstagram", description: "A productuction-ready social media platform for kids to be productive and creative."};
export default async function LandingPage() {
  const session = await auth();

  if (!session?.user) {
    return <AuthenticationModal/>;
    // <LandingPage />
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
     {/* {Children} */}
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
