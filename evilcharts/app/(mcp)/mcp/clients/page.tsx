"use client";

import React, { useState, useMemo } from "react";
import { GenerateBreadcrumb } from "@/components/ui/generate-breadcrumb";
import {
  DocsContainer,
  DocsDescription,
  DocsTitle,
} from "@/components/docs/components/docs-typography";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMCPData } from "@/hooks/use-mcp-data";
import { ExternalLink, ArrowUpDown } from "lucide-react";

type SortField = "name" | "resources" | "prompts" | "tools" | "sampling" | "roots";
type SortDirection = "asc" | "desc";

const Page = () => {
  const { data, loading } = useMCPData();
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const latestClients = useMemo(() => {
    if (!data || data.snapshots.length === 0) return [];
    const latest = data.snapshots[data.snapshots.length - 1];
    return latest.clients;
  }, [data]);

  const sortedClients = useMemo(() => {
    if (!latestClients.length) return [];

    return [...latestClients].sort((a, b) => {
      let aValue: string | boolean;
      let bValue: string | boolean;

      if (sortField === "name") {
        aValue = a.name;
        bValue = b.name;
      } else {
        const featureMap: Record<string, keyof typeof a.features> = {
          resources: "Resources",
          prompts: "Prompts",
          tools: "Tools",
          sampling: "Sampling",
          roots: "Roots",
        };
        aValue = a.features[featureMap[sortField]];
        bValue = b.features[featureMap[sortField]];
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "boolean" && typeof bValue === "boolean") {
        const aNum = aValue ? 1 : 0;
        const bNum = bValue ? 1 : 0;
        return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
      }

      return 0;
    });
  }, [latestClients, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  if (loading) {
    return (
      <div className="page">
        <GenerateBreadcrumb />
        <DocsContainer>
          <DocsTitle title="MCP Clients" />
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
        <DocsTitle title="MCP Client Implementations" />
        <DocsDescription>
          Complete list of {sortedClients.length} MCP client implementations tracked as of{" "}
          {data.snapshots[data.snapshots.length - 1]?.date}. Click column headers to sort.
        </DocsDescription>
      </DocsContainer>

      <div className="mt-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead
                className="cursor-pointer select-none hover:text-primary transition-colors"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center gap-2">
                  Client Name
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none hover:text-primary transition-colors text-center"
                onClick={() => handleSort("resources")}
              >
                <div className="flex items-center justify-center gap-2">
                  Resources
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none hover:text-primary transition-colors text-center"
                onClick={() => handleSort("prompts")}
              >
                <div className="flex items-center justify-center gap-2">
                  Prompts
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none hover:text-primary transition-colors text-center"
                onClick={() => handleSort("tools")}
              >
                <div className="flex items-center justify-center gap-2">
                  Tools
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none hover:text-primary transition-colors text-center"
                onClick={() => handleSort("sampling")}
              >
                <div className="flex items-center justify-center gap-2">
                  Sampling
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none hover:text-primary transition-colors text-center"
                onClick={() => handleSort("roots")}
              >
                <div className="flex items-center justify-center gap-2">
                  Roots
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedClients.map((client) => {
              const iconSlug = client.name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
              const githubUrl = `https://github.com/search?q=${encodeURIComponent(client.name + " MCP")}&type=repositories`;

              return (
                <TableRow
                  key={client.name}
                  className="cursor-pointer group"
                  onClick={() => window.open(githubUrl, '_blank')}
                >
                  <TableCell>
                    <div className="w-8 h-8 bg-background rounded border p-1">
                      <img
                        src={`/icons/${iconSlug}.png`}
                        alt={client.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const svgSrc = `/icons/${iconSlug}.svg`;
                          if (e.currentTarget.src !== svgSrc) {
                            e.currentTarget.src = svgSrc;
                          } else {
                            e.currentTarget.style.display = 'none';
                          }
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium group-hover:text-primary transition-colors">
                    {client.name}
                  </TableCell>
                  <TableCell className="text-center">
                    {client.features.Resources ? "✅" : "❌"}
                  </TableCell>
                  <TableCell className="text-center">
                    {client.features.Prompts ? "✅" : "❌"}
                  </TableCell>
                  <TableCell className="text-center">
                    {client.features.Tools ? "✅" : "❌"}
                  </TableCell>
                  <TableCell className="text-center">
                    {client.features.Sampling ? "✅" : "❌"}
                  </TableCell>
                  <TableCell className="text-center">
                    {client.features.Roots ? "✅" : "❌"}
                  </TableCell>
                  <TableCell>
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
