"use client";

import React from "react";
import { SlashIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { BookBookmark } from "@/assets/svgs";

export function GenerateBreadcrumb({
  className,
  last,
}: {
  className?: string;
  last?: string;
}) {
  const pathname = usePathname();

  return (
    <Breadcrumb className={cn(className)}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <BookBookmark />
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathname.split("/").map((path, index) => {
          if (last && index === pathname.split("/").length - 1) {
            return (
              <Link
                className="flex flex-row items-center gap-1"
                href={pathname}
                key={path}
              >
                <BreadcrumbSeparator className="-ml-1">
                  <SlashIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem
                  key={path}
                  className={cn(
                    "line-clamp-1 capitalize duration-300 dark:hover:text-white sm:max-w-full text-xs"
                  )}
                >
                  {last.split("-").join(" ")}
                </BreadcrumbItem>
              </Link>
            );
          }

          if (path === "") return null;

          return (
            <Link
              href={pathname
                .split("/")
                .slice(0, index + 1)
                .join("/")}
              className="flex flex-row items-center gap-1"
              key={path}
            >
              <BreadcrumbSeparator className="-ml-1">
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem
                className={cn(
                  "line-clamp-1 capitalize duration-300 dark:hover:text-white sm:max-w-full text-xs",
                  index === pathname.split("/").length - 1 &&
                    `dark:text-white text-black font-semibold`
                )}
              >
                {path.split("-").join(" ")}
              </BreadcrumbItem>
            </Link>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
