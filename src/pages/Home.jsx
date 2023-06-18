import React from "react";
import Profile from "../components/Profile";
import Greetings from "../components/Greetings";
import People from "../components/People";
import Footer from "../components/Footer";
import Inventory from "../components/Inventory";
import "../styling/Home.scss";
import axios from "axios";

export const UserContext = React.createContext({});

function Home() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [reloadUser, setReloadUser] = React.useState(false);

  //TEMPORARIO
  React.useEffect(() => {
    axios.post("/login", { username: "marcelosrc", password: "123" });
  }, []);

  React.useEffect(() => {
    axios
      .get("/users/me")
      .then((res) => {
        setCurrentUser(res.data.message);
        setReloadUser(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, [reloadUser]);

  return (
    <UserContext.Provider value={{ currentUser, setReloadUser }}>
      <div className="home__container">
        <Profile />
        <div className="main_window__container">
          <Greetings />
          <People />
          <Inventory />
        </div>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default Home;
