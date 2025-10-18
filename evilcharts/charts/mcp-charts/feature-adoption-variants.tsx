"use client";

import { Bar, BarChart, Area, AreaChart, CartesianGrid, XAxis, YAxis, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";
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
import { Snapshot } from "@/hooks/use-mcp-data";
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

function transformFeatureData(snapshots: Snapshot[]) {
  return snapshots.map((snapshot) => {
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
}

export function FeatureAdoptionBarChart({ snapshots }: { snapshots: Snapshot[] }) {
  const data = useMemo(() => transformFeatureData(snapshots), [snapshots]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Adoption Bar Chart</CardTitle>
        <CardDescription>Adoption rates across all features</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
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
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="Resources" fill="var(--color-Resources)" radius={4} />
            <Bar dataKey="Prompts" fill="var(--color-Prompts)" radius={4} />
            <Bar dataKey="Tools" fill="var(--color-Tools)" radius={4} />
            <Bar dataKey="Sampling" fill="var(--color-Sampling)" radius={4} />
            <Bar dataKey="Roots" fill="var(--color-Roots)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function FeatureAdoptionAreaChart({ snapshots }: { snapshots: Snapshot[] }) {
  const data = useMemo(() => transformFeatureData(snapshots), [snapshots]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Adoption Area Chart</CardTitle>
        <CardDescription>Growth trends by feature</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart accessibilityLayer data={data}>
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
                  <stop offset="5%" stopColor={config.color} stopOpacity={0.6} />
                  <stop offset="95%" stopColor={config.color} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <Area
              dataKey="Resources"
              type="monotone"
              fill="url(#gradient-Resources)"
              fillOpacity={0.4}
              stroke="var(--color-Resources)"
              strokeWidth={2}
            />
            <Area
              dataKey="Prompts"
              type="monotone"
              fill="url(#gradient-Prompts)"
              fillOpacity={0.4}
              stroke="var(--color-Prompts)"
              strokeWidth={2}
            />
            <Area
              dataKey="Tools"
              type="monotone"
              fill="url(#gradient-Tools)"
              fillOpacity={0.4}
              stroke="var(--color-Tools)"
              strokeWidth={2}
            />
            <Area
              dataKey="Sampling"
              type="monotone"
              fill="url(#gradient-Sampling)"
              fillOpacity={0.4}
              stroke="var(--color-Sampling)"
              strokeWidth={2}
            />
            <Area
              dataKey="Roots"
              type="monotone"
              fill="url(#gradient-Roots)"
              fillOpacity={0.4}
              stroke="var(--color-Roots)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function FeatureAdoptionRadarSnapshot({ snapshots }: { snapshots: Snapshot[] }) {
  const latestSnapshot = useMemo(() => {
    if (snapshots.length === 0) return null;
    const snapshot = snapshots[snapshots.length - 1];
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

    const total = snapshot.clients.length;
    return Object.entries(featureCounts).map(([feature, count]) => ({
      feature,
      adoption: total > 0 ? Math.round((count / total) * 100) : 0,
    }));
  }, [snapshots]);

  if (!latestSnapshot) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Feature Adoption Radar</CardTitle>
        <CardDescription>Latest snapshot of feature adoption rates</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <RadarChart data={latestSnapshot}>
            <PolarGrid strokeDasharray="3 3" />
            <PolarAngleAxis dataKey="feature" />
            <PolarRadiusAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Radar
              dataKey="adoption"
              fill="var(--chart-2)"
              fillOpacity={0.6}
              stroke="var(--chart-2)"
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
