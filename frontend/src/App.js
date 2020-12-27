import "./App.css";
import UsOpen from "./cards/Usopen";
import Wimbledon from "./cards/Wimbledon";
import RolandGarros from "./cards/Rolandgarros";
import AustralianOpen from "./cards/Ausopen";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router style={{ display: "flex", border: "2px solid red" }}>
      <Route className="full-height" path="/" exact component={UsOpen} />
      <Route path="/wimbledon" component={Wimbledon} />
      <Route path="/rolandgarros" component={RolandGarros} />
      <Route path="/australianopen" component={AustralianOpen} />
    </Router>
  );
}

export default App;
