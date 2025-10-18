"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMCPData } from "@/hooks/use-mcp-data";
import { useMemo } from "react";

const chartConfig = {
  adoption: {
    label: "Adoption %",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function FeatureRadarChart() {
  const { data, loading } = useMCPData();

  const chartData = useMemo(() => {
    if (!data || data.snapshots.length === 0) return [];

    // Get the latest snapshot
    const latestSnapshot = data.snapshots[data.snapshots.length - 1];
    const total = latestSnapshot.clients.length;

    const featureCounts = {
      Resources: 0,
      Prompts: 0,
      Tools: 0,
      Sampling: 0,
      Roots: 0,
    };

    latestSnapshot.clients.forEach((client) => {
      Object.entries(client.features).forEach(([feature, supported]) => {
        if (supported) {
          featureCounts[feature as keyof typeof featureCounts]++;
        }
      });
    });

    return Object.entries(featureCounts).map(([feature, count]) => ({
      feature,
      adoption: total > 0 ? Math.round((count / total) * 100) : 0,
    }));
  }, [data]);

  const latestDate = useMemo(() => {
    if (!data || data.snapshots.length === 0) return "";
    const date = new Date(data.snapshots[data.snapshots.length - 1].date);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  }, [data]);

  if (loading) {
    return (
      <Card>
        <CardHeader className="items-center pb-4">
          <CardTitle>Feature Adoption Radar</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading data...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Feature Adoption Radar</CardTitle>
        <CardDescription>
          Current adoption percentages as of {latestDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent
                formatter={(value) => `${value}%`}
              />}
            />
            <PolarAngleAxis dataKey="feature" />
            <PolarGrid strokeDasharray="3 3" />
            <Radar
              stroke="var(--color-adoption)"
              dataKey="adoption"
              fill="var(--color-adoption)"
              fillOpacity={0.3}
              filter="url(#feature-radar-glow)"
              strokeWidth={2}
            />
            <defs>
              <filter
                id="feature-radar-glow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
