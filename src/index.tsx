import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter as Router, Routes, Route } from "react-router-dom"; //配置
import { ConfigProvider } from 'antd';
import zhCN from "antd/lib/locale/zh_CN";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <ConfigProvider locale={zhCN}>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </ConfigProvider>
  </Router>
);


