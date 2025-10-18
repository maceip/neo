"use client";

import React from "react";
import { GenerateBreadcrumb } from "@/components/ui/generate-breadcrumb";
import {
  DocsContainer,
  DocsDescription,
  DocsTitle,
} from "@/components/docs/components/docs-typography";
import {
  ClientGrowthChart,
  ConformanceAreaChart,
  FeatureAdoptionChart,
  FeatureRadarChart,
} from "@/charts/mcp-charts";
import { Separator } from "@/components/ui/separator";

const Page = () => {
  return (
    <div className="page">
      <GenerateBreadcrumb />
      <DocsContainer>
        <DocsTitle title="MCP Ecosystem Evolution" />
        <DocsDescription>
          Tracking the growth and evolution of the Model Context Protocol (MCP)
          ecosystem from November 2024 through October 2025. Explore detailed
          visualizations using the sidebar navigation.
        </DocsDescription>
      </DocsContainer>

      <div className="space-y-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ClientGrowthChart />
          <FeatureRadarChart />
        </div>

        <Separator className="my-8" />

        <div className="lg:col-span-2">
          <FeatureAdoptionChart />
        </div>

        <Separator className="my-8" />

        <div className="lg:col-span-2">
          <ConformanceAreaChart />
        </div>
      </div>
    </div>
  );
};

export default Page;
