import {
  BookBookmark,
  House2,
  BarChart,
  AreaChart,
  LineChart,
  PieChart,
  RadarChart,
} from "@/assets/svgs";
import { SidebarOptionsProps } from "@/types/docs/sidebar-types";
import { Database, FileJson, TableProperties } from "lucide-react";

export const SIDEBAR_OPTIONS: SidebarOptionsProps = {
  gettingStarted: [
    {
      title: "MCP Ecosystem",
      url: "/mcp",
      items: [
        {
          title: "Overview",
          url: "/mcp",
          icon: <House2 />,
        },
      ],
    },
  ],
  components: [
    {
      title: "Visualizations",
      url: "#",
      items: [
        {
          title: "Client Growth",
          url: "/mcp/client-growth",
          icon: <LineChart />,
        },
        {
          title: "Conformance",
          url: "/mcp/conformance",
          icon: <AreaChart />,
        },
        {
          title: "Adoption Rate",
          url: "/mcp/adoption-rate",
          icon: <BarChart />,
        },
        {
          title: "Feature Radar",
          url: "/mcp/feature-radar",
          icon: <RadarChart />,
        },
      ],
    },
    {
      title: "Data",
      url: "#",
      items: [
        {
          title: "Client List",
          url: "/mcp/clients",
          icon: <TableProperties size={16} />,
        },
        {
          title: "Raw Dataset",
          url: "#raw-dataset",
          icon: <FileJson size={16} />,
        },
      ],
    },
  ],
};
