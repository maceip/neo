"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Puzzle, Copy, Check, Download } from "lucide-react";
import { useMCPData } from "@/hooks/use-mcp-data";

export function RawJsonDialog() {
  const { data, loading } = useMCPData();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const jsonString = React.useMemo(() => {
    if (!data) return "";
    return JSON.stringify(data, null, 2);
  }, [data]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mcp-snapshots.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 cursor-pointer"
        >
          <Puzzle className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto w-full max-w-4xl flex flex-col">
        <SheetHeader>
          <SheetTitle>Raw JSON Data</SheetTitle>
          <SheetDescription>
            Complete MCP ecosystem snapshot data ({data?.snapshots.length || 0} snapshots)
          </SheetDescription>
        </SheetHeader>

        {loading ? (
          <div className="p-8 text-center text-muted-foreground">
            Loading data...
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto mt-6">
              <pre className="text-xs bg-muted/50 p-4 rounded-lg overflow-x-auto">
                <code>{jsonString}</code>
              </pre>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="h-8"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="h-8"
              >
                <Download className="w-3 h-3 mr-1" />
                Download
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
