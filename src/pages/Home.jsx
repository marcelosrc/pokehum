import homeStyles from "./Home.module.css";

function Home() {
  return (
    <div className={homeStyles.container}>
      <div className={homeStyles.title}>
        <h1>POKEPPL</h1>
      </div>
      <div className={homeStyles.arena} />
      <div className={homeStyles.profile} />
    </div>
  );
}

export default Home;
