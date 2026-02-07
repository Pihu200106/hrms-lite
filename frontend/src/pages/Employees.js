import { useEffect, useState } from "react";
import { getEmployees, addEmployee, deleteEmployee } from "../services/api";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  // ✅ Load employees
  const loadEmployees = async () => {
    setLoading(true);
    const data = await getEmployees();
    setEmployees(data);
    setLoading(false);
  };

  // ✅ Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Add employee
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      employee_id: form.employee_id.trim(),
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      department: form.department.trim(),
    };

    const res = await addEmployee(payload);

    if (res.detail) {
      alert(res.detail);
      return;
    }

    alert("Employee added successfully");

    setForm({
      employee_id: "",
      full_name: "",
      email: "",
      department: "",
    });

    loadEmployees();
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    const res = await deleteEmployee(id);

    if (res.detail) {
      alert(res.detail);
      return;
    }

    alert("Deleted successfully");
    loadEmployees();
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold tracking-tight">
        Employee Management
      </h2>

      {/* Add Employee */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 grid md:grid-cols-5 gap-3"
      >
        <input
          className="border px-3 py-2 rounded-lg"
          name="employee_id"
          placeholder="Employee ID"
          value={form.employee_id}
          onChange={handleChange}
          required
        />

        <input
          className="border px-3 py-2 rounded-lg"
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          required
        />

        <input
          className="border px-3 py-2 rounded-lg"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          className="border px-3 py-2 rounded-lg"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
        />

        <button className="bg-black text-white rounded-xl">
          Add
        </button>
      </form>

      {/* List */}
      {loading ? (
        <p>Loading...</p>
      ) : employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">ID</th>
                <th className="px-6 py-3 text-left font-semibold">
                  Employee ID
                </th>
                <th className="px-6 py-3 text-left font-semibold">Name</th>
                <th className="px-6 py-3 text-left font-semibold">Email</th>
                <th className="px-6 py-3 text-left font-semibold">
                  Department
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>

            <tbody>
              {employees.map((e) => (
                <tr key={e.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3">{e.id}</td>
                  <td className="px-6 py-3">{e.employee_id}</td>
                  <td className="px-6 py-3">{e.full_name}</td>
                  <td className="px-6 py-3">{e.email}</td>
                  <td className="px-6 py-3">{e.department}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => handleDelete(e.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Employees;
