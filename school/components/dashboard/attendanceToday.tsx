import React from "react";
import Panel from "../common/commonFunction";
import { ArrowRight, ClipboardCheck, Sparkles } from "lucide-react";
import { Cell, Pie, ResponsiveContainer, Tooltip, PieChart } from "recharts";

type attendanceTodayProps = {
  name: string;
  value: number;
  color: string;
};
function AttendanceToday({
  attendanceData,
}: {
  attendanceData: attendanceTodayProps[];
}) {
  return (
    <div className="2xl:col-span-3">
      <Panel title="Attendance Today" icon={ClipboardCheck}>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-around 2xl:flex-col">
          <div className="relative h-[170px] w-[170px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={3}
                  stroke="none"
                >
                  {attendanceData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-extrabold text-slate-800">
                92%
              </span>
              <span className="mt-0.5 text-[9px] text-slate-400">
                Overall Attendance
              </span>
            </div>
          </div>
          <div className="w-full space-y-3 sm:max-w-[145px] 2xl:max-w-none">
            {attendanceData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: item.color }}
                />
                <span className="flex-1 text-slate-500">{item.name}</span>
                <strong className="text-slate-700">{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-blue-50 p-3 text-xs text-blue-700">
          <p className="font-semibold">
            <Sparkles size={14} className="mr-1.5 inline" />
            Class 5 has the lowest attendance (86%)
          </p>
          <button className="mt-2 font-semibold hover:underline">
            View details <ArrowRight className="ml-1 inline" size={12} />
          </button>
        </div>
      </Panel>
    </div>
  );
}

export default AttendanceToday;
