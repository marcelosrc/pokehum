import React from "react";
import "../../styling/Inventory.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PageContext } from "../../pages/Home";

function Inventory() {
  const { setCurrentPage } = React.useContext(PageContext);
  const [inventory, setInventory] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    setCurrentPage("INV");
  }, [setCurrentPage]);

  React.useEffect(() => {
    axios
      .get("/gm/inventory")
      .then((res) => {
        setInventory(res.data.message);
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  const showInventory = inventory.map((item) => (
    <div className="inventory__item" key={item.id}>
      <p>{item.item}</p>
      <p>{item.quantity}</p>
    </div>
  ));

  return <div className="inventory__container">{showInventory}</div>;
}

export default Inventory;
