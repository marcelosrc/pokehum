import "../../styling/Footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer__container">
      <Link to="/">
        <div className="footer__button">
          <h2>HOM</h2>
        </div>
      </Link>
      <Link to="/shelter">
        <div className="footer__button">
          <h2>SHT</h2>
        </div>
      </Link>
      <Link to="/people">
        <div className="footer__button">
          <h2>PPL</h2>
        </div>
      </Link>
      <Link to="/inventory">
        <div className="footer__button">
          <h2>INV</h2>
        </div>
      </Link>
    </div>
  );
}

export default Footer;
