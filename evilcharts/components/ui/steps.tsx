"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  stepNumber?: number;
}

interface StepContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function Steps({ className, children, ...props }: StepsProps) {
  // Convert children to array to work with them
  const stepsArray = React.Children.toArray(children);

  return (
    <div className={cn("relative", className)} {...props}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement<StepProps>(child)) return null;

        const isLastStep = index === stepsArray.length - 1;

        return (
          <div key={index} className="relative">
            {/* Add connecting line except for last item */}

            <div
              className={cn(
                "absolute left-[12px] top-[24px] h-[calc(100%-24px)] w-[1px] bg-border",
                isLastStep && "hidden"
              )}
              aria-hidden="true"
            />

            {/* Clone child and inject index for numbering */}
            {React.cloneElement(child, {
              ...child.props,
              stepNumber: index + 1,
              className: cn(child.props.className, "relative"),
            })}
          </div>
        );
      })}
    </div>
  );
}

function Step({
  stepNumber,
  className,
  children,
  ...props
}: StepProps & { stepNumber?: number }) {
  return (
    <div className={cn("pl-9", className)} {...props}>
      {/* Step number circle */}
      <div className="absolute left-0 top-0.5 flex h-6 w-6 text-xs items-center justify-center rounded-full border bg-primary font-semibold text-primary-foreground jetbrains">
        {stepNumber}
      </div>
      <div>{children}</div>
    </div>
  );
}

function StepContent({ children, ...props }: StepContentProps) {
  return (
    <div className={cn("py-4 flex flex-col gap-4", props.className)} {...props}>
      {children}
    </div>
  );
}

export { Steps, Step, StepContent };
