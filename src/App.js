import Practice from "./Components/Practice/Practice";
import Rank from "./Components/Rank/Rank";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Practice />} />
        <Route path="Rank" element={<Rank />} />
      </Routes>


    </div>
  );
}

export default App;
