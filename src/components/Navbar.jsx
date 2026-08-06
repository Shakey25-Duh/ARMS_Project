import Logout from "./Logout";

function Navbar({ title = "Dashboard" }) {

    return (

        <div className="app-navbar">

            <div className="container-fluid d-flex justify-content-between align-items-center">

                <h3 className="mb-0">
                    {title}
                </h3>

                <Logout />

            </div>

        </div>

    );

}

export default Navbar;