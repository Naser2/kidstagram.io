// "use client"

import { useAccountManager } from "@/context/useAccountManager";

// import { useAccountManager } from "@/context/useAccountManager";
import clsx from "clsx";
import { Session } from "next-auth";



export default function AddUserIcon({profileId, session,
  toggleSuggestAccountsVisible,
  suggestAccountsVisible,
}:{profileId:string, session?:Session,  toggleSuggestAccountsVisible:Function,
  suggestAccountsVisible:boolean}) {
  // const { suggestAccountsVisible, toggleSuggestAccountsVisible } = useAccountManager({
  //   userId: profileId,
  //   userSession: session,
  // });

      //  const {
      //   handlesetSuggestAccounts,
      //   suggestAccounts
      //   } = useAccountManager({  userId: profileId});
  
  
      // const isProfileOwner = session?.data?.user?.id === userId;
  
      console.log("RRRRR_suggestAccounts", suggestAccountsVisible)
    return <button  type="button" onClick={()=>toggleSuggestAccountsVisible()}
     className={clsx(suggestAccountsVisible && "!bg-sky-500", "min-w-[2rem] !max-w-[2.2rem] sm:!max-h-[32px] rounded-md btn profile_header_btns px-[8px]")}
      role="button" tabIndex={3}>
               <div className="">
                 <svg aria-label="Similar accounts" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Similar accounts</title><path d="M19.006 8.252a3.5 3.5 0 1 1-3.499-3.5 3.5 3.5 0 0 1 3.5 3.5Z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2"></path><path d="M22 19.5v-.447a4.05 4.05 0 0 0-4.05-4.049h-4.906a4.05 4.05 0 0 0-4.049 4.049v.447" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" x1="5.001" x2="5.001" y1="7.998" y2="14.003"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" x1="8.004" x2="2.003" y1="11" y2="11"></line>
              </svg>
           </div>
         </button>
}

// export  default function AddUserIcon() {
//   const { suggestAccountsVisible, toggleSuggestAccountsVisible } = useAccountManager({
//     userId: '123',
//     userSession: { /* ... */ },
//   });

//   return (
//     <div>
//       <button onClick={toggleSuggestAccountsVisible}>
//         {suggestAccountsVisible ? 'Hide Suggestions' : 'Show Suggestions'}
//       </button>
//       {suggestAccountsVisible && (
//         <div>
//           {/* Display suggested accounts here */}
//           <p>Suggested Accounts...</p>
//         </div>
//       )}
//     </div>
//   );
// }