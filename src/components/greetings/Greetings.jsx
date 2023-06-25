import React from "react";
import { UserContext } from "../../pages/Home";
import "../../styling/Greetings.scss";
import axios from "axios";
import { Link } from "react-router-dom";

function Greetings() {
  const { currentUser } = React.useContext(UserContext);
  const [leader, setLeader] = React.useState("");

  React.useEffect(() => {
    axios
      .get("/gm/ranking")
      .then((res) => {
        setLeader(res.data.message[0].username);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, []);

  return (
    <div className="greetings__container">
      <p>Boa noite, {currentUser.username}</p>
      <p>Puta dia bão pra pegar uns otários e meter no cativeiro, hein?</p>
      <p>
        Quem vai ser sua primeira vítima hoje?{" "}
        <Link to="/people">Clique aqui</Link> e descubra quem está panguando por
        aí.
      </p>
      <p>
        A propósito, sabia que {leader} é o jogador com mais crias capturadas em
        seu "abrigo"?
      </p>
      <p>É isso mesmo?</p>
      <p>
        Você não está nem nos 10 primeiros, seu lixo. Desiste e volta para as
        suas discussões estúpidas de Twitter.
      </p>
      <p>É o que você merece.</p>
    </div>
  );
}

export default Greetings;
