import React from "react";
import axios from "axios";
import "../../styling/Common.scss";
import "../../styling/Arena.scss";
import defaultUserPicture from "../../media/default.png";

function Arena(props) {
  const [result, setResult] = React.useState();

  const combat = () => {
    axios
      .post("/gm/capture/" + props.currentAnyUser.id)
      .then((res) => {
        if (res.data.message === "CAPTURED") {
          setResult(props.currentUser.username);
        } else {
          setResult(props.currentAnyUser.username);
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
    props.setReloadUser(true);
    props.setReloadFeed(true);
  };

  const closeArena = () => {
    setResult(null);
    props.showArena(false);
  };

  return (
    <>
      {result ? (
        <div className="arena__container" onClick={closeArena}>
          <div className="arena__title">
            <h1>{result}</h1>
          </div>
          <div className="arena__fighters">
            <img src={defaultUserPicture} alt={result} />
          </div>
        </div>
      ) : (
        <div className="arena__container">
          <div className="arena__title">
            <h1>{props.currentUser.username}</h1>
            <h1>X</h1>
            <h1>{props.currentAnyUser.username}</h1>
          </div>
          <div className="arena__fighters">
            <img src={defaultUserPicture} alt={props.currentUser.username} />
            <img src={defaultUserPicture} alt={props.currentAnyUser.username} />
          </div>
          <button className="common-accept-button" onClick={combat}>
            Capturar
          </button>
        </div>
      )}
    </>
  );
}

export default Arena;
