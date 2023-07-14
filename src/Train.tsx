import { Route, Routes } from "react-router-dom";
import TrainWelcome from "./pages/onlineTrain/trainWelcome";
import TrainDataset from "./pages/onlineTrain/trainDataset";
import TrainRecord from "./pages/onlineTrain/trainRecord";
import TrainLayout from "./pages/onlineTrain/component/TrainLayout";

function Train() {
  return (
    <TrainLayout>
      <Routes>
        <Route path="welcome" element={<TrainWelcome />}></Route>
        <Route path="dataset" element={<TrainDataset />}></Route>
        <Route path="record" element={<TrainRecord />}></Route>
      </Routes>
    </TrainLayout>
  );
}

export default Train;
