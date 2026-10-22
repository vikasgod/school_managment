import React from "react";
import Panel from "../common/commonFunction";   
import { Wallet } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type FeeCollectionProps = {
  month: string;
  amount: number;
};
function FeeCollection({ feeData }: { feeData: FeeCollectionProps[] }) {
  return (
    <Panel title="Fee Collection" icon={Wallet}>
      <div className="flex items-center gap-3">
        <div className="h-[140px] min-w-0 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={feeData}
              margin={{ top: 8, right: 3, left: -25, bottom: 0 }}
            >
              <defs>
                <linearGradient id="feeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22b987" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#22b987" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke="#edf2f7"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 9, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}L`}
              />
              <Tooltip
                formatter={(value) => [
                  `₹${Number(value).toFixed(2)} lakh`,
                  "Collected",
                ]}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#20b486"
                strokeWidth={2}
                fill="url(#feeGradient)"
                activeDot={{ r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="w-[112px] shrink-0 rounded-xl bg-emerald-50/70 p-3">
          <p className="text-[10px] text-slate-500">This month</p>
          <p className="mt-1 text-sm font-extrabold text-slate-800">
            ₹3,42,500
          </p>
          <p className="mt-3 text-[10px] text-slate-500">Last month</p>
          <p className="mt-1 text-xs font-bold text-slate-700">₹3,05,200</p>
          <p className="mt-2 text-xs font-bold text-emerald-600">↑ 12%</p>
        </div>
      </div>
    </Panel>
  );
}

export default FeeCollection;
