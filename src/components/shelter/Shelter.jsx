import React from "react";
import "../../styling/Common.scss";
import "../../styling/Shelter.scss";
import axios from "axios";
import { UserContext, PageContext } from "../../pages/Home";
import defaultUserPicture from "../../media/default.png";

function Shelter() {
  const { setReloadUser } = React.useContext(UserContext);
  const { setCurrentPage } = React.useContext(PageContext);
  const [shelter, setShelter] = React.useState([]);
  const [currentAnyUser, setCurrentAnyUser] = React.useState([]);
  const [showActionMenu, setShowActionMenu] = React.useState();
  const [reloadFeed, setReloadFeed] = React.useState(false);

  React.useEffect(() => {
    setCurrentPage("SHT");
  }, [setCurrentPage]);

  React.useEffect(() => {
    axios
      .get("/gm/shelter")
      .then((res) => {
        setShelter(res.data.message);
        setReloadFeed(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, [setReloadUser, reloadFeed]);

  const setFree = (sheltered) => {
    axios
      .post("/gm/setfree/" + sheltered.id)
      .then(() => {
        setReloadUser(true);
        setReloadFeed(true);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const cancel = () => {
    alert("CONSERTAR");
  };

  const callActionMenu = (sheltered) => {
    setCurrentAnyUser(sheltered);
    setShowActionMenu(
      <div className="people__entry-actionarea">
        <button
          className="common-accept-button"
          onClick={() => setFree(sheltered)}
        >
          Soltar
        </button>
        <button className="common-deny-button" onClick={cancel}>
          Cancelar
        </button>
      </div>
    );
  };

  const shelterEntries = shelter.map((sheltered) => (
    <div
      className="shelter__entry"
      key={sheltered.id}
      onClick={() => callActionMenu(sheltered)}
    >
      <div className="shelter__entry-info">
        <img
          className="shelter__entry-info-picture"
          src={defaultUserPicture}
          alt={sheltered.name}
        />
        <div className="shelter__entry-info-credentials">
          <p>{sheltered.name}</p>
        </div>
      </div>
      {currentAnyUser.id === sheltered.id ? showActionMenu : null}
    </div>
  ));

  return <div className="shelter__container">{shelterEntries}</div>;
}

export default Shelter;
