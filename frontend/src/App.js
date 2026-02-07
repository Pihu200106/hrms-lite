import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

function NavItem({ to, children }) {
  const { pathname } = useLocation();
  const active = pathname === to;

  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
        active
          ? "bg-black text-white"
          : "text-gray-500 hover:text-black hover:bg-gray-100"
      }`}
    >
      {children}
    </Link>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">

        {/* Top bar */}
        
        <div className="bg-white border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold tracking-tight">
              HRMS Lite
            </h1>

            <div className="flex gap-2">
              <NavItem to="/">Employees</NavItem>
              <NavItem to="/attendance">Attendance</NavItem>
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="max-w-7xl mx-auto px-8 py-10">
          <Routes>
            <Route path="/" element={<Employees />} />
            <Route path="/attendance" element={<Attendance />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;