

import { User } from "next-auth";
import Logo from "./Logo";
import MoreDropdown from "./MoreDropdown";
import NavLinks from "./NavLinks";
import ProfileLink from "./ProfileLink";

interface SideNavProps {
  user?: User & { username?: string | null };
}
// dark:bg-neutral-950bg-white 
export default function SideNav({ user }: SideNavProps) {
  console.log("USER", user);
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="border-t  bg-[rgb(var(--ig-primary-background))] -ml-3 md:ml-0  h-16 justify-evenly fixed z-50 flex-1 w-full md:relative md:h-full bottom-0 md:border-none flex flex-row md:justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-1 p-2">
        <Logo />
        <NavLinks  />
        {user && <ProfileLink user={user} />}
        <div className="flex relative md:mt-auto flex-1 items-end w-full">
          <MoreDropdown  user={user}/>
        </div>
      </div>
    </div>
  );
}
// function SideNav({ user }: { user: User }) {

//   return (
//     <div className="flex h-full flex-col px-3 py-4 md:px-2">
//       <div className="border-t -ml-3 md:ml-0 bg-white dark:bg-neutral-950 h-16 justify-evenly fixed z-50 flex-1 w-full md:relative md:h-full bottom-0 md:border-none flex flex-row md:justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 p-2">
//         <Logo />
//         <NavLinks />
//         {user && <ProfileLink user={user} />}

//         <div className="hidden md:flex relative md:mt-auto flex-1 items-end w-full">
//           <MoreDropdown />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SideNav;


// // 'use client';

// import { auth } from "@/auth";
// import Logo from "./Logo";
// import MoreDropdown from "./MoreDropdown";
// import NavLinks from "./NavLinks";
// import ProfileLink from "./ProfileLink";

// // import { User } from PrismaAdapter
// import { redirect } from "next/navigation";
// import { User } from "@prisma/client";


// function SideNav() {
//   // const [user, setUser] = useState<User & { username?: string | null } | null>(null);
// let session: { user?: User & { username?: string | null } } | null = null;
// let loading =true

// // useEffect(() => {
//   const fetchSession = async (): Promise<void> => {
//     const session = await auth();
 
//     loading = false;
//   // };

//   fetchSession();
// // }, []);
//   }
// if (loading) {
//   redirect('/login');
//   return <div>Loading...</div>;
// }

// const user = session?.user || { username: null };
//   return (
//     <div className="flex h-full flex-col px-3 py-4 md:px-2">
//       <div className="border-t -ml-3 md:ml-0 bg-white dark:bg-neutral-950 h-16 justify-evenly fixed z-50 flex-1 w-full md:relative md:h-full bottom-0 md:border-none flex flex-row md:justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 p-2">
//         <Logo />
//         <NavLinks />
//         {user && <ProfileLink user={user} />}
//         <div className="hidden md:flex relative md:mt-auto flex-1 items-end w-full">
//           <MoreDropdown />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SideNav;

//  function SideNav() {
//   const fetchSession = async() => {
//     const session = await auth();
//     return session;
//   }
//   const session =  fetchSession();

 

//   if (session === null || session === undefined) {
//     return <div>Loading...</div>;
//   }

//   const user = session?.user;

//   return (
//     <div className="flex h-full flex-col px-3 py-4 md:px-2">
//       <div className="border-t -ml-3 md:ml-0 bg-white dark:bg-neutral-950 h-16 justify-evenly fixed z-50 flex-1 w-full md:relative md:h-full bottom-0 md:border-none flex flex-row md:justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 p-2">
//         <Logo />
//         <NavLinks />
//         {user && <ProfileLink user={user} />}

//         <div className="hidden md:flex relative md:mt-auto flex-1 items-end w-full">
//           <MoreDropdown />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SideNav;


// import { auth } from "@/auth";
// import Logo from "./Logo";
// import MoreDropdown from "./MoreDropdown";
// import NavLinks from "./NavLinks";
// import ProfileLink from "./ProfileLink";

// async function SideNav() {
//   const session = await auth();
//   const user = session?.user;

//   return (
//     <div className="flex h-full flex-col px-3 py-4 md:px-2">
//       <div className="border-t -ml-3 md:ml-0 bg-white dark:bg-neutral-950 h-16 justify-evenly fixed z-50 flex-1 w-full md:relative md:h-full bottom-0 md:border-none flex flex-row md:justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 p-2">
//         <Logo />
//         <NavLinks />
//         {user && <ProfileLink user={user} />}

//         <div className="hidden md:flex relative md:mt-auto flex-1 items-end w-full">
//           <MoreDropdown />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SideNav;
