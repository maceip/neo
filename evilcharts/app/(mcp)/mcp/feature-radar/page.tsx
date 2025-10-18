"use client";

import React from "react";
import { GenerateBreadcrumb } from "@/components/ui/generate-breadcrumb";
import {
  DocsContainer,
  DocsDescription,
  DocsTitle,
} from "@/components/docs/components/docs-typography";
import { useMCPData } from "@/hooks/use-mcp-data";
import { FeatureRadarChart } from "@/charts/mcp-charts/feature-radar-chart";
import {
  FeatureRadarBarChart,
  FeatureRadarLineComparison,
  FeatureRadarAreaChart,
} from "@/charts/mcp-charts/feature-radar-variants";

const Page = () => {
  const { data, loading } = useMCPData();

  if (loading) {
    return (
      <div className="page">
        <GenerateBreadcrumb />
        <DocsContainer>
          <DocsTitle title="Feature Radar" />
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
        <DocsTitle title="Feature Adoption Radar" />
        <DocsDescription>
          Current snapshot of MCP feature adoption showing the percentage of clients
          supporting each of the 5 core features: Resources, Prompts, Tools, Sampling, and Roots.
        </DocsDescription>
      </DocsContainer>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <FeatureRadarChart />
        <FeatureRadarBarChart snapshots={data.snapshots} />
        <FeatureRadarLineComparison snapshots={data.snapshots} />
        <FeatureRadarAreaChart snapshots={data.snapshots} />
      </div>
    </div>
  );
};

export default Page;
