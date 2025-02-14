import { useState } from "react";

const Caption = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const captionLimit = 100; // Set character limit for truncation

  const shouldTruncate = post.caption.length > captionLimit;
  const displayedCaption = isExpanded
    ? post.caption
    : post.caption.slice(0, captionLimit) + (shouldTruncate ? "..." : "");

  return (
    <span className="aacu truncate">
      {displayedCaption}
      {shouldTruncate && !isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="text-blue-500 ml-1"
        >
          see more
        </button>
      )}
    </span>
  );
};

export default Caption;
