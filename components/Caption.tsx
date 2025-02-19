import clsx from "clsx";
import { useEffect, useState } from "react";

const Caption = ({ caption }: { caption: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const captionLimit = 100;

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const shouldTruncate = caption.length > captionLimit && !isSmallScreen;
  const [displayedCaption, setDisplayedCaption] = useState(
    shouldTruncate ? caption.slice(0, captionLimit) + "..." : caption
  );

  useEffect(() => {
    if (isExpanded || isSmallScreen) {
      setDisplayedCaption(caption);
    } else {
      setDisplayedCaption(
        shouldTruncate ? caption.slice(0, captionLimit) + "..." : caption
      );
    }
  }, [isExpanded, caption, shouldTruncate, isSmallScreen]);

  // Function to parse hashtags and wrap them in <a>
  const renderCaptionWithLinks = (text: string) => {
    return text.split(/(\s+)/).map((word, index) => {
      if (word.startsWith("#")) {
        return (
          <a
            key={index}
            href={`/hashtag/${word.substring(1)}`}
            className="text-blue-500 font-medium"
            style={{
              color: "rgb(var(--ig-link))",
              fontWeight: "var(--font-weight-system-regular)",
              fontSize: "var(--system-14-font-size)",
              lineHeight: "var(--system-14-line-height)",
              fontFamily: "var(--font-family-system)",
              margin: "-3px 0 -4px",
              wordWrap: "break-word",
            }}
          >
            {word}
          </a>
        );
      }
      return word;
    });
  };

  return (
    <div className="flex items-center space-x-2">
      {/* <span className="font-bold text-white">a_k_da_don</span> */}
      <span className={clsx(shouldTruncate && "truncate", "aacu lg:max-w-[15rem] ")}>
        {renderCaptionWithLinks(displayedCaption)}
        {shouldTruncate && !isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="text-blue-500 ml-1"
          >
            see more
          </button>
        )}
      </span>
    </div>
  );
};

export default Caption;
