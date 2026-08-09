import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({ role = "admin", title = "Dashboard", children }) {
  return (
    <>
      <Sidebar role={role} />

      <div className="main">
        <Navbar title={title} />

        <div className="container mt-4">{children}</div>
      </div>
    </>
  );
}

export default DashboardLayout;
