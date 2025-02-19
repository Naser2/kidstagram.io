

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Metadata } from "next";
import Head from "next/head";
import Image from "next/image";
import screenshot1 from "/public/screenshot4-2x.png";
// import Login from "@/components/LoginForm";

const metadata: Metadata = {title: "Kidstagram", description: "A productuction-ready social media platform for kids to be productive and creative."};
export default async function LandingPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/"); // Redirect if logged in
  }

  return (
    <>
      <Head>
        <title>Kidstagram Unused</title>
        <meta name="description" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">
            Welcome to <span className="text-blue-600">Kidstagram</span>
          </h1>
          <p className="mt-3 text-2xl">
            A production-ready social media platform for kids to be productive and creative.
          </p>
          <div className="flex flex-col items-center mt-6">
            <Image src={screenshot1} alt="Kidstagram screenshot" />
          </div>
          LOGIN
          {/* <Login /> */}
        </main>
      </div>
    </>
  );
}