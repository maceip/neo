"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "@/assets/svgs";

interface CopyButtonProps {
  code: string;
}

const CopyButton = ({ code }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Button
      className="h-6 w-6 cursor-pointer duration-200 relative"
      variant="ghost"
      size="icon"
      onClick={handleCopy}
    >
      {isCopied ? (
        <span className="absolute top-0 right-10 w-full h-full flex items-center justify-center text-xs text-muted-foreground/70">
          Copied
        </span>
      ) : null}
      <CopyIcon />
    </Button>
  );
};

export default CopyButton;
