import {
  Activity,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  FileBarChart,
  UserCog,
  Users,
  Plus,
  X,
} from "lucide-react";
import React, { useState } from "react";
import Panel from "../common/commonFunction";

type StudentFormData = {
  studentName: string;
  studentClass: string;
  studentPhone: string;
};
function QuickAction() {
  const initialStudentData: StudentFormData = {
    studentName: "",
    studentClass: "Nursery",
    studentPhone: "",
  };
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [studentData, setStudentData] =
    useState<StudentFormData>(initialStudentData);

  const addStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Student Data:", studentData);

    // API call yahan kar sakte ho

    setStudentData(initialStudentData);

    setShowStudentForm(false);
  };
  return (
    <>
      <Panel title="Quick Actions" icon={Activity}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
          {[
            {
              label: "Add Student",
              icon: Users,
              tone: "blue",
              action: () => setShowStudentForm(true),
            },
            {
              label: "Add Staff",
              icon: UserCog,
              tone: "green",
              action: () =>
                setNotice("Staff form is the next module to implement."),
            },
            {
              label: "Mark Attendance",
              icon: CalendarCheck,
              tone: "purple",
              action: () =>
                setNotice("Attendance module is the next module to implement."),
            },
            {
              label: "Create Fee Invoice",
              icon: CreditCard,
              tone: "amber",
              action: () =>
                setNotice(
                  "Fee invoice module is the next module to implement.",
                ),
            },
            {
              label: "Add Exam",
              icon: ClipboardList,
              tone: "rose",
              action: () =>
                setNotice(
                  "Examinations module is the next module to implement.",
                ),
            },
            {
              label: "Generate Report",
              icon: FileBarChart,
              tone: "cyan",
              action: () =>
                setNotice("Reports module is the next module to implement."),
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={item.action}
                className="group flex min-h-[98px] flex-col items-center justify-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/50 px-2 py-3 text-center transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-md"
              >
                <span
                  className={`grid h-10 w-10 place-items-center rounded-2xl ${
                    item.tone === "blue"
                      ? "bg-blue-100 text-blue-600"
                      : item.tone === "green"
                        ? "bg-emerald-100 text-emerald-600"
                        : item.tone === "purple"
                          ? "bg-violet-100 text-violet-600"
                          : item.tone === "amber"
                            ? "bg-amber-100 text-amber-600"
                            : item.tone === "rose"
                              ? "bg-rose-100 text-rose-600"
                              : "bg-cyan-100 text-cyan-600"
                  }`}
                >
                  <Icon size={19} />
                </span>
                <span className="text-[11px] font-semibold text-slate-700">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </Panel>
      {showStudentForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-slate-800">
                  Add Student
                </h2>
                <p className="mt-1 text-xs text-slate-500">Quick demo form</p>
              </div>
              <button
                onClick={() => setShowStudentForm(false)}
                className="grid h-9 w-9 place-items-center rounded-xl hover:bg-slate-100"
                aria-label="Close form"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={addStudent} className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-slate-600">
                  Student full name
                </span>
                <input
                  required
                  value={studentData.studentName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStudentData((prev) => ({
                      ...prev,
                      studentName: e.target.value,
                    }))
                  }
                  placeholder="Student full name"
                  className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-slate-600">
                  Class
                </span>
                <select
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-400"
                  value={studentData.studentClass}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setStudentData((prev) => ({
                      ...prev,
                      studentClass: e.target.value,
                    }))
                  }
                >
                  {[
                    "Nursery",
                    "LKG",
                    "UKG",
                    ...Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`),
                  ].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-slate-600">
                  Parent phone
                </span>
                <input
                  required
                  type="tel"
                  value={studentData.studentPhone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStudentData((prev) => ({
                      ...prev,
                      studentPhone: e.target.value,
                    }))
                  }
                  minLength={10}
                  maxLength={10}
                  pattern="[0-9]{10}"
                  placeholder="10-digit mobile number"
                  className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                />
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowStudentForm(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
                >
                  <Plus className="mr-1 inline" size={15} /> Add student
                </button>
              </div>
              <p className="text-[11px] leading-5 text-amber-700">
                This form currently updates the browser demo only. Use the API
                below for permanent MongoDB storage.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default QuickAction;
