import React from "react";
import "../../styling/Common.scss";
import "../../styling/Profile.scss";
import { UserContext } from "../../pages/Home";
import defaultUserPicture from "../../media/default.png";

function Profile() {
  const { currentUser } = React.useContext(UserContext);

  return (
    <div className="profile__container">
      <img
        className="profile__picture"
        src={
          currentUser.profile_pic_path
            ? currentUser.profile_pic_path
            : defaultUserPicture
        }
        alt={currentUser.name}
      />
      <div className="profile__credentials">
        <p className="turquoise">{currentUser.name}</p>
        <p>
          {currentUser.captured_ppl?.length}{" "}
          {currentUser.captured_ppl?.length === 1 ? "capturado" : "capturados"}
        </p>
      </div>
    </div>
  );
}

export default Profile;
