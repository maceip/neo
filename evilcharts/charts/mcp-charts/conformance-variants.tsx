"use client";

import { Bar, BarChart, Line, LineChart, CartesianGrid, XAxis, YAxis, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";
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

function transformConformanceData(snapshots: Snapshot[]) {
  return snapshots.map((snapshot) => {
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
}

export function ConformanceStackedBarChart({ snapshots }: { snapshots: Snapshot[] }) {
  const data = useMemo(() => transformConformanceData(snapshots), [snapshots]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conformance Bar Chart</CardTitle>
        <CardDescription>Stacked distribution of spec conformance levels</CardDescription>
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
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="minimal" fill="var(--color-minimal)" stackId="a" radius={[0, 0, 4, 4]} />
            <Bar dataKey="low" fill="var(--color-low)" stackId="a" />
            <Bar dataKey="medium" fill="var(--color-medium)" stackId="a" />
            <Bar dataKey="high" fill="var(--color-high)" stackId="a" />
            <Bar dataKey="complete" fill="var(--color-complete)" stackId="a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function ConformanceLineChart({ snapshots }: { snapshots: Snapshot[] }) {
  const data = useMemo(() => transformConformanceData(snapshots), [snapshots]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conformance Line Chart</CardTitle>
        <CardDescription>Trends in spec conformance over time</CardDescription>
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
              interval="preserveStartEnd"
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="complete"
              type="monotone"
              stroke="var(--color-complete)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="high"
              type="monotone"
              stroke="var(--color-high)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="medium"
              type="monotone"
              stroke="var(--color-medium)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="low"
              type="monotone"
              stroke="var(--color-low)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="minimal"
              type="monotone"
              stroke="var(--color-minimal)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function ConformanceRadarSnapshot({ snapshots }: { snapshots: Snapshot[] }) {
  const latestSnapshot = useMemo(() => {
    if (snapshots.length === 0) return null;
    const snapshot = snapshots[snapshots.length - 1];
    const conformanceCounts = { complete: 0, high: 0, medium: 0, low: 0, minimal: 0 };

    snapshot.clients.forEach((client) => {
      const features = Object.values(client.features).filter(Boolean).length;
      if (features === 5) conformanceCounts.complete++;
      else if (features === 4) conformanceCounts.high++;
      else if (features === 3) conformanceCounts.medium++;
      else if (features === 2) conformanceCounts.low++;
      else if (features === 1) conformanceCounts.minimal++;
    });

    return [
      { level: "100% Complete", count: conformanceCounts.complete },
      { level: "80% High", count: conformanceCounts.high },
      { level: "60% Medium", count: conformanceCounts.medium },
      { level: "40% Low", count: conformanceCounts.low },
      { level: "20% Minimal", count: conformanceCounts.minimal },
    ];
  }, [snapshots]);

  if (!latestSnapshot) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Conformance Radar</CardTitle>
        <CardDescription>Latest snapshot of conformance distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <RadarChart data={latestSnapshot}>
            <PolarGrid strokeDasharray="3 3" />
            <PolarAngleAxis dataKey="level" />
            <PolarRadiusAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Radar
              dataKey="count"
              fill="var(--chart-1)"
              fillOpacity={0.6}
              stroke="var(--chart-1)"
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
