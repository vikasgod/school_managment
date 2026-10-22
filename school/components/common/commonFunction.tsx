import { ArrowRight } from "lucide-react";

export default function Panel({ title, icon: Icon, children, action }: {
  title: string; icon: React.ElementType; children: React.ReactNode; action?: string;
}) {
  return (
    <section className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-soft sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600"><Icon size={17} /></span>
          <h2 className="truncate text-sm font-bold text-slate-800">{title}</h2>
        </div>
        {action && <button className="shrink-0 text-xs font-semibold text-blue-600 hover:text-blue-800">{action} <ArrowRight className="ml-1 inline" size={13}/></button>}
      </div>
      {children}
    </section>
  );
}