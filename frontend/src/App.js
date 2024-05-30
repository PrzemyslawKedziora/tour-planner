import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Index from "./components/home";
import Tour from "./components/tour/tour";
import Login from "./components/login/login";
import Register from "./components/register/register";
import TourCreator from "./components/tour-creator/tour-creator";
import UserTours from "./components/user-tours/user-tours";

function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Index/>}/>
            <Route path="/tour" element={<Tour/>}/>
            <Route path="/tour-creator" element={<TourCreator/>}/>
            <Route path="/tours" element={<UserTours/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
