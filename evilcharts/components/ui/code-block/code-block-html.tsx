import React from "react";
import { cn } from "@/lib/utils";

const CodeBlockHtml = ({
  html,
  heightAuto,
}: {
  html: string;
  heightAuto?: boolean;
}) => {
  return (
    <div className="relative rounded-[14px]">
      <div
        className={cn(
          "text-sm rounded-b-[14px] duration-300 dark:[&_pre]:!bg-white/4 [&_pre]:!bg-white overflow-hidden [&_code]:font-mono [&_code]:text-[14px] [&_pre]:overflow-auto [&_pre]:rounded-md  [&_pre]:p-4 [&_pre]:leading-snug "
        )}
      >
        <div
          className={cn(
            "overflow-scroll no-scroll-bar",
            heightAuto ? "h-auto" : "h-[calc(100svh-260px)]"
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
};

export default CodeBlockHtml;
