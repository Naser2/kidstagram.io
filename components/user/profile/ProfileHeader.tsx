
"use client"

import ProfileTabs from "@/components/ProfileTabs";
import ProfileHeaderDesktop from "@/components/user/profile/ProfileHeaderDesktop";
// import MobileProfileHeader from "@/components/user/profile/mobile/MobileProfileHeader";
import ProfileHeaderMobile from "@/components/user/profile/ProfileHeaderMobile";
import { SuggestedAccounts } from "@/components/user/profile/SuggestedAccounts";
import { useAccountManager } from "@/context/useAccountManager";
import { UserWithExtras } from "@/lib/definitions";
import { Session } from "next-auth";
import { Fragment, useState} from "react";

const ProfileHeader = ({profile, session, isProfileOwner}:{profile:UserWithExtras, isProfileOwner:boolean, session?:any}) => {
     
  const { suggestAccountsVisible, toggleSuggestAccountsVisible } = useAccountManager({
    userId: profile.id,
    userSession: session,
  });
    
     
    return (<Fragment>
                <ProfileHeaderMobile profile={profile} isProfileOwner={isProfileOwner} session={session} suggestAccountsVisible={suggestAccountsVisible} toggleSuggestAccountsVisible={toggleSuggestAccountsVisible} />
                <ProfileHeaderDesktop profile={profile} isProfileOwner={isProfileOwner} session={session} suggestAccountsVisible={suggestAccountsVisible} toggleSuggestAccountsVisible={toggleSuggestAccountsVisible} />
                <SuggestedAccounts userId={profile.id} suggestAccountsVisible={suggestAccountsVisible} toggleSuggestAccountsVisible={toggleSuggestAccountsVisible} session={session} />
            </Fragment>
    )
}

export default ProfileHeader 