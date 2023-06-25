import React from "react";
import "../../styling/Common.scss";
import "../../styling/Shelter.scss";
import axios from "axios";
import { UserContext } from "../../pages/Home";
import defaultUserPicture from "../../media/default.png";

function Shelter() {
  const { setReloadUser } = React.useContext(UserContext);
  const [shelter, setShelter] = React.useState([]);
  const [reloadFeed, setReloadFeed] = React.useState(false);

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

  const shelterEntries = shelter.map((sheltered) => (
    <div className="shelter__entry" key={sheltered.id}>
      <div className="shelter__entry-info">
        <img
          className="shelter__entry-info-picture"
          src={defaultUserPicture}
          alt={sheltered.username}
        />
        <div className="shelter__entry-info-credentials">
          <p>{sheltered.username}</p>
        </div>
      </div>
    </div>
  ));

  return <div className="shelter__container">{shelterEntries}</div>;
}

export default Shelter;
