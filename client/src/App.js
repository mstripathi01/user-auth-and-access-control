import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthTabs from "./pages/AuthTabs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthTabs />} />
      </Routes>
    </Router>
  );
}

export default App;
