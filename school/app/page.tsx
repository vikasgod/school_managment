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

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [expandedNav, setExpandedNav] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("Class 1");
  const [studentPhone, setStudentPhone] = useState("");
  const [notice, setNotice] = useState("");
  const [students, setStudents] = useState(["Rahul Sharma", "Riya Patel"]);
  const filteredActivities = useMemo(
    () => activities.filter((item) => `${item.title} ${item.detail}`.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  function addStudent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!studentName.trim() || !studentPhone.trim()) return;
    setStudents((old) => [studentName.trim(), ...old]);
    setNotice(`${studentName.trim()} added to this demo dashboard. Connect MongoDB API to save permanently.`);
    setStudentName("");
    setStudentPhone("");
    setStudentClass("Class 1");
    setShowStudentForm(false);
    window.setTimeout(() => setNotice(""), 5000);
  }

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
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#14243b] text-sm font-bold text-white">V</span>
              <span className="hidden text-left sm:block"><span className="block text-xs font-bold text-slate-800">Vikas</span><span className="mt-0.5 block text-[11px] text-slate-500">Admin</span></span>
              <ChevronDown size={15} className="hidden text-slate-400 sm:block"/>
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2"><h1 className="text-2xl font-extrabold tracking-tight text-slate-800 sm:text-[28px]">Good morning, Vikas!</h1><span className="text-2xl">👋</span></div>
              <p className="mt-1.5 text-sm text-slate-500">Here&apos;s what&apos;s happening at your school today.</p>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-600 shadow-sm"><CalendarDays size={16} className="text-slate-500"/> Tue, 21 Oct 2026</div>
          </div>

          {notice && <div className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800"><Check size={17} className="mt-0.5 shrink-0"/>{notice}</div>}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
            <StatCard title="Total Students" value="642" note="vs. last month" icon={Users} tone="blue" change="5%"/>
            <StatCard title="Total Staff" value="48" note="vs. last month" icon={BriefcaseBusiness} tone="green" change="2%"/>
            <StatCard title="Classes" value="12" note="Active classes" icon={School} tone="purple"/>
            <StatCard title="Fee Collected (This Month)" value="₹3,42,500" note="vs. last month" icon={Wallet} tone="amber" change="12%"/>
          </div>

          <div className="grid grid-cols-1 gap-4 2xl:grid-cols-12">
            <div className="2xl:col-span-5">
              <Panel title="Student Overview" icon={Users}>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={studentChartData} margin={{ top: 4, right: 0, left: -22, bottom: 0 }} barGap={3}>
                      <CartesianGrid stroke="#e8eef6" strokeDasharray="3 3" vertical={false}/>
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#74839a" }} axisLine={false} tickLine={false} interval={0}/>
                      <YAxis tick={{ fontSize: 10, fill: "#74839a" }} axisLine={false} tickLine={false}/>
                      <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}/>
                      <Bar dataKey="total" name="Total" fill="#3988f5" radius={[3,3,0,0]} maxBarSize={12}/>
                      <Bar dataKey="present" name="Present" fill="#2fbd8b" radius={[3,3,0,0]} maxBarSize={12}/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-1 flex items-center justify-center gap-5 text-[11px] text-slate-500"><span><i className="mr-1.5 inline-block h-2 w-2 rounded-full bg-blue-500"/>Total</span><span><i className="mr-1.5 inline-block h-2 w-2 rounded-full bg-emerald-500"/>Present</span></div>
              </Panel>
            </div>

            <div className="2xl:col-span-3">
              <Panel title="Attendance Today" icon={ClipboardCheck}>
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-around 2xl:flex-col">
                  <div className="relative h-[170px] w-[170px] shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart><Pie data={attendanceData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={3} stroke="none">{attendanceData.map((entry) => <Cell key={entry.name} fill={entry.color}/>)}</Pie><Tooltip/></PieChart>
                    </ResponsiveContainer>
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><span className="text-2xl font-extrabold text-slate-800">92%</span><span className="mt-0.5 text-[9px] text-slate-400">Overall Attendance</span></div>
                  </div>
                  <div className="w-full space-y-3 sm:max-w-[145px] 2xl:max-w-none">
                    {attendanceData.map((item) => <div key={item.name} className="flex items-center gap-2 text-xs"><span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }}/><span className="flex-1 text-slate-500">{item.name}</span><strong className="text-slate-700">{item.value}</strong></div>)}
                  </div>
                </div>
                <div className="mt-4 rounded-xl bg-blue-50 p-3 text-xs text-blue-700"><p className="font-semibold"><Sparkles size={14} className="mr-1.5 inline"/>Class 5 has the lowest attendance (86%)</p><button className="mt-2 font-semibold hover:underline">View details <ArrowRight className="ml-1 inline" size={12}/></button></div>
              </Panel>
            </div>

            <div className="2xl:col-span-4">
              <Panel title="Upcoming Events" icon={CalendarDays} action="View all">
                <div className="divide-y divide-slate-100">
                  {events.map((event) => <div key={event.day} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <div className="grid h-11 w-11 shrink-0 content-center rounded-xl bg-slate-50 text-center"><span className="text-sm font-extrabold text-slate-700">{event.day}</span><span className="text-[9px] font-bold tracking-wide text-slate-400">{event.month}</span></div>
                    <div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-slate-700">{event.title}</p><p className="mt-1 text-[10px] text-slate-400">{event.time}</p></div>
                    <span className={cx("hidden shrink-0 rounded-md px-2 py-1 text-[9px] font-bold sm:inline-block",
                      event.color === "blue" ? "bg-blue-50 text-blue-600" :
                      event.color === "amber" ? "bg-amber-50 text-amber-700" :
                      event.color === "green" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-600")}>{event.tag}</span>
                  </div>)}
                </div>
              </Panel>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
            <div className="space-y-4 xl:col-span-4">
              <Panel title="Quick Actions" icon={Activity}>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
                  {[
                    { label: "Add Student", icon: Users, tone: "blue", action: () => setShowStudentForm(true) },
                    { label: "Add Staff", icon: UserCog, tone: "green", action: () => setNotice("Staff form is the next module to implement.") },
                    { label: "Mark Attendance", icon: CalendarCheck, tone: "purple", action: () => setNotice("Attendance module is the next module to implement.") },
                    { label: "Create Fee Invoice", icon: CreditCard, tone: "amber", action: () => setNotice("Fee invoice module is the next module to implement.") },
                    { label: "Add Exam", icon: ClipboardList, tone: "rose", action: () => setNotice("Examinations module is the next module to implement.") },
                    { label: "Generate Report", icon: FileBarChart, tone: "cyan", action: () => setNotice("Reports module is the next module to implement.") },
                  ].map((item) => { const Icon = item.icon; return <button key={item.label} onClick={item.action} className="group flex min-h-[98px] flex-col items-center justify-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/50 px-2 py-3 text-center transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-md"><span className={cx("grid h-10 w-10 place-items-center rounded-2xl",
                    item.tone === "blue" ? "bg-blue-100 text-blue-600" :
                    item.tone === "green" ? "bg-emerald-100 text-emerald-600" :
                    item.tone === "purple" ? "bg-violet-100 text-violet-600" :
                    item.tone === "amber" ? "bg-amber-100 text-amber-600" :
                    item.tone === "rose" ? "bg-rose-100 text-rose-600" : "bg-cyan-100 text-cyan-600")}><Icon size={19}/></span><span className="text-[11px] font-semibold text-slate-700">{item.label}</span></button>; })}
                </div>
              </Panel>

              <Panel title="Fee Collection" icon={Wallet}>
                <div className="flex items-center gap-3">
                  <div className="h-[140px] min-w-0 flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={feeData} margin={{ top: 8, right: 3, left: -25, bottom: 0 }}>
                        <defs><linearGradient id="feeGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22b987" stopOpacity={0.25}/><stop offset="95%" stopColor="#22b987" stopOpacity={0.02}/></linearGradient></defs>
                        <CartesianGrid stroke="#edf2f7" strokeDasharray="3 3" vertical={false}/>
                        <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false}/>
                        <YAxis tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}L`}/>
                        <Tooltip formatter={(value) => [`₹${Number(value).toFixed(2)} lakh`, "Collected"]}/>
                        <Area type="monotone" dataKey="amount" stroke="#20b486" strokeWidth={2} fill="url(#feeGradient)" activeDot={{ r: 4 }}/>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-[112px] shrink-0 rounded-xl bg-emerald-50/70 p-3"><p className="text-[10px] text-slate-500">This month</p><p className="mt-1 text-sm font-extrabold text-slate-800">₹3,42,500</p><p className="mt-3 text-[10px] text-slate-500">Last month</p><p className="mt-1 text-xs font-bold text-slate-700">₹3,05,200</p><p className="mt-2 text-xs font-bold text-emerald-600">↑ 12%</p></div>
                </div>
              </Panel>
            </div>

            <div className="xl:col-span-4">
              <Panel title="Recent Activities" icon={Clock3} action="View all">
                <div className="divide-y divide-slate-100">
                  {filteredActivities.map((item) => { const Icon = item.icon; return <div key={item.title} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"><span className={cx("grid h-9 w-9 shrink-0 place-items-center rounded-xl",
                    item.tone === "green" ? "bg-emerald-50 text-emerald-600" :
                    item.tone === "amber" ? "bg-amber-50 text-amber-600" :
                    item.tone === "blue" ? "bg-blue-50 text-blue-600" :
                    item.tone === "purple" ? "bg-violet-50 text-violet-600" : "bg-rose-50 text-rose-600")}><Icon size={17}/></span><div className="min-w-0 pt-0.5"><p className="text-xs font-semibold leading-5 text-slate-700">{item.title}</p><p className="mt-0.5 text-[10px] text-slate-400">{item.detail}</p></div></div>; })}
                  {filteredActivities.length === 0 && <p className="py-8 text-center text-sm text-slate-400">No matching activities.</p>}
                </div>
              </Panel>
            </div>

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

          <footer className="flex flex-col justify-between gap-2 pb-2 pt-1 text-[11px] text-slate-400 sm:flex-row"><span>© 2026 Bright Future School ERP</span><span>Built for better school management</span></footer>
        </div>
      </main>

      {showStudentForm && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
          <div className="mb-5 flex items-center justify-between"><div><h2 className="text-lg font-extrabold text-slate-800">Add Student</h2><p className="mt-1 text-xs text-slate-500">Quick demo form</p></div><button onClick={() => setShowStudentForm(false)} className="grid h-9 w-9 place-items-center rounded-xl hover:bg-slate-100" aria-label="Close form"><X size={18}/></button></div>
          <form onSubmit={addStudent} className="space-y-4">
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Student full name</span><input required value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="e.g. Rahul Sharma" className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50"/></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Class</span><select value={studentClass} onChange={(e) => setStudentClass(e.target.value)} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-400">{["Nursery","LKG","UKG",...Array.from({length:10},(_,i)=>`Class ${i+1}`)].map((c)=><option key={c}>{c}</option>)}</select></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Parent phone</span><input required value={studentPhone} onChange={(e) => setStudentPhone(e.target.value)} type="tel" minLength={10} placeholder="10-digit mobile number" className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50"/></label>
            <div className="flex justify-end gap-2 pt-2"><button type="button" onClick={() => setShowStudentForm(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600">Cancel</button><button type="submit" className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700"><Plus className="mr-1 inline" size={15}/> Add student</button></div>
            <p className="text-[11px] leading-5 text-amber-700">This form currently updates the browser demo only. Use the API below for permanent MongoDB storage.</p>
          </form>
        </div>
      </div>}
    </div>
  );
}
