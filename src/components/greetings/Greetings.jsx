import React from "react";
import "../../styling/Common.scss";
import "../../styling/Greetings.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext, PageContext } from "../../pages/Home";

function Greetings() {
  const { currentUser } = React.useContext(UserContext);
  const { setCurrentPage } = React.useContext(PageContext);
  const [leader, setLeader] = React.useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    setCurrentPage("HOM");
  }, [setCurrentPage]);

  React.useEffect(() => {
    axios
      .get("/gm/ranking")
      .then((res) => {
        setLeader(res.data.message[0]);
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="greetings__container">
      <p>Boa noite, {currentUser.name}!</p>
      <p>Puta dia bão pra pegar uns otários e meter no cativeiro, hein?</p>
      <p>
        Quem vai ser sua primeira vítima hoje?{" "}
        <Link to="/people">Clique aqui</Link> e descubra quem está panguando por
        aí.
      </p>
      {leader.captured_ppl_count === null ? (
        <p>
          Até o momento, sem vencedores ou perdedores por aqui. Apenas você e
          sua extraordinária irrelevância.
        </p>
      ) : currentUser.name === leader.name ? (
        <>
          <p>
            A propósito, sabia que <span className="magenta"> você </span> é o
            jogador com o "albergue" mais recheado de gente?
          </p>
          <p>Tá com tempo livre, né?</p>
        </>
      ) : (
        <>
          <p>
            A propósito, sabia que
            <span className="magenta"> {leader.name} </span>é o jogador com mais
            crias capturadas em seu "abrigo"?
          </p>
          <p>É isso mesmo?</p>
          <p>
            Por que não desiste e volta para as suas discussões estúpidas de
            Twitter?
          </p>
          <p>É o que você merece.</p>
        </>
      )}
    </div>
  );
}

export default Greetings;
