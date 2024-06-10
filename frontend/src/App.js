import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Task from "./Pages/Task";
import Client from "./Pages/Client";
import ContentPlan from "./Pages/ContentPlan";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/task" element={<Task/>}></Route>
          <Route path="/client" element={<Client/>}></Route>
          <Route path="/contentplan" element={<ContentPlan/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
