import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Index from "./components/home";
import Tour from "./components/tour/tour";

function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Index/>}/>
            <Route path="/tour" element={<Tour/>}/>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
