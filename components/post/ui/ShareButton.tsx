

"use client";

import ActionIcon from "@/components/ActionIcon";
import { Link, Send } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonProps {
  postId: string;
  shares: number;
  onShare: () => void;
}

function ShareButton({ postId, shares, onShare }: ShareButtonProps) {
  // console.log("ShareButton_shares", shares);
  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/posts/${postId}`);
    onShare();
    toast("Link copied to clipboard", {
      icon: <Link className="h-5 w-5" />,
    });
  };

  return (
    <div className="flex items-center gap-x-[0.9px]">
      <ActionIcon onClick={handleShare}>
        <Send className="h-6 w-6 transition" />
      </ActionIcon>
      <span className="text-sm font-bold dark:text-white">{shares}</span>
    </div>
  );
}

export default ShareButton;

// import ActionIcon from "@/components/ActionIcon";
// import { Link, Send } from "lucide-react";
// import { toast } from "sonner";

// function ShareButton({ postId, shares, onShare }: { postId: string,shares:number, onShare: () => void }) {
//   return (
//     <div className="flex">
//  <ActionIcon
//       onClick={() => {
//         navigator.clipboard.writeText(
//             `${window.location.origin}/posts/${postId}`)
//         onShare();
//         toast("Link copied to clipboard", {
//           icon: <Link className={"h-5 w-5"} />,
//         });
//       }}
//     >
//       <Send className={"h-6 w-6"} />
//     </ActionIcon>
//     <span> {shares}</span>
//     </div>
   
//   );
// }
// //  navigator.clipboard.writeText(
// //           `${window.location.origin}/posts/${postId}`
// export default ShareButton;
