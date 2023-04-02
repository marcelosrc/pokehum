import React from "react";
import Title from "../components/Title";
import Arena from "../components/Arena";
import Profile from "../components/Profile";
import "../styling/Home.scss";
import axios from "axios";

export const UserContext = React.createContext({});

function Home() {
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    axios
      .get("/users/me")
      .then((res) => {
        setCurrentUser(res.data.message);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, []);

  return (
    <UserContext.Provider value={{ currentUser }}>
      <div className="home__container">
        <Title />
        <Arena />
        <Profile />
      </div>
    </UserContext.Provider>
  );
}

export default Home;
