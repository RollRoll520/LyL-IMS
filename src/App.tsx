import "./App.css";
import { Route, Routes } from "react-router-dom";
import TestReactSpring from "./pages/testReactSpring";
import Home from "./pages/home";

function App() {
  return (
    <Routes>
      <Route path="TestSpring" element={<TestReactSpring />}></Route>
      <Route path="Home" element={<Home />}></Route>
    </Routes>
  );
}

export default App;
