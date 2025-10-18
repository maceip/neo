"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
  complete: {
    label: "100% (5/5 features)",
    color: "var(--chart-1)",
  },
  high: {
    label: "80% (4/5 features)",
    color: "var(--chart-2)",
  },
  medium: {
    label: "60% (3/5 features)",
    color: "var(--chart-3)",
  },
  low: {
    label: "40% (2/5 features)",
    color: "var(--chart-4)",
  },
  minimal: {
    label: "20% (1/5 features)",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function ConformanceAreaChart() {
  const { data, loading } = useMCPData();

  const chartData = useMemo(() => {
    if (!data) return [];

    return data.snapshots.map((snapshot) => {
      const date = new Date(snapshot.date);
      const conformanceCounts = { complete: 0, high: 0, medium: 0, low: 0, minimal: 0 };

      snapshot.clients.forEach((client) => {
        const features = Object.values(client.features).filter(Boolean).length;
        if (features === 5) conformanceCounts.complete++;
        else if (features === 4) conformanceCounts.high++;
        else if (features === 3) conformanceCounts.medium++;
        else if (features === 2) conformanceCounts.low++;
        else if (features === 1) conformanceCounts.minimal++;
      });

      return {
        date: snapshot.date,
        month: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        ...conformanceCounts,
      };
    });
  }, [data]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Spec Conformance Distribution</CardTitle>
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
      <CardHeader>
        <CardTitle>Spec Conformance Distribution</CardTitle>
        <CardDescription>
          Tracking client progress toward 100% MCP spec conformance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval="preserveStartEnd"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              {Object.entries(chartConfig).map(([key, config]) => (
                <linearGradient
                  key={key}
                  id={`gradient-${key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={config.color} stopOpacity={0.5} />
                  <stop offset="95%" stopColor={config.color} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <Area
              dataKey="minimal"
              fill="url(#gradient-minimal)"
              fillOpacity={0.4}
              stroke="var(--color-minimal)"
              stackId="a"
              strokeWidth={0.8}
            />
            <Area
              dataKey="low"
              fill="url(#gradient-low)"
              fillOpacity={0.4}
              stroke="var(--color-low)"
              stackId="a"
              strokeWidth={0.8}
            />
            <Area
              dataKey="medium"
              fill="url(#gradient-medium)"
              fillOpacity={0.4}
              stroke="var(--color-medium)"
              stackId="a"
              strokeWidth={0.8}
            />
            <Area
              dataKey="high"
              fill="url(#gradient-high)"
              fillOpacity={0.4}
              stroke="var(--color-high)"
              stackId="a"
              strokeWidth={0.8}
            />
            <Area
              dataKey="complete"
              fill="url(#gradient-complete)"
              fillOpacity={0.4}
              stroke="var(--color-complete)"
              stackId="a"
              strokeWidth={0.8}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
