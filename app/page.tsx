import { auth } from "@/auth";
import { Metadata } from "next";
// import Head from "next/head";  // No longer needed here

// import screenshot1 from "/public/screenshot4-2x.png";
// import Login from "@/components/LoginForm";
import { PostsSkeleton } from "@/components/Skeletons";
import { Suspense } from "react";
import AuthenticationModal from "@/components/authentication/AuthenticationModal";
import Posts from "@/components/Posts";

export const metadata: Metadata = { // Correct way to set metadata
  title: "Kidstagram",
  description: "A production-ready social media platform for kids to be productive and creative.",
};

export default async function LandingPage() {
  const session = await auth();

  if (!session?.user) {
    return <AuthenticationModal />;
  }

  return (
    <div>
      {/* <NextHead />  Remove this - metadata is handled automatically */}
      <main className="flex w-full flex-grow relative h-[calc(100vh-80px)] overflow-y-auto">
        {session.user && ( // Use a fragment for cleaner conditional rendering
          <div className="relative flex flex-col flex-1 gap-y-8 max-w-lg mx-auto pb-20">
            <Suspense fallback={<PostsSkeleton />}>
              <Posts userSession={session} />
            </Suspense>
          </div>
        )}
      </main>
    </div>
  );
}

// import { auth } from "@/auth";
// import { Metadata } from "next";
// import Head from "next/head";

// export  function NextHead() {
//   return (
//     <Head>
//       <title>{String(metadata.title) || "Kidstagram"}</title>
//       <meta name="description" content={metadata.description ?? "A platform for kids to be productive and creative"} />
//     </Head>
//   );
// }
// // import screenshot1 from "/public/screenshot4-2x.png";
// // import Login from "@/components/LoginForm";
// import { PostsSkeleton } from "@/components/Skeletons";
// import { Suspense } from "react";
// import AuthenticationModal from "@/components/authentication/AuthenticationModal";
// import Posts from "@/components/Posts";
// const metadata: Metadata = {title: "Kidstagram", description: "A productuction-ready social media platform for kids to be productive and creative."};
// export default async function LandingPage() {
//   const session = await auth();

//   if (!session?.user) {
//     return <AuthenticationModal/>;
//     // <LandingPage />
//     // redirect("/dashboard"); // Redirect if logged in
//   }

//   return (
//     <div>
//       <NextHead/>
//         <main className="flex w-full flex-grow  relative h-[calc(100vh-80px)] overflow-y-auto">
//         {/* {Children} */}
//          {session.user &&  <div className="relative flex flex-col flex-1 gap-y-8 max-w-lg mx-auto pb-20">
//             <Suspense fallback={<PostsSkeleton />}>
//               <Posts userSession={session}/>
//             </Suspense>
//           </div> 
//           } 
//         </main> 
//       </div>
//   );
// }
