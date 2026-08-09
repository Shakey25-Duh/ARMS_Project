import Logout from "./Logout";

function Navbar({ title = "Dashboard" }) {

    return (

        <div className="app-navbar">

            <div className="container-fluid d-flex align-items-center justify-content-between">

                {/* Page Title */}
                <h3 className="dashboard-title mb-0">
                    {title}
                </h3>

                {/* Logout */}
                <div className="navbar-logout">
                    <Logout />
                </div>

            </div>

        </div>

    );

}

export default Navbar;