"use client";

import { useMemo, useState } from "react";
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Bell, BookOpen,
  Bus, CalendarDays, Check, ChevronDown, ChevronRight, ClipboardCheck,
  Clock3, CreditCard, FileBarChart, FileText, GraduationCap, House,
  LibraryBig, Menu, MoreHorizontal, Plus, Search, Settings, ShieldCheck,
  Sparkles, UserCog, Users, Wallet, X, Building2, BriefcaseBusiness,
  ClipboardList, CalendarCheck, School, ChartNoAxesCombined
} from "lucide-react";

import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart
} from "recharts";
import AttendanceToday from "./attendanceToday";
import UpcomingEvents from "./UpcomingEvents"
import StudentOverview from "./studentOverview";
import QuickAction from "./quickAction";
import FeeCollection from "./feeCollection";
import RecentActivity from "./recentActivity";

type NavItem = { label: string; icon: React.ElementType; children?: string[] };

const navItems: NavItem[] = [
  { label: "Dashboard", icon: House },
  { label: "Student Management", icon: Users, children: ["All Students", "Add Student", "Admissions"] },
  { label: "Staff Management", icon: UserCog, children: ["All Staff", "Add Staff", "Payroll"] },
  { label: "Classes & Sections", icon: School, children: ["Classes", "Sections", "Subjects"] },
  { label: "Attendance", icon: ClipboardCheck, children: ["Student Attendance", "Staff Attendance"] },
  { label: "Examinations", icon: FileText, children: ["Exam Schedule", "Results", "Report Cards"] },
  { label: "Fee Management", icon: Wallet, children: ["Fee Structure", "Collect Fees", "Pending Fees"] },
  { label: "Library", icon: LibraryBig, children: ["Books", "Issue / Return"] },
  { label: "Transport", icon: Bus, children: ["Routes", "Vehicles"] },
  { label: "Hostel", icon: Building2, children: ["Rooms", "Allocations"] },
  { label: "Reports", icon: FileBarChart, children: ["Attendance Reports", "Fee Reports"] },
  { label: "Settings", icon: Settings, children: ["School Profile", "User Roles"] },
];

const classData = [
  { name: "Nursery", total: 45, present: 42, absent: 3 },
  { name: "LKG", total: 52, present: 47, absent: 5 },
  { name: "UKG", total: 48, present: 45, absent: 3 },
  { name: "Class 1", total: 60, present: 54, absent: 6 },
  { name: "Class 2", total: 58, present: 52, absent: 6 },
  { name: "Class 3", total: 55, present: 50, absent: 5 },
  { name: "Class 4", total: 52, present: 47, absent: 5 },
  { name: "Class 5", total: 50, present: 43, absent: 7 },
  { name: "Class 6", total: 48, present: 44, absent: 4 },
  { name: "Class 7", total: 46, present: 42, absent: 4 },
  { name: "Class 8", total: 44, present: 40, absent: 4 },
  { name: "Class 9", total: 42, present: 38, absent: 4 },
  { name: "Class 10", total: 40, present: 36, absent: 4 },
];

const studentChartData = classData.map((item) => ({
  name: item.name.replace("Class ", "C"),
  total: item.total,
  present: item.present,
}));
const attendanceData = [
  { name: "Present", value: 589, color: "#20b486" },
  { name: "Absent", value: 42, color: "#ffb020" },
  { name: "Leave", value: 11, color: "#ff5b65" },
];
const feeData = [
  { month: "Apr", amount: 1.0 }, { month: "May", amount: 1.6 },
  { month: "Jun", amount: 1.55 }, { month: "Jul", amount: 2.2 },
  { month: "Aug", amount: 2.0 }, { month: "Sep", amount: 2.7 },
  { month: "Oct", amount: 3.42 },
];
const events = [
  { day: "22", month: "OCT", title: "PTM (Parent Teacher Meeting)", time: "10:00 AM – 2:00 PM", tag: "School Event", color: "blue" },
  { day: "24", month: "OCT", title: "Unit Test – Class 5", time: "09:00 AM – 11:00 AM", tag: "Exam", color: "amber" },
  { day: "28", month: "OCT", title: "Sports Day Practice", time: "03:00 PM – 05:00 PM", tag: "Activity", color: "green" },
  { day: "31", month: "OCT", title: "Fee Payment Due", time: "Last date: 31 Oct 2026", tag: "Fee", color: "rose" },
];
const activities = [
  { icon: Users, tone: "green", title: "New student Rahul Sharma added", detail: "Class 4  ·  2 hours ago" },
  { icon: Wallet, tone: "amber", title: "Fee payment received (₹5,000)", detail: "Riya Patel  ·  4 hours ago" },
  { icon: ClipboardCheck, tone: "blue", title: "Attendance marked for Class 6", detail: "Today  ·  9:15 AM" },
  { icon: UserCog, tone: "purple", title: "New staff member joined", detail: "Mr. Amit Kumar (Teacher)  ·  5 hours ago" },
  { icon: FileText, tone: "rose", title: "Exam result published", detail: "Class 10 – Science  ·  6 hours ago" },
];

function cx(...classes: string[]) { return classes.filter(Boolean).join(" "); }

function Panel({ title, icon: Icon, children, action }: {
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

function StatCard({ title, value, note, icon: Icon, tone, change }: {
  title: string; value: string; note: string; icon: React.ElementType; tone: string; change?: string;
}) {
  const tones: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 ring-blue-100",
    green: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    purple: "bg-violet-50 text-violet-600 ring-violet-100",
    amber: "bg-amber-50 text-amber-600 ring-amber-100",
  };
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-soft sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-500 sm:text-sm">{title}</p>
          <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-800 sm:text-[28px]">{value}</p>
        </div>
        <span className={cx("grid h-11 w-11 shrink-0 place-items-center rounded-2xl ring-1", tones[tone])}><Icon size={21}/></span>
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs">
        {change && <span className="inline-flex items-center font-bold text-emerald-600"><ArrowUpRight size={15}/>{change}</span>}
        <span className="text-slate-400">{note}</span>
      </div>
    </div>
  );
}

export default function DashboardClient({ user }: { user: { name: string; email: string; role: string } }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [expandedNav, setExpandedNav] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const filteredActivities = useMemo(
    () => activities.filter((item) => `${item.title} ${item.detail}`.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <div className="min-h-screen">
      {sidebarOpen && <button aria-label="Close menu" className="fixed inset-0 z-30 bg-slate-950/45 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <aside className={cx(
        "fixed inset-y-0 left-0 z-40 flex w-[258px] flex-col bg-[#14243b] text-white transition-transform duration-200 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-[76px] items-center gap-3 border-b border-white/10 px-5">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-500"><GraduationCap size={28}/></div>
          <div><p className="text-sm font-extrabold tracking-wide">Bright Future School</p><p className="mt-1 text-[11px] text-slate-300">Learn&nbsp; • &nbsp;Grow&nbsp; • &nbsp;Succeed</p></div>
          <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar"><X size={19}/></button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeNav === item.label;
            const expanded = expandedNav === item.label;
            return <div key={item.label}>
              <button
                onClick={() => {
                  setActiveNav(item.label);
                  if (item.children) setExpandedNav(expanded ? null : item.label);
                  else { setExpandedNav(null); setSidebarOpen(false); }
                }}
                className={cx("flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-semibold transition",
                  active ? "bg-blue-500 text-white shadow-lg shadow-blue-950/25" : "text-slate-200 hover:bg-white/8 hover:bg-white/10")}
              >
                <Icon size={18} className={active ? "text-white" : "text-slate-300"}/>
                <span className="flex-1">{item.label}</span>
                {item.children && (expanded ? <ChevronDown size={15}/> : <ChevronRight size={15}/>)}
              </button>
              {item.children && expanded && <div className="ml-8 mt-1 space-y-1 border-l border-white/15 pl-3">
                {item.children.map((child) => <button key={child} onClick={() => { setActiveNav(child); setSidebarOpen(false); }} className={cx("block w-full rounded-lg px-2 py-2 text-left text-xs", activeNav === child ? "bg-white/10 text-white" : "text-slate-300 hover:text-white")}>{child}</button>)}
              </div>}
            </div>;
          })}
        </nav>
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10"><School size={19}/></div>
            <div><p className="text-xs font-semibold">Bright Future School</p><p className="mt-1 text-[10px] text-slate-400">ERP Dashboard · v1.0</p></div>
          </div>
        </div>
      </aside>

      <main className="min-h-screen lg:pl-[258px]">
        <header className="sticky top-0 z-20 flex h-[76px] items-center gap-3 border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <button aria-label="Open menu" onClick={() => setSidebarOpen(true)} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-600 lg:hidden"><Menu size={19}/></button>
          <div className="relative w-full max-w-[520px]">
            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students, staff, classes, or anything..." className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 text-sm outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"/>
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-5">
            <button aria-label="Notifications" className="relative grid h-10 w-10 place-items-center rounded-xl text-slate-500 hover:bg-slate-100"><Bell size={19}/><span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white">3</span></button>
            <button className="flex items-center gap-2.5 rounded-xl p-1.5 hover:bg-slate-50">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#14243b] text-sm font-bold text-white">{user.name.trim().charAt(0).toUpperCase()}</span>
              <span className="hidden text-left sm:block"><span className="block text-xs font-bold text-slate-800">{user.name}</span><span className="mt-0.5 block text-[11px] text-slate-500">{user.role.replaceAll("_", " ")}</span></span>
              <ChevronDown size={15} className="hidden text-slate-400 sm:block"/>
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2"><h1 className="text-2xl font-extrabold tracking-tight text-slate-800 sm:text-[28px]">Good morning, {user.name}!</h1><span className="text-2xl">👋</span></div>
              <p className="mt-1.5 text-sm text-slate-500">Here&apos;s what&apos;s happening at your school today.</p>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-600 shadow-sm"><CalendarDays size={16} className="text-slate-500"/> Tue, 21 Oct 2026</div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
            <StatCard title="Total Students" value="642" note="vs. last month" icon={Users} tone="blue" change="5%"/>
            <StatCard title="Total Staff" value="48" note="vs. last month" icon={BriefcaseBusiness} tone="green" change="2%"/>
            <StatCard title="Classes" value="12" note="Active classes" icon={School} tone="purple"/>
            <StatCard title="Fee Collected (This Month)" value="₹3,42,500" note="vs. last month" icon={Wallet} tone="amber" change="12%"/>
          </div>

          <div className="grid grid-cols-1 gap-4 2xl:grid-cols-12">
            <StudentOverview studentChartData={studentChartData} />
            <AttendanceToday attendanceData={attendanceData} />
 
            <UpcomingEvents events={events} cx={cx} />
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
            <div className="space-y-4 xl:col-span-4">
              <QuickAction />

              <FeeCollection feeData={feeData} />
            </div>

            <RecentActivity filteredActivities={filteredActivities} />

            <div className="xl:col-span-4">
              <Panel title="Class Wise Strength" icon={Users} action="View all">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[390px] border-collapse text-left text-[10px]">
                    <thead><tr className="bg-slate-50 text-slate-500"><th className="rounded-l-lg px-2 py-2.5 font-bold">Class</th><th className="px-2 py-2.5 font-bold">Total</th><th className="px-2 py-2.5 font-bold">Present</th><th className="px-2 py-2.5 font-bold">Absent</th><th className="rounded-r-lg px-2 py-2.5 font-bold">%</th></tr></thead>
                    <tbody>{classData.map((row) => <tr key={row.name} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"><td className="px-2 py-2 font-semibold text-slate-700">{row.name}</td><td className="px-2 py-2 text-slate-600">{row.total}</td><td className="px-2 py-2 text-slate-600">{row.present}</td><td className="px-2 py-2 text-slate-600">{row.absent}</td><td className="px-2 py-2 font-bold text-emerald-600">{Math.round(row.present / row.total * 100)}%</td></tr>)}</tbody>
                  </table>
                </div>
              </Panel>
            </div>
          </div>

          </div>
      </main>
    </div>
  );
}
