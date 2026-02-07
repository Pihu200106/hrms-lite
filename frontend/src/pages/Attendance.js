import { useEffect, useState } from "react";
import { markAttendance, getAttendance, getEmployees } from "../services/api";

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  // ⭐ convert DB id → employee code
  const getEmployeeCode = (id) => {
    const emp = employees.find((e) => e.id === id);
    return emp ? emp.employee_id : id;
  };

  // ✅ mark attendance
  const mark = async (status) => {
    if (!employeeId) {
      alert("Select employee");
      return;
    }

    if (!date) {
      alert("Select date");
      return;
    }

    const payload = {
      employee_id: Number(employeeId),
      date,
      status,
    };

    const res = await markAttendance(payload);

    if (res.detail) {
      alert(res.detail);
      return;
    }

    alert("Attendance marked successfully");
    load(); // refresh list automatically
  };

  // ✅ load records
  const load = async () => {
    if (!employeeId) {
      alert("Select employee");
      return;
    }

    const data = await getAttendance(employeeId);
    setRecords(data);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold tracking-tight">
        Attendance
      </h2>

      {/* Controls */}
      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-wrap gap-3 items-center">
        <select
          className="border px-3 py-2 rounded-lg"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        >
          <option value="">Select Employee</option>
          {employees.map((e) => (
            <option key={e.id} value={e.id}>
              {e.full_name} ({e.employee_id})
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border px-3 py-2 rounded-lg"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          onClick={() => mark("Present")}
          className="bg-green-600 text-white px-4 py-2 rounded-xl"
        >
          Present
        </button>

        <button
          onClick={() => mark("Absent")}
          className="bg-red-600 text-white px-4 py-2 rounded-xl"
        >
          Absent
        </button>

        <button
          onClick={load}
          className="bg-black text-white px-4 py-2 rounded-xl"
        >
          View
        </button>
      </div>

      {/* Records */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        {records.length === 0 ? (
          <p className="p-6 text-gray-500">No records.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">
                  Employee
                </th>
                <th className="px-6 py-3 text-left font-semibold">
                  Status
                </th>
                <th className="px-6 py-3 text-left font-semibold">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {records.map((r) => (
                <tr key={r.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3">
                    {getEmployeeCode(r.employee_id)}
                  </td>
                  <td className="px-6 py-3">{r.status}</td>
                  <td className="px-6 py-3">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Attendance;
