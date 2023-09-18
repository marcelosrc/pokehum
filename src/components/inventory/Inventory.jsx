import React from "react";
import "../../styling/Inventory.scss";
import axios from "axios";
import { PageContext } from "../../pages/Home";

function Inventory() {
  const { setCurrentPage } = React.useContext(PageContext);
  const [inventory, setInventory] = React.useState([]);

  React.useEffect(() => {
    setCurrentPage("INV");
  }, [setCurrentPage]);

  React.useEffect(() => {
    axios
      .get("/gm/inventory")
      .then((res) => {
        setInventory(res.data.message);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, []);

  const showInventory = inventory.map((item) => (
    <div className="inventory__item" key={item.id}>
      <p>{item.item}</p>
      <p>{item.quantity}</p>
    </div>
  ));

  return <div className="inventory__container">{showInventory}</div>;
}

export default Inventory;
