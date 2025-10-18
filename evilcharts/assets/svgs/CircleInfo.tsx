import { cn } from "@/lib/utils";
import React, { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  secondaryfill?: string;
  strokewidth?: number;
  title?: string;
  className?: string;
};

function CircleInfo({
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
      <g fill="#737373">
        <circle
          cx="9"
          cy="9"
          fill="none"
          r="7.25"
          stroke="#737373"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
        />
        <line
          fill="none"
          stroke="#737373"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
          x1="9"
          x2="9"
          y1="12.819"
          y2="8.25"
        />
        <path
          d="M9,6.75c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z"
          fill="#737373"
          stroke="none"
        />
      </g>
    </svg>
  );
}

export default CircleInfo;
