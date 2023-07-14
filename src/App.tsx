import "./App.css";
import { Route, Routes } from "react-router-dom";
import TrainWelcome from "./pages/onlineTest/testWelcome";
import TestWelcome from "./pages/onlineTest/testWelcome";
import TestLayout from "./pages/onlineTest/component/TestLayout";
import TrainLayout from "./pages/onlineTrain/component/TrainLayout";

function App() {
  return (
    <Routes>
      <Route element={<TrainLayout />}>
        <Route path="trainWelcome" element={<TrainWelcome />}></Route>
      </Route>
      <Route element={<TestLayout />}>
        <Route
          path="testWelcome"
          element={<TestWelcome />}
        ></Route>
      </Route>
    </Routes>
  );
}

export default App;
