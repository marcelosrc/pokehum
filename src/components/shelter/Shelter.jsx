import React from "react";
import "../../styling/Common.scss";
import "../../styling/Shelter.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext, PageContext } from "../../pages/Home";
import defaultUserPicture from "../../media/default.png";

function Shelter() {
  const { setReloadUser } = React.useContext(UserContext);
  const { setCurrentPage } = React.useContext(PageContext);
  const [shelter, setShelter] = React.useState([]);
  const [currentAnyUser, setCurrentAnyUser] = React.useState([]);
  const [actionMenu, setActionMenu] = React.useState(null);
  const [reloadFeed, setReloadFeed] = React.useState(false);
  const navigate = useNavigate();

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
      .catch(() => {
        navigate("/login");
      });
  }, [setReloadUser, reloadFeed, navigate]);

  const setFree = (sheltered) => {
    axios
      .post("/gm/setfree/" + sheltered.id)
      .then(() => {
        setReloadUser(true);
        setReloadFeed(true);
      })
      .catch(() => {
        navigate("/login");
      });
  };

  const showActionMenu = (sheltered) => {
    setCurrentAnyUser(sheltered);
    setActionMenu(true);
  };

  const cancel = () => {
    setActionMenu(false);
  };

  const shelterEntries = shelter.map((sheltered) => (
    <div className="shelter__entry" key={sheltered.id}>
      <div className="shelter__entry-info">
        <img
          className="shelter__entry-info-picture"
          src={
            sheltered.profile_pic_path
              ? sheltered.profile_pic_path
              : defaultUserPicture
          }
          alt={sheltered.name}
          onClick={() => showActionMenu(sheltered)}
        />
        <div className="shelter__entry-info-credentials">
          <p>{sheltered.name}</p>
        </div>
      </div>
      {actionMenu && currentAnyUser.id === sheltered.id ? (
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
      ) : null}
    </div>
  ));

  return <div className="shelter__container">{shelterEntries}</div>;
}

export default Shelter;
