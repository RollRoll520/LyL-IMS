import "./App.css";
import { Route, Routes } from "react-router-dom";
import TestReactSpring from "./pages/testReactSpring";
import Home from "./pages/home";
import OnlineExercise from "./pages/onlineExercise";
import OnlineTest from "./pages/onlineTest";

function App() {
  return (
    <Routes>
      <Route path="/TestSpring" element={<TestReactSpring />}></Route>
      <Route path="/" element={<Home />}></Route>
      <Route path="/OnlineExercise" element={<OnlineExercise />}></Route>
      <Route path="/OnlineTest" element={<OnlineTest />}></Route>
    </Routes>
  );
}

export default App;
