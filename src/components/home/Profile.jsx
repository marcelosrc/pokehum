import React from "react";
import "../../styling/Common.scss";
import "../../styling/Profile.scss";
import { UserContext } from "../../pages/Home";
import Menu from "../menu/Menu";
import defaultUserPicture from "../../media/default.png";

function Profile() {
  const { currentUser } = React.useContext(UserContext);
  const [showMenu, setShowMenu] = React.useState();

  const callMenu = () => {
    !showMenu ? setShowMenu(true) : setShowMenu(false);
  };

  return (
    <div className="profile__container" onClick={callMenu}>
      <div className="profile__area">
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
            {currentUser.captured_ppl?.length === 1
              ? "capturado"
              : "capturados"}
          </p>
        </div>
      </div>
      {showMenu ? <Menu /> : null}
    </div>
  );
}

export default Profile;
