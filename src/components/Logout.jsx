import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Logout?")) {
      localStorage.clear();

      navigate("/");
    }
  };

  return (
    <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
