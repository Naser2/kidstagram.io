
"use client";

import React from "react";
import Image from "next/image";
import { PostWithExtras } from "@/lib/definitions";

import ExploreAvatar from "./ExploreAvatar";
import VerifiedIcon from "@/components/VerifiedIcon";
import Link from "next/link";
// import { useRouter } from "next/navigation";

export default function ExploreCard ({ post }: { post: PostWithExtras }){
//   const router = useRouter();
  return (
    <div className="block relative" 
    >  
      <div className="relative w-[200px] h-[250px] rounded-lg overflow-hidden group cursor-pointer">
       
        <Image
          src={post.fileUrl}
          alt={post.id}
          width={200}
          height={250}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <Link href={`/content/${post.id}`} className="absolute w-full h-[90%] inset-x-0 bottom-0 z-30"/>
        {/* Improved gradient overlay */}
        <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 flex flex-col justify-end">
          <div className="flex items-center space-x-2">
            <ExploreAvatar user={post.user} />
            <span className="text-white font-semibold">{post.user.username}</span>
            {!post.user.verified && <span className="text-blue-400"><VerifiedIcon /></span>}
          </div>
        </div>
      </div>    
      <p className="text-white text-sm truncate medium_text">{post.caption}</p> 
    
    </div>
  );
};


