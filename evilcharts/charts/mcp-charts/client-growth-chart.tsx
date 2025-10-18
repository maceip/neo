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
  clients: {
    label: "Total Clients",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ClientGrowthChart() {
  const { data, loading } = useMCPData();

  const chartData = useMemo(() => {
    if (!data) return [];

    return data.snapshots.map((snapshot) => {
      const date = new Date(snapshot.date);
      return {
        date: snapshot.date,
        month: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        clients: snapshot.clients.length,
      };
    });
  }, [data]);


  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Client Growth</CardTitle>
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
        <CardTitle>MCP Client Growth</CardTitle>
        <CardDescription>
          November 2024 - October 2025 ({chartData.length} snapshots)
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
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="clients"
              type="monotone"
              stroke="var(--chart-1)"
              dot={false}
              strokeWidth={2}
              filter="url(#client-growth-glow)"
            />
            <defs>
              <filter
                id="client-growth-glow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
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
