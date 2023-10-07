import React from "react";
import "../styling/Home.scss";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Profile from "../components/home/Profile";
import Footer from "../components/home/Footer";

export const UserContext = React.createContext({});
export const PageContext = React.createContext({});

function Home() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [reloadUser, setReloadUser] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get("/users/me")
      .then((res) => {
        setCurrentUser(res.data.message);
        setReloadUser(false);
      })
      .catch(() => {
        navigate("/login");
      });
  }, [reloadUser, navigate]);

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
