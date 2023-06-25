import React from "react";
import "../../styling/Profile.scss";
import { UserContext } from "../../pages/Home";
import defaultUserPicture from "../../media/default.png";

function Profile() {
  const { currentUser } = React.useContext(UserContext);

  return (
    <div className="profile__container">
      <img
        className="profile__picture"
        src={defaultUserPicture}
        alt={currentUser.username}
      />
      <div className="profile__credentials">
        <p>{currentUser.username}</p>
        <p>
          {currentUser.captured_ppl_count}{" "}
          {currentUser.captured_ppl_count === 1 ? "capturado" : "capturados"}
        </p>
      </div>
    </div>
  );
}

export default Profile;
