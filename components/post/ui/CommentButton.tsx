
"use client";

import { MessageCircle } from "lucide-react";
import ActionIcon from "@/components/ActionIcon";

interface CommentButtonProps {
  commentsCount: number;
  commentIconOnClick: () => void;
}

function CommentButton({ commentsCount, commentIconOnClick }: CommentButtonProps) {
  return (
    <div className="flex items-center gap-x-[0.9px]">
      <ActionIcon onClick={commentIconOnClick}>
        <MessageCircle className="h-6 w-6 transition" />
      </ActionIcon>
      <span className="text-sm font-bold dark:text-white">{commentsCount}</span>
    </div>
  );
}

export default CommentButton;


// import { CommentWithExtras } from "@/lib/definitions";
// import CommentOptions from "@/components/CommentOptions";
// import UserAvatar from "@/components/UserAvatar";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import Timestamp from "@/components/Timestamp";
// import ActionIcon from "@/components/ActionIcon";
// import { MessageCircle } from "lucide-react";

// type Props = {
//   // toggleCommentsModal: Function
//   commentsCount: number;
//   commentIconOnClick: Function;
// };

// function CommentButton({  commentsCount, commentIconOnClick }: Props) {


//   return ( 
//     <div className="flex">
//         <ActionIcon onClick={() => commentIconOnClick(true)}>
//         <MessageCircle className={"h-6 w-6"} />
//       </ActionIcon> 
//       <span className="text-sm text-gray-500">{commentsCount}</span>
//     </div>
  
//   );
// }

// export default CommentButton;
