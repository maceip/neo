"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
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
  Resources: {
    label: "Resources",
    color: "var(--chart-1)",
  },
  Prompts: {
    label: "Prompts",
    color: "var(--chart-2)",
  },
  Tools: {
    label: "Tools",
    color: "var(--chart-3)",
  },
  Sampling: {
    label: "Sampling",
    color: "var(--chart-4)",
  },
  Roots: {
    label: "Roots",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function FeatureAdoptionChart() {
  const { data, loading } = useMCPData();

  const chartData = useMemo(() => {
    if (!data) return [];

    return data.snapshots.map((snapshot) => {
      const date = new Date(snapshot.date);
      const featureCounts = {
        Resources: 0,
        Prompts: 0,
        Tools: 0,
        Sampling: 0,
        Roots: 0,
      };

      snapshot.clients.forEach((client) => {
        Object.entries(client.features).forEach(([feature, supported]) => {
          if (supported) {
            featureCounts[feature as keyof typeof featureCounts]++;
          }
        });
      });

      // Convert to percentages
      const total = snapshot.clients.length;
      const percentages = Object.entries(featureCounts).reduce((acc, [key, count]) => {
        acc[key] = total > 0 ? Math.round((count / total) * 100) : 0;
        return acc;
      }, {} as Record<string, number>);

      return {
        date: snapshot.date,
        month: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        ...percentages,
      };
    });
  }, [data]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Feature Adoption Rate</CardTitle>
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
        <CardTitle>Feature Adoption Rate Over Time</CardTitle>
        <CardDescription>
          Percentage of clients supporting each MCP feature
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
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
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Line
              dataKey="Resources"
              type="monotone"
              stroke="var(--color-Resources)"
              dot={false}
              strokeWidth={2}
            />
            <Line
              dataKey="Prompts"
              type="monotone"
              stroke="var(--color-Prompts)"
              dot={false}
              strokeWidth={2}
            />
            <Line
              dataKey="Tools"
              type="monotone"
              stroke="var(--color-Tools)"
              dot={false}
              strokeWidth={2}
            />
            <Line
              dataKey="Sampling"
              type="monotone"
              stroke="var(--color-Sampling)"
              dot={false}
              strokeWidth={2}
            />
            <Line
              dataKey="Roots"
              type="monotone"
              stroke="var(--color-Roots)"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
