import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Users } from "lucide-react";
import Panel from "../common/commonFunction";

type StudentChartData = {
  name: string;
  total: number;
  present: number;
};
type StudentChartProps = {
  studentChartData: StudentChartData[];
};
function StudentOverview({ studentChartData }: StudentChartProps) {
  return (
    <div className="2xl:col-span-5">
      <Panel title="Student Overview" icon={Users}>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={studentChartData}
              margin={{ top: 4, right: 0, left: -22, bottom: 0 }}
              barGap={3}
            >
              <CartesianGrid
                stroke="#e8eef6"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: "#74839a" }}
                axisLine={false}
                tickLine={false}
                interval={0}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#74839a" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey="total"
                name="Total"
                fill="#3988f5"
                radius={[3, 3, 0, 0]}
                maxBarSize={12}
              />
              <Bar
                dataKey="present"
                name="Present"
                fill="#2fbd8b"
                radius={[3, 3, 0, 0]}
                maxBarSize={12}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-1 flex items-center justify-center gap-5 text-[11px] text-slate-500">
          <span>
            <i className="mr-1.5 inline-block h-2 w-2 rounded-full bg-blue-500" />
            Total
          </span>
          <span>
            <i className="mr-1.5 inline-block h-2 w-2 rounded-full bg-emerald-500" />
            Present
          </span>
        </div>
      </Panel>
    </div>
  );
}

export default StudentOverview;
