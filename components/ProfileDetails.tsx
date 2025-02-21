import { Profile, UserWithExtras } from "@/lib/definitions";
import React from "react";

type ProfileDetailsProps = {
  name: string;
  username: string;
  passion: string;
  additionalDetails: string;
  website: string;
  profile?: UserWithExtras;
};

const ProfileDetails: React.FC<any> = ({
  name,
  username,
  passion,
  additionalDetails,
  bio,
  website,
  profile
}) => {
  console.log("ProfileDetails", profile, name, username, passion,bio, additionalDetails);

  return (
    <div className="flex flex-col items-start space-y-2">
    <h1
      className="text-white text-lg font-semibold text-sm primary-text-color !-mt-0"
      style={{ "--base-line-clamp-line-height": "18px", "--lineHeight": "18px" } as React.CSSProperties}
    >
      {name}
    </h1>
    
      <div className="profession !mt-">
     <h2 className="passion mb-[1.5px] text-sm font-medium  text-[rgb(var(--ig-primary-button))]">
      {passion}
      </h2>
     <div className="text-sm primary-text-color " >
    {/* <div className="font-bold">{name}</div> */}
        <span className="user-external-links">{bio}</span>
    </div>
    <div className=" x3nfvp2 x193iq5w gap-x-2 min-[600px]:mt-0 -mt-2 !py-2">
      <span className="x1hwekxz xyqdw3p 2">
        <svg aria-label="Link icon" className="x1lliihq x1n2onr6 x7l2uk3" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title>Link icon</title><path d="m9.726 5.123 1.228-1.228a6.47 6.47 0 0 1 9.15 9.152l-1.227 1.227m-4.603 4.603-1.228 1.228a6.47 6.47 0 0 1-9.15-9.152l1.227-1.227" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="8.471" x2="15.529" y1="15.529" y2="8.471"></line>
         </svg>
      </span>
      <div className="_ap3a _aaco _aacw _aacz _aada _aade" dir="auto">{!website  ? `linkin.bio/${username}` : website } + 4</div>

    </div>
         {additionalDetails !== "" && <p className="text-[rgb(var(--ig-primary-button))] !text-lg"> <a href="#" className="">{additionalDetails !=="" ? additionalDetails : "Add details"}</a></p>}
      </div>
    
    </div>
  );
};

export default ProfileDetails;
