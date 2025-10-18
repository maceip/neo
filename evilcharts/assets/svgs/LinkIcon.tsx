import { cn } from "@/lib/utils";
import React, { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  secondaryfill?: string;
  strokewidth?: number;
  title?: string;
  className?: string;
};

function LinkIcon({
  strokewidth = 1,
  width = "1em",
  height = "1em",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      className={cn(className)}
      height={height}
      width={width}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="currentColor">
        <path
          d="M8.5,6.827c-.352,.168-.682,.398-.973,.69l-.01,.01c-1.381,1.381-1.381,3.619,0,5l2.175,2.175c1.381,1.381,3.619,1.381,5,0l.01-.01c1.381-1.381,1.381-3.619,0-5l-.931-.931"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
        />
        <path
          d="M9.5,11.173c.352-.168,.682-.398,.973-.69l.01-.01c1.381-1.381,1.381-3.619,0-5l-2.175-2.175c-1.381-1.381-3.619-1.381-5,0l-.01,.01c-1.381,1.381-1.381,3.619,0,5l.931,.931"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
        />
      </g>
    </svg>
  );
}

export default LinkIcon;
