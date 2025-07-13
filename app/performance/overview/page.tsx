"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns as behavioralColumns, Behavioral } from "./columns-behavioral";
import {
  columns as performanceColumns,
  Performance,
} from "./columns-performance";
import { DataTable } from "./data-table";
import behavioralData from "./dataBehavioral.json";
import performanceData from "./dataPerformance.json";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function PerformanceOverview() {
  const [behavioral, setBehavioral] = useState<Behavioral[]>([]);
  const [performance, setPerformance] = useState<Performance[]>([]);
  const [tab, setTab] = useState("behavioral");

  useEffect(() => {
    setBehavioral(behavioralData as Behavioral[]);
    setPerformance(performanceData as Performance[]);
  }, []);

  return (
    <Tabs
      defaultValue="behavioral"
      value={tab}
      onValueChange={setTab}
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select defaultValue="behavioral">
          <SelectTrigger
            className="flex w-fit @4xl/main:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="behavioral">Comportamental</SelectItem>
            <SelectItem value="performance">Performance</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="behavioral">Comportamental</TabsTrigger>
          <TabsTrigger value="performance"> Performance</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent
        value="behavioral"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg border">
          <DataTable columns={behavioralColumns} data={behavioral} />
        </div>
      </TabsContent>
      <TabsContent
        value="performance"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg border">
          <DataTable columns={performanceColumns} data={performance} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
