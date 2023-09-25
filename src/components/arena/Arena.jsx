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
          setResult(props.currentUser);
        } else {
          setResult(props.currentAnyUser);
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
            <h1>{result.name}</h1>
          </div>
          <div className="arena__fighters">
            <img
              src={
                result.profile_pic_path
                  ? result.profile_pic_path
                  : defaultUserPicture
              }
              alt={result.name}
            />
          </div>
        </div>
      ) : (
        <div className="arena__container">
          <div className="arena__title">
            <h1>{props.currentUser.name}</h1>
            <h1>X</h1>
            <h1>{props.currentAnyUser.name}</h1>
          </div>
          <div className="arena__fighters">
            <img
              src={
                props.currentUser.profile_pic_path
                  ? props.currentUser.profile_pic_path
                  : defaultUserPicture
              }
              alt={props.currentUser.name}
            />
            <img
              src={
                props.currentAnyUser.profile_pic_path
                  ? props.currentAnyUser.profile_pic_path
                  : defaultUserPicture
              }
              alt={props.currentAnyUser.name}
            />
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
