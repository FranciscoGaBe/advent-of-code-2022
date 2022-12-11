import Container from "./components/Container";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="bg-bg flex flex-col h-full">
      <Navbar />
      <Container />
    </div>
  );
}

export default App;
