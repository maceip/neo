"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const CodePreviewTab = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Tabs defaultValue="preview">
        <div className="flex flex-col gap-2 ">
          <div className="flex flex-row items-center justify-between">
            <div className="font-semibold">Basic</div>
            <TabsList className="flex rounded-full h-8">
              <TabsTrigger
                className="rounded-full px-4 font-normal text-xs"
                value="preview"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                className="rounded-full px-4 font-normal text-xs"
                value="code"
              >
                Code
              </TabsTrigger>
            </TabsList>
          </div>
          {children}
        </div>
      </Tabs>
    </div>
  );
};

const CodeTab = ({ children }: { children: React.ReactNode }) => {
  return <TabsContent value="code">{children}</TabsContent>;
};

const PreviewTab = ({ children }: { children: React.ReactNode }) => {
  return <TabsContent value="preview">{children}</TabsContent>;
};

export { CodeTab, PreviewTab, CodePreviewTab };
