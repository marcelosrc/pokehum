import React from "react";
import { UserContext, PageContext } from "../../pages/Home";
import "../../styling/Common.scss";
import "../../styling/Greetings.scss";
import axios from "axios";
import { Link } from "react-router-dom";

function Greetings() {
  const { currentUser } = React.useContext(UserContext);
  const { setCurrentPage } = React.useContext(PageContext);
  const [leader, setLeader] = React.useState("HOM");

  React.useEffect(() => {
    setCurrentPage("HOM");
  }, [setCurrentPage]);

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
      {currentUser.username === leader ? (
        <>
          <p>
            A propósito, sabia que você é o jogador com o "albergue" mais
            recheado de gente?
          </p>
          <p>Tá com tempo livre, né?</p>
        </>
      ) : (
        <>
          <p>A propósito, sabia que </p> <p className="magenta">{leader}</p>{" "}
          <p>é o jogador com mais crias capturadas em seu "abrigo"?</p>
          <p>É isso mesmo?</p>
          <p>
            Lixo. Desiste e volta para as suas discussões estúpidas de Twitter.
          </p>
          <p>É o que você merece.</p>
        </>
      )}
    </div>
  );
}

export default Greetings;
