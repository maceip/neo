"use client";

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Line, LineChart, Area, AreaChart } from "recharts";
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

interface GrowthData {
  month: string;
  clients: number;
  date: string;
}

const chartConfig = {
  clients: {
    label: "Total Clients",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

function transformData(snapshots: Snapshot[]): GrowthData[] {
  return snapshots.map((snapshot) => {
    const date = new Date(snapshot.date);
    return {
      date: snapshot.date,
      month: date.toLocaleDateString("en-US", { month: "short" }),
      clients: snapshot.clients.length,
    };
  });
}

export function DefaultBarGrowthChart({ snapshots }: { snapshots: Snapshot[] }) {
  const data = useMemo(() => transformData(snapshots), [snapshots]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Default Bar Chart</CardTitle>
        <CardDescription>Client growth over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="clients" fill="var(--color-clients)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function GlowingBarGrowthChart({ snapshots }: { snapshots: Snapshot[] }) {
  const data = useMemo(() => transformData(snapshots), [snapshots]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Glowing Bar Chart</CardTitle>
        <CardDescription>With glow effect</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="clients" fill="var(--color-clients)" radius={8} filter="url(#bar-glow)" />
            <defs>
              <filter id="bar-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function GlowingLineGrowthChart({ snapshots }: { snapshots: Snapshot[] }) {
  const data = useMemo(() => transformData(snapshots), [snapshots]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Glowing Line Chart</CardTitle>
        <CardDescription>Smooth growth trajectory</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey="clients"
              type="monotone"
              stroke="var(--color-clients)"
              strokeWidth={2}
              dot={false}
              filter="url(#line-glow)"
            />
            <defs>
              <filter id="line-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function GradientAreaGrowthChart({ snapshots }: { snapshots: Snapshot[] }) {
  const data = useMemo(() => transformData(snapshots), [snapshots]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gradient Area Chart</CardTitle>
        <CardDescription>Filled growth area</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <defs>
              <linearGradient id="gradient-clients" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-clients)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-clients)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="clients"
              type="monotone"
              fill="url(#gradient-clients)"
              fillOpacity={0.4}
              stroke="var(--color-clients)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
