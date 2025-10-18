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
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { FileJson, Copy, Check } from "lucide-react";
import { useMCPData } from "@/hooks/use-mcp-data";

export function DataSourceDialog() {
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

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <SidebarMenuButton>
          <FileJson size={16} />
          <span>Raw Dataset</span>
        </SidebarMenuButton>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh] flex flex-col">
        <SheetHeader>
          <SheetTitle>Raw JSON Data</SheetTitle>
          <SheetDescription>
            Complete MCP ecosystem snapshot data ({data?.snapshots.length || 0} snapshots)
          </SheetDescription>
        </SheetHeader>

        {loading ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Loading data...
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto mt-4">
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
                    Copy JSON
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
