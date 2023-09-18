import React from "react";
import "../styling/Home.scss";
import Profile from "../components/home/Profile";
import Footer from "../components/home/Footer";
import { Outlet } from "react-router-dom";
import axios from "axios";

export const UserContext = React.createContext({});
export const PageContext = React.createContext({});

function Home() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [reloadUser, setReloadUser] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState("");

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
      <PageContext.Provider value={{ currentPage, setCurrentPage }}>
        <div className="home__container">
          <Profile />
          <Outlet />
          <Footer />
        </div>
      </PageContext.Provider>
    </UserContext.Provider>
  );
}

export default Home;
