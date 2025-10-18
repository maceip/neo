"use client";

import React from "react";
import { GenerateBreadcrumb } from "@/components/ui/generate-breadcrumb";
import {
  DocsContainer,
  DocsDescription,
  DocsTitle,
} from "@/components/docs/components/docs-typography";
import { useMCPData } from "@/hooks/use-mcp-data";
import { ConformanceAreaChart } from "@/charts/mcp-charts/conformance-area-chart";
import {
  ConformanceStackedBarChart,
  ConformanceLineChart,
  ConformanceRadarSnapshot,
} from "@/charts/mcp-charts/conformance-variants";

const Page = () => {
  const { data, loading } = useMCPData();

  if (loading) {
    return (
      <div className="page">
        <GenerateBreadcrumb />
        <DocsContainer>
          <DocsTitle title="Spec Conformance" />
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
        <DocsTitle title="Spec Conformance Distribution" />
        <DocsDescription>
          Tracking how clients progress toward 100% MCP spec conformance over time.
          Shows distribution of clients by feature implementation level.
        </DocsDescription>
      </DocsContainer>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <ConformanceAreaChart />
        <ConformanceStackedBarChart snapshots={data.snapshots} />
        <ConformanceLineChart snapshots={data.snapshots} />
        <ConformanceRadarSnapshot snapshots={data.snapshots} />
      </div>
    </div>
  );
};

export default Page;
