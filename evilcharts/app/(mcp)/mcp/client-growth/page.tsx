"use client";

import React from "react";
import { GenerateBreadcrumb } from "@/components/ui/generate-breadcrumb";
import {
  DocsContainer,
  DocsDescription,
  DocsTitle,
} from "@/components/docs/components/docs-typography";
import { useMCPData } from "@/hooks/use-mcp-data";
import {
  DefaultBarGrowthChart,
  GlowingBarGrowthChart,
  GlowingLineGrowthChart,
  GradientAreaGrowthChart,
} from "@/charts/mcp-charts/client-growth-variants";
import { Separator } from "@/components/ui/separator";

const Page = () => {
  const { data, loading } = useMCPData();

  if (loading) {
    return (
      <div className="page">
        <GenerateBreadcrumb />
        <DocsContainer>
          <DocsTitle title="MCP Client Growth" />
          <DocsDescription>Loading...</DocsDescription>
        </DocsContainer>
        <div className="mt-8 text-muted-foreground">Loading data...</div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="page">
      <GenerateBreadcrumb />
      <DocsContainer>
        <DocsTitle title="MCP Client Growth" />
        <DocsDescription>
          Visualizing the growth of MCP client implementations from November 2024
          through October 2025, rendered in multiple chart styles.
        </DocsDescription>
      </DocsContainer>

      <div className="space-y-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DefaultBarGrowthChart snapshots={data.snapshots} />
          <GlowingBarGrowthChart snapshots={data.snapshots} />
        </div>

        <Separator className="my-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlowingLineGrowthChart snapshots={data.snapshots} />
          <GradientAreaGrowthChart snapshots={data.snapshots} />
        </div>
      </div>
    </div>
  );
};

export default Page;
