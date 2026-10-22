import React from "react";
import Panel from "../common/commonFunction";
import { Clock3 } from "lucide-react";

type Activity = {
  title: string;
  detail: string;
};

type RecentActivitiesProps = {
  filteredActivities: Activity[];
};

function RecentActivity({ filteredActivities }: RecentActivitiesProps) {
  return (
    <div className="xl:col-span-4">
      <Panel title="Recent Activities" icon={Clock3} action="View all">
        <div className="divide-y divide-slate-100">
          {filteredActivities.map((item: any) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
              >
                <span
                  className={`
                    grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                      item.tone === "green"
                        ? "bg-emerald-50 text-emerald-600"
                        : item.tone === "amber"
                          ? "bg-amber-50 text-amber-600"
                          : item.tone === "blue"
                            ? "bg-blue-50 text-blue-600"
                            : item.tone === "purple"
                              ? "bg-violet-50 text-violet-600"
                              : "bg-rose-50 text-rose-600"
                    }
                  `}
                >
                  <Icon size={17} />
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="text-xs font-semibold leading-5 text-slate-700">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-400">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
          {filteredActivities.length === 0 && (
            <p className="py-8 text-center text-sm text-slate-400">
              No matching activities.
            </p>
          )}
        </div>
      </Panel>
    </div>
  );
}

export default RecentActivity;
