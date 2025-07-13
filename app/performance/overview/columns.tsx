"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Performance = {
  id: string;
  player: string;
  rank: string;
  speaking: string;
};

export const columns: ColumnDef<Performance>[] = [
  {
    accessorKey: "player",
    header: "Player",
  },
  {
    accessorKey: "rank",
    header: "Rank",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.rank}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "speaking",
    header: "Speaking",
  },
  {
    accessorKey: "interaction",
    header: "Interaction",
  },
  {
    accessorKey: "helping",
    header: "Helping",
  },
  {
    accessorKey: "attendance",
    header: "Attendace",
  },
];
