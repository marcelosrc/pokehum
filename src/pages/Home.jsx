import React from "react";
import Profile from "../components/Profile";
import Greetings from "../components/Greetings";
import People from "../components/People";
import Footer from "../components/Footer";
import "../styling/Home.scss";
import axios from "axios";

export const UserContext = React.createContext({});

function Home() {
  const [currentUser, setCurrentUser] = React.useState({});

  //TEMPORARIO
  React.useEffect(() => {
    axios.post("/login", { username: "marcelosrc", password: "123" });
  }, []);

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
        <Profile />
        <div className="main_window__container">
          <Greetings />
          <People />
        </div>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default Home;
