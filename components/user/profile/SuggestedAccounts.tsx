"use client";
// import { auth } from "@/auth";
import React, { useEffect, useState } from "react";
import { useProfile } from "@/context/ProfileContext";
import { useSession } from "next-auth/react";
import { useAccountManager } from "@/context/useAccountManager";
import { Session } from "next-auth";

export const  SuggestedAccounts = ({userId,
   toggleSuggestAccountsVisible,
    suggestAccountsVisible, 
  session
}:
  {userId:string,
     toggleSuggestAccountsVisible:Function,
     suggestAccountsVisible:boolean,
      session:any}) => {
    // const session  = await auth();
    // const session = useSession();
   

// useEffect(() => {
//   setShowSuggestAccounts(suggestAccounts);

//  }, [suggestAccounts]);
    // console.log("isProfileOwner", session)

    const isProfileOwner = session?.data?.user?.id === userId;

    console.log("EEE_suggestAccounts", suggestAccountsVisible)
    return (
      <div className={suggestAccountsVisible ? "mt-6 my-4 max-[764px]:ml-7" : " hidden" }>
      <div className="mt-4 py-2">            
      <h2 className="text-lg font-semibold mb-3 name ">Suggested for you</h2></div>
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