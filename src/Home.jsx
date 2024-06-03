import Navbar from "./components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <section>
        <div
          className="d-flex justify-content-center align-items-center text-center"
          style={{ height: "50rem" }}
        >
          <div>
            <h1>Welcome to Celerates</h1>
            <p>Improve Your Skills</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
