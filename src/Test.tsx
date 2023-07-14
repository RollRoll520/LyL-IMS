import "./App.css";
import { Route, Routes } from "react-router-dom";
import TestWelcome from "./pages/onlineTest/testWelcome";
import TestDataset from "./pages/onlineTest/testDataset";
import TestRecord from "./pages/onlineTest/testRecord";
import TestLayout from "./pages/onlineTest/component/TestLayout";

function Test() {
  return (
    <TestLayout>
      <Routes>
        <Route path="welcome" element={<TestWelcome />}></Route>
        <Route path="dataset" element={<TestDataset />}></Route>
        <Route path="record" element={<TestRecord />}></Route>
      </Routes>
    </TestLayout>
  );
}

export default Test;
