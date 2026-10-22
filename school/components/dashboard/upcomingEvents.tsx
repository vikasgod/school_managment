import { CalendarDays } from "lucide-react";
import React from "react";
import Panel from "../common/commonFunction";

type EventsPro = {
  day: string;
  month: string;
  title: string;
  time: string;
  tag: string;
  color: string;
};

type UpcomingEventsProps = {
  events: EventsPro[];
  cx: (...classes: string[]) => string;
};

function UpcomingEvents({ events, cx }: UpcomingEventsProps) {
  return (
    <div className="2xl:col-span-4">
      <Panel title="Upcoming Events" icon={CalendarDays} action="View all">
        <div className="divide-y divide-slate-100">
          {events.map((event) => (
            <div
              key={event.day}
              className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
            >
              <div className="grid h-11 w-11 shrink-0 content-center rounded-xl bg-slate-50 text-center">
                <span className="text-sm font-extrabold text-slate-700">
                  {event.day}
                </span>
                <span className="text-[9px] font-bold tracking-wide text-slate-400">
                  {event.month}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-slate-700">
                  {event.title}
                </p>
                <p className="mt-1 text-[10px] text-slate-400">{event.time}</p>
              </div>
              <span
                className={cx(
                  "hidden shrink-0 rounded-md px-2 py-1 text-[9px] font-bold sm:inline-block",
                  event.color === "blue"
                    ? "bg-blue-50 text-blue-600"
                    : event.color === "amber"
                      ? "bg-amber-50 text-amber-700"
                      : event.color === "green"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-rose-50 text-rose-600",
                )}
              >
                {event.tag}
              </span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

export default UpcomingEvents;
