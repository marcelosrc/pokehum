import React from "react";
import "../styling/Home.scss";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Profile from "../components/home/Profile";
import Footer from "../components/home/Footer";
import Captured from "../captured/Captured";

export const UserContext = React.createContext({});
export const PageContext = React.createContext({});

function Home() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentAnyUser, setCurrentAnyUser] = React.useState({});
  const [reloadUser, setReloadUser] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState("");
  const [isCaptured, setIsCaptured] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get("/users/me")
      .then((res) => {
        setCurrentUser(res.data.message);
        setReloadUser(false);
        if (res.data.message.capturer !== null) {
          axios
            .get(`/users/any/${res.data.message.capturer}`)
            .then((res) => {
              setCurrentAnyUser(res.data.message);
            })
            .catch(() => {
              navigate("/login");
            });
          setIsCaptured(true);
        }
      })
      .catch(() => {
        navigate("/login");
      });
  }, [reloadUser, navigate]);

  return (
    <UserContext.Provider value={{ currentUser, setReloadUser }}>
      <PageContext.Provider value={{ currentPage, setCurrentPage }}>
        {isCaptured ? (
          <div className="home__container">
            <Captured currentAnyUser={currentAnyUser} />
          </div>
        ) : (
          <div className="home__container">
            <Profile />
            <Outlet />
            <Footer />
          </div>
        )}
      </PageContext.Provider>
    </UserContext.Provider>
  );
}

export default Home;
