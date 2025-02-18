"use client";
// import { auth } from "@/auth";
import { useProfile } from "@/context/ProfileContext";
import { useSession } from "next-auth/react";

export const  SuggestedAccounts = ({userId}:{userId:string}) => {
    // const session  = await auth();
    const session = useSession();

    // console.log("isProfileOwner", session)
    const isProfileOwner = session?.data?.user?.id === userId;
    return (
      <div className={isProfileOwner ? " hidden" : "mt-6"}>
      <div className="my-4">            
      <h2 className="text-lg font-semibold mb-3 name my-4">Suggested for you</h2></div>
      <div className="overflow-x-auto w-full">
        <div className="flex space-x-4">
          {["BBC News", "Ebony Magazine", "Tyla", "Amplify Africa", "Kelly Rowland"].map((name, index) => (
            <div key={index} className="min-w-[150px]"> 
              <div className="bg-[rgb(var(--ig-primary-background))] rounded-lg flex flex-col items-center border border-[rgb(var(--ig-separator))]">
                <div className="p-4">
                  <img src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${name}`} className="w-16 h-16 bg-gray-700 rounded-full" />
                </div>
                <p className="text-sm font-semibold border-b border-[rgb(var(--ig-separator))] p-4 name">{name}</p>
                <button className="mt-2 text-blue-400 text-xs p-4 follow-text">Follow</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    )
  }