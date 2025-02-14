import { useState, useEffect } from "react";

const Caption = ({ caption }: { caption: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const captionLimit = 100; // Set character limit for truncation

  const shouldTruncate = caption.length > captionLimit;
  const [displayedCaption, setDisplayedCaption] = useState(
    shouldTruncate ? caption.slice(0, captionLimit) + "..." : caption
  );

  useEffect(() => {
    if (isExpanded) {
      setDisplayedCaption(caption); // Show full caption when expanded
    } else {
      setDisplayedCaption(
        shouldTruncate ? caption.slice(0, captionLimit) + "..." : caption
      );
    }
  }, [isExpanded, caption, shouldTruncate]); // Reacts to changes in state and caption

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
