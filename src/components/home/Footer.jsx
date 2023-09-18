import React from "react";
import "../../styling/Footer.scss";
import { Link } from "react-router-dom";
import { PageContext } from "../../pages/Home";

function Footer() {
  const { currentPage } = React.useContext(PageContext);

  return (
    <div className="footer__container">
      <Link to="/">
        <div
          className={
            currentPage === "HOM" ? "footer__inverted-button" : "footer__button"
          }
        >
          <h2>HOM</h2>
        </div>
      </Link>
      <Link to="/shelter">
        <div
          className={
            currentPage === "SHT" ? "footer__inverted-button" : "footer__button"
          }
        >
          <h2>SHT</h2>
        </div>
      </Link>
      <Link to="/people">
        <div
          className={
            currentPage === "PPL" ? "footer__inverted-button" : "footer__button"
          }
        >
          <h2>PPL</h2>
        </div>
      </Link>
      <Link to="/inventory">
        <div
          className={
            currentPage === "INV" ? "footer__inverted-button" : "footer__button"
          }
        >
          <h2>INV</h2>
        </div>
      </Link>
    </div>
  );
}

export default Footer;
