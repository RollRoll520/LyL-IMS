import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom"; //配置
import { ConfigProvider } from 'antd';
import zhCN from "antd/lib/locale/zh_CN";
import OnlineTest from './pages/onlineTest';
import OnlineExercise from './pages/onlineExercise';
import Home from './pages/home';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <ConfigProvider locale={zhCN}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onlineTest" element={<OnlineTest />} />
        <Route path="/onlineExercise" element={<OnlineExercise />} />
      </Routes>
    </ConfigProvider>
  </Router>
);


