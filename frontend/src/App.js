import './App.css';
import {BrowserRouter as Router, Routes, Route,Link} from "react-router-dom";
import Home from "./components/home/home";
import Tour from "./components/tour/tour";

function App() {
  return (
      <Router>
        <div className="App">
          <header className="App-header">
            <ul>
              <li>
                <Link to={'/'}>Home</Link>
              </li>
              <Link to={'/tour'}>tours</Link>
            </ul>
          </header>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/tour" element={<Tour/>}/>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
