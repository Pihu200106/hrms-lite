const BASE_URL = "https://hrmslitebackend.onrender.com";

// ================= EMPLOYEES =================

// Get all employees
export const getEmployees = async () => {
  try {
    const res = await fetch(`${BASE_URL}/employees/`);
    if (!res.ok) throw new Error("Failed to fetch employees");
    return await res.json();
  } catch (err) {
    console.error("getEmployees:", err);
    return [];
  }
};


// Add employee
export const addEmployee = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/employees/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (err) {
    console.error("addEmployee:", err);
    return { detail: "Server error" };
  }
};


// Delete employee
export const deleteEmployee = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/employees/${id}`, {
      method: "DELETE",
    });

    return await res.json();
  } catch (err) {
    console.error("deleteEmployee:", err);
    return { detail: "Delete failed" };
  }
};



// ================= ATTENDANCE =================

// Mark attendance
export const markAttendance = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/attendance/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (err) {
    console.error("markAttendance:", err);
    return { detail: "Failed to mark attendance" };
  }
};


// Get attendance by employee id
export const getAttendance = async (employeeId) => {
  try {
    const res = await fetch(`${BASE_URL}/attendance/${employeeId}`);
    if (!res.ok) throw new Error("Failed to fetch");
    return await res.json();
  } catch (err) {
    console.error("getAttendance:", err);
    return [];
  }
};
