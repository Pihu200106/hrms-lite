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
    console.log("EMPLOYEE LIST:", data);
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

    console.log("ADDING:", payload);   // ⭐ debug

    const res = await addEmployee(payload);

    console.log("ADD RESPONSE:", res); // ⭐ debug

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

    console.log("DELETE RESPONSE:", res);

    if (res.detail) {
      alert(res.detail);
      return;
    }

    alert("Deleted successfully");
    loadEmployees();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Employee Management</h2>

      {/* Add Employee */}
      <form onSubmit={handleSubmit} className="grid grid-cols-5 gap-2 mb-6">
        <input
          className="border p-2 rounded"
          name="employee_id"
          placeholder="Employee ID"
          value={form.employee_id}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded"
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
        />
        <button className="bg-black text-white rounded">
          Add
        </button>
      </form>

      {/* List */}
      {loading ? (
        <p>Loading...</p>
      ) : employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <div className="bg-white shadow rounded overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th>ID</th>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {employees.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50">
                  <td>{e.id}</td>
                  <td>{e.employee_id}</td>
                  <td>{e.full_name}</td>
                  <td>{e.email}</td>
                  <td>{e.department}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(e.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
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
