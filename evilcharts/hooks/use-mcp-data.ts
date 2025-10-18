"use client";

import { useEffect, useState } from "react";

export interface ClientFeatures {
  Resources: boolean;
  Prompts: boolean;
  Tools: boolean;
  Sampling: boolean;
  Roots: boolean;
}

export interface Client {
  name: string;
  features: ClientFeatures;
  notes?: string;
}

export interface Snapshot {
  date: string;
  clients: Client[];
}

export interface SnapshotsData {
  snapshots: Snapshot[];
}

export function useMCPData() {
  const [data, setData] = useState<SnapshotsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("/snapshots.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
