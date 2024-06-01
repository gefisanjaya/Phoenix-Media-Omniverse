import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Login from "./Pages/Login";



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
