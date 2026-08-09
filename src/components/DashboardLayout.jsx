import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({
    role = "admin",
    title = "Dashboard",
    children,
}) {

    return (

        <>

            {/* Sidebar */}
            <Sidebar role={role} />

            {/* Main Area */}
            <div className="main">

                {/* Top Navbar */}
                <Navbar title={title} />

                {/* Page Content */}
                <div className="container mt-4">

                    {children}

                </div>

            </div>

        </>

    );

}

export default DashboardLayout;