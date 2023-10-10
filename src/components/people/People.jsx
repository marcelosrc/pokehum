import React from "react";
import "../../styling/Common.scss";
import "../../styling/People.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext, PageContext } from "../../pages/Home";
import defaultUserPicture from "../../media/default.png";
import Arena from "../arena/Arena";

function People() {
  const { currentUser, setReloadUser } = React.useContext(UserContext);
  const { setCurrentPage } = React.useContext(PageContext);
  const [anyUsers, setAnyUsers] = React.useState([]);
  const [currentAnyUser, setCurrentAnyUser] = React.useState([]);
  const [actionMenu, setActionMenu] = React.useState(false);
  const [reloadFeed, setReloadFeed] = React.useState(false);
  const [arena, showArena] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    setCurrentPage("PPL");
  }, [setCurrentPage]);

  React.useEffect(() => {
    axios
      .get("/gm/people")
      .then((res) => {
        setAnyUsers(res.data.message);
        setReloadFeed(false);
      })
      .catch(() => {
        navigate("/login");
      });
  }, [setReloadUser, reloadFeed, navigate]);

  const callArena = () => {
    showArena(true);
  };

  const showActionMenu = (anyUser) => {
    setCurrentAnyUser(anyUser);
    if (!actionMenu) {
      setActionMenu(true);
    } else {
      setActionMenu(false);
    }
  };

  const cancel = () => {
    setActionMenu(false);
  };

  const anyUsersEntries = anyUsers.map((anyUser) => (
    <div className="people__entry" key={anyUser.id}>
      <div className="people__entry-info">
        <img
          className="people__entry-info-picture"
          src={
            anyUser.profile_pic_path
              ? anyUser.profile_pic_path
              : defaultUserPicture
          }
          alt={anyUser.name}
          onClick={() => showActionMenu(anyUser)}
        />
        <div className="people__entry-info-credentials">
          <p>{anyUser.name}</p>
          <p>
            {anyUser.captured_ppl?.length}{" "}
            {anyUser.captured_ppl?.length === 1 ? "capturado" : "capturados"}
          </p>
        </div>
      </div>
      {actionMenu && currentAnyUser.id === anyUser.id ? (
        <div className="people__entry-actionarea">
          <button className="common-accept-button" onClick={callArena}>
            Capturar
          </button>
          <button className="common-deny-button" onClick={cancel}>
            Cancelar
          </button>
        </div>
      ) : null}
    </div>
  ));

  return (
    <div className="people__container">
      {anyUsersEntries}
      {arena ? (
        <Arena
          currentUser={currentUser}
          currentAnyUser={currentAnyUser}
          setReloadUser={setReloadUser}
          setReloadFeed={setReloadFeed}
          showArena={showArena}
        />
      ) : null}
    </div>
  );
}

export default People;
