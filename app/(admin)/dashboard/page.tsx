import { BarChart1 } from "./components/BarChart";
import { ChartArea } from "./components/ChartArea";
import { LineChart1 } from "./components/LineChart";
import { ChartPie } from "./components/PieChart";

// app/dashboard/page.js
export default function Dashboard() {
    return (
      <div className="h-screen overflow-y-scroll scrollbar-hide p-4">
        <ChartArea />
        <div className="flex flex-wrap gap-4 justify-center md:justify-between">
          <ChartPie  />
          <LineChart1 />
          <BarChart1  />
        </div>
      </div>
    );
  }
  