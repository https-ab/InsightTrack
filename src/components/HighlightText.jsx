import React from "react";

export default function HighlightText({ text = "", highlight = "" }) {
    if (!highlight) return <>{text}</>;
  
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);
  
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span
              key={index}
              className="bg-yellow-300/80 dark:bg-yellow-400 text-black rounded"
            >
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </>
    );
  }