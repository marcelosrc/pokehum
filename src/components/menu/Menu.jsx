import "../../styling/Menu.scss";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  const logout = () => {
    axios
      .get("/logout")
      .then(() => {
        navigate("/login");
      })
      .catch(() => {
        navigate("/login");
      });
  };
  return (
    <div className="menu__container">
      <div className="menu__buttons">
        <Link>
          <p onClick={logout}>Sair</p>
        </Link>
      </div>
    </div>
  );
}

export default Menu;
