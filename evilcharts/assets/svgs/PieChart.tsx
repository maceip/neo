import React, { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  secondaryfill?: string;
  strokewidth?: number;
  title?: string;
};

function ChartPie({
  fill = "currentColor",
  secondaryfill,
  ...props
}: IconProps) {
  secondaryfill = secondaryfill || fill;

  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill={fill}>
        <path
          d="M16.25 9C16.25 4.996 13.004 1.75 9 1.75V9H16.25Z"
          fill={secondaryfill}
          fillOpacity="0.3"
          stroke="none"
        />
        <path
          d="M15.602 12C14.461 14.507 11.934 16.25 9 16.25C4.996 16.25 1.75 13.004 1.75 9C1.75 6.066 3.493 3.539 6 2.39799"
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <path
          d="M16.25 9C16.25 4.996 13.004 1.75 9 1.75V9H16.25Z"
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
}

export default ChartPie;
