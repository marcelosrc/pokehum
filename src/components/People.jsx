import React from "react";
import "../styling/Common.scss";
import "../styling/People.scss";
import axios from "axios";
import { UserContext } from "../pages/Home";
import defaultUserPicture from "../media/default.png";

function People() {
  const { setReloadUser } = React.useContext(UserContext);
  const [anyUsers, setAnyUsers] = React.useState([]);
  const [entryId, setEntryId] = React.useState();
  const [showActionMenu, setShowActionMenu] = React.useState();
  const [reloadFeed, setReloadFeed] = React.useState(false);

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

  const capture = (anyUserId) => {
    axios
      .post("/gm/capture/" + anyUserId)
      .then((res) => {
        setReloadUser(true);
        setReloadFeed(true);
        alert("CAPTURADO");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const cancel = () => {
    alert("CONSERTAR");
  };

  const callActionMenu = (anyUserId) => {
    setEntryId(anyUserId);
    setShowActionMenu(
      <div className="people__entry-actionarea">
        <button
          className="common-accept-button"
          onClick={() => capture(anyUserId)}
        >
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
      onClick={() => callActionMenu(anyUser.id)}
    >
      <div className="people__entry-info">
        <img
          className="people__entry-info-picture"
          src={defaultUserPicture}
          alt={anyUser.username}
        />
        <div className="people__entry-info-credentials">
          <p>{anyUser.username}</p>
          <p>
            {anyUser.captured_ppl_count}{" "}
            {anyUser.captured_ppl_count === 1 ? "capturado" : "capturados"}
          </p>
        </div>
      </div>
      {entryId === anyUser.id ? showActionMenu : null}
    </div>
  ));

  return <div className="people__container">{anyUserEntry}</div>;
}

export default People;
