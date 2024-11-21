import { HashRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard/DashBoard";

function App() {
  return (
    <Router>
      <div className="flex h-screen p-2 overflow-hidden">
        <Routes>
          <Route exact path="/" element={<DashBoard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
