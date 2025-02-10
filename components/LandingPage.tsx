

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Metadata } from "next";
import Head from "next/head";
import Image from "next/image";
import screenshot1 from "/public/screenshot4-2x.png";
import Login from "@/components/LoginForm";

const metadata: Metadata = {title: "Kidstagram", description: "A productuction-ready social media platform for kids to be productive and creative."};
export default async function LandingPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/"); // Redirect if logged in
  }

  return (
    <>
    <Head>
      <title>{String(metadata.title) ?? "Kidstagram"}</title>
      <meta name="description" content={metadata.description ?? "A platform for kids to be productive and creative "} />
    </Head>
    <div>
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
         {/* Main Container */}
      <div className="flex-col">
      <h1 className="text-3xl md:text-4xl font-bold">Kidstagram</h1>
      <p>Create, share, and explore with us!</p>
      <a href="/login">Login</a>
      <a href="/signup">Sign Up</a>
       <div className="lg:grid grid-cols-2">
        {/* Right Side - Hero */}
        <div className="flex flex-col items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
         <Login />
          <h1 className="text-3xl md:text-4xl font-bold">Kidstagram</h1>
          <p className="text-sm md:text-base">
            A productivity-ready social media platform for kids to be productive and creative.
          </p>
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </div>
        {/* Left Side - Mobile Previews */}  <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
        {/* Left Side - Mobile Previews */}
        <div className="relative w-full max-w-md md:max-w-lg">
            <Image
                src={screenshot1}
                alt="Phone Preview"
                className="..absolute ..top-0 inset-0 z-50 left-0 w-full object-cover rounded-lg"
                height={800}
                width={400}
                priority
            />
            
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/4 transform w-60">
            <div className="inline rounded-lg">
              <div className="inline-card rounded w/36o" />
            </div>
          </div>
          {/* Main+Filtered Source Series should run 22 but sources…🎉 exact approach */}
        </div>
      </div>

      </div>

    
   
    
      </div>
    </div>
    
   
    </>
  );
}