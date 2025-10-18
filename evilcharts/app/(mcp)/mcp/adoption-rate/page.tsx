"use client";

import React from "react";
import { GenerateBreadcrumb } from "@/components/ui/generate-breadcrumb";
import {
  DocsContainer,
  DocsDescription,
  DocsTitle,
} from "@/components/docs/components/docs-typography";
import { useMCPData } from "@/hooks/use-mcp-data";
import { FeatureAdoptionChart } from "@/charts/mcp-charts/feature-adoption-chart";
import {
  FeatureAdoptionBarChart,
  FeatureAdoptionAreaChart,
  FeatureAdoptionRadarSnapshot,
} from "@/charts/mcp-charts/feature-adoption-variants";

const Page = () => {
  const { data, loading } = useMCPData();

  if (loading) {
    return (
      <div className="page">
        <GenerateBreadcrumb />
        <DocsContainer>
          <DocsTitle title="Feature Adoption Rate" />
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
        <DocsTitle title="Feature Adoption Rate" />
        <DocsDescription>
          Tracking the percentage of clients supporting each MCP feature
          (Resources, Prompts, Tools, Sampling, Roots) over time.
        </DocsDescription>
      </DocsContainer>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <FeatureAdoptionChart />
        <FeatureAdoptionBarChart snapshots={data.snapshots} />
        <FeatureAdoptionAreaChart snapshots={data.snapshots} />
        <FeatureAdoptionRadarSnapshot snapshots={data.snapshots} />
      </div>
    </div>
  );
};

export default Page;
