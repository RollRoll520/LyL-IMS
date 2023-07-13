import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom"; //配置
import { ConfigProvider } from 'antd';
import zhCN from "antd/lib/locale/zh_CN";
import OnlineTest from './pages/onlineTest';
import OnlineTrain from './pages/onlineTrain';
import Home from './pages/home';
import MyHeatmap from './components/antv/myHeatmap';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <ConfigProvider locale={zhCN}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onlineTest" element={<OnlineTest />} />
        <Route path="/onlineTrain" element={<OnlineTrain />} />
        <Route
          path="/testAntv"
          element={<MyHeatmap params={{ type: "train", record_id: 2 }} />}
        />
      </Routes>
    </ConfigProvider>
  </Router>
);


