import "./App.css";
import { Route, Routes } from "react-router-dom";
import TestReactSpring from "./pages/testReactSpring/testReactSpring";

function App() {
  return (
    <Routes>
      <Route path="TestSpring" element={<TestReactSpring />}></Route>
    </Routes>
  );
}

export default App;
