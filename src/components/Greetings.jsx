import React from "react";
import { UserContext } from "../pages/Home";
import "../styling/Greetings.scss";

function Greetings() {
  const { currentUser } = React.useContext(UserContext);

  return (
    <div className="greetings__content">
      <p>Boa noite, {currentUser.username}</p>
      <p>Puta dia bão pra pegar uns otários e meter no cativeiro, hein?</p>
      <p>
        Quem vai ser sua primeira vítima hoje? Clique aqui e descubra quem está
        panguando por aí.
      </p>
    </div>
  );
}

export default Greetings;
