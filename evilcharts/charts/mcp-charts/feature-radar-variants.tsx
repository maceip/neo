"use client";

import { Bar, BarChart, Line, LineChart, Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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

function getLatestAdoptionData(snapshots: Snapshot[]) {
  if (snapshots.length === 0) return null;

  const latestSnapshot = snapshots[snapshots.length - 1];
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

  return {
    data: Object.entries(featureCounts).map(([feature, count]) => ({
      feature,
      adoption: total > 0 ? Math.round((count / total) * 100) : 0,
      count,
    })),
    date: new Date(latestSnapshot.date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  };
}

export function FeatureRadarBarChart({ snapshots }: { snapshots: Snapshot[] }) {
  const result = useMemo(() => getLatestAdoptionData(snapshots), [snapshots]);

  if (!result) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Adoption Bar Chart</CardTitle>
        <CardDescription>Current snapshot as of {result.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={result.data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="feature"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="adoption"
              fill="#8884d8"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function FeatureRadarLineComparison({ snapshots }: { snapshots: Snapshot[] }) {
  const data = useMemo(() => {
    return snapshots.slice(-6).map((snapshot) => {
      const date = new Date(snapshot.date);
      const total = snapshot.clients.length;
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

      const percentages = Object.entries(featureCounts).reduce(
        (acc, [key, count]) => {
          acc[key] = total > 0 ? Math.round((count / total) * 100) : 0;
          return acc;
        },
        {} as Record<string, number>
      );

      return {
        date: snapshot.date,
        month: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        ...percentages,
      };
    });
  }, [snapshots]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Feature Trends</CardTitle>
        <CardDescription>Last 6 snapshots comparison</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="Resources"
              type="monotone"
              stroke="var(--color-Resources)"
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="Prompts"
              type="monotone"
              stroke="var(--color-Prompts)"
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="Tools"
              type="monotone"
              stroke="var(--color-Tools)"
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="Sampling"
              type="monotone"
              stroke="var(--color-Sampling)"
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="Roots"
              type="monotone"
              stroke="var(--color-Roots)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function FeatureRadarAreaChart({ snapshots }: { snapshots: Snapshot[] }) {
  const data = useMemo(() => {
    return snapshots.slice(-6).map((snapshot) => {
      const date = new Date(snapshot.date);
      const total = snapshot.clients.length;
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

      const percentages = Object.entries(featureCounts).reduce(
        (acc, [key, count]) => {
          acc[key] = total > 0 ? Math.round((count / total) * 100) : 0;
          return acc;
        },
        {} as Record<string, number>
      );

      return {
        date: snapshot.date,
        month: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        ...percentages,
      };
    });
  }, [snapshots]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Growth Area Chart</CardTitle>
        <CardDescription>Recent adoption trends with gradients</CardDescription>
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
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
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
