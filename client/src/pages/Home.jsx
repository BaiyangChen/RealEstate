import Hero from "../components/Hero/Hero";
import Residencies from "../components/Residencies/Risidencies";
// import "../App.css";

function Home() {
  return (
    <div className="App">
      <div>
        <div className="white-gradient">
          <Hero />
          <Residencies />
        </div>
      </div>
    </div>
  );
}

export default Home;
