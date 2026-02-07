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

  // ✅ mark attendance
  const mark = async (status) => {
    if (!employeeId) {
      alert("Select employee");
      return;
    }

    const payload = {
      employee_id: Number(employeeId),   // ⭐ numeric
      date,
      status,
    };

    console.log("Sending:", payload);

    const res = await markAttendance(payload);

    if (res.detail) {
      alert(res.detail);
      return;
    }

    alert("Attendance marked successfully");
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
      <div className="bg-white shadow-lg rounded-2xl p-6 flex gap-3 items-center">
        <select
          className="input"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        >
          <option value="">Select Employee</option>

          {/* ✅ SEND ID */}
          {employees.map((e) => (
            <option key={e.id} value={e.id}>
              {e.full_name} (#{e.id})
            </option>
          ))}
        </select>

        <input
          type="date"
          className="input"
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
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td>{r.id}</td>
                  <td>{r.status}</td>
                  <td>{r.date}</td>
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
