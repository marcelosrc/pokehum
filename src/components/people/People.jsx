import React from "react";
import axios from "axios";
import "../../styling/Common.scss";
import "../../styling/People.scss";
import { UserContext, PageContext } from "../../pages/Home";
import defaultUserPicture from "../../media/default.png";
import Arena from "../arena/Arena";

function People() {
  const { currentUser, setReloadUser } = React.useContext(UserContext);
  const { setCurrentPage } = React.useContext(PageContext);
  const [anyUsers, setAnyUsers] = React.useState([]);
  const [currentAnyUser, setCurrentAnyUser] = React.useState([]);
  const [showActionMenu, setShowActionMenu] = React.useState();
  const [reloadFeed, setReloadFeed] = React.useState(false);
  const [arena, showArena] = React.useState(false);

  React.useEffect(() => {
    setCurrentPage("PPL");
  }, [setCurrentPage]);

  React.useEffect(() => {
    axios
      .get("/users/any")
      .then((res) => {
        setAnyUsers(res.data.message);
        setReloadFeed(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, [setReloadUser, reloadFeed]);

  const callArena = () => {
    showArena(true);
  };

  const cancel = () => {
    alert("CONSERTAR");
  };

  const callActionMenu = (anyUser) => {
    setCurrentAnyUser(anyUser);
    setShowActionMenu(
      <div className="people__entry-actionarea">
        <button className="common-accept-button" onClick={callArena}>
          Capturar
        </button>
        <button className="common-deny-button" onClick={cancel}>
          Cancelar
        </button>
      </div>
    );
  };

  const anyUserEntry = anyUsers.map((anyUser) => (
    <div
      className="people__entry"
      key={anyUser.id}
      onClick={() => callActionMenu(anyUser)}
    >
      <div className="people__entry-info">
        <img
          className="people__entry-info-picture"
          src={defaultUserPicture}
          alt={anyUser.name}
        />
        <div className="people__entry-info-credentials">
          <p>{anyUser.name}</p>
          <p>
            {anyUser.captured_ppl?.length}{" "}
            {anyUser.captured_ppl?.length === 1 ? "capturado" : "capturados"}
          </p>
        </div>
      </div>
      {currentAnyUser.id === anyUser.id ? showActionMenu : null}
    </div>
  ));

  return (
    <div className="people__container">
      {anyUserEntry}
      {arena ? (
        <Arena
          currentAnyUser={currentAnyUser}
          currentUser={currentUser}
          setReloadUser={setReloadUser}
          setReloadFeed={setReloadFeed}
          showArena={showArena}
        />
      ) : null}
    </div>
  );
}

export default People;
