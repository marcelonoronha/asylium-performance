import { columns, Performance } from "./columns";
import { DataTable } from "./data-table";
import data from "./data.json";

async function getData(): Promise<Performance[]> {
  // Fetch data from your API here.
  return data;
}

export default async function PerformanceOverview() {
  const data = await getData();

  return <DataTable columns={columns} data={data} />;
}
