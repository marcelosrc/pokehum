import React from "react";
import "../styling/Captured.scss";

function Captured(props) {
  return (
    <div className="captured__container">
      <p>CONTEMPLE SEU NOVO DONO:</p>
      <img
        src={props.currentAnyUser.profile_pic_path}
        alt={props.currentAnyUser.name}
      />
      <p>{props.currentAnyUser.name}</p>
      <p>ENTRE EM CONTATO E NEGOCIE SUA SOLTURA.</p>
    </div>
  );
}

export default Captured;
