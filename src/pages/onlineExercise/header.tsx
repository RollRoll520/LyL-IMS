import { Header as Head } from "antd/es/layout/layout";
import "./css/header.css";
import { useNavigate } from "react-router-dom";
import { FloatButton } from "antd";
import { useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import MyIcon from "../../components/iconfont";
import ExitModal from "./exitModal";

const Header = () => {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [exitOpt, setExitOpt] = useState(0);

  const onCancelAction = () => {
    //确认退出
    if (exitOpt === 1) navigate("/");
    else navigate("/onlineTest");
    setModalOpen(false);
  };
  const onOkAction = () => {
    //取消退出
    setModalOpen(false);
  };

  return (
    <div className="Header">
      <Head
        style={{
          backgroundColor: "#182e67",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          width: "100%",
          zIndex: "999",
        }}
      >
        <FloatButton
          style={{ left: 20, top: 10, zIndex: 9999 }}
          icon={<HomeOutlined style={{ color: "#9da5fb" }} />}
          tooltip={<div placeholder="bottom">返回LyL主页</div>}
          onClick={() => {
            setModalOpen(true);
            setExitOpt(1);
          }}
        />
        <FloatButton
          style={{ left: 70, top: 10, zIndex: 9999 }}
          icon={<MyIcon type="icon-pingtaishujuceshi" />}
          tooltip={<div placeholder="bottom">前往在线测试</div>}
          onClick={() => {
            setModalOpen(true);
            setExitOpt(0);
          }}
        />
        <ExitModal
          isOpen={modalOpen}
          onCancel={onCancelAction}
          onOk={onOkAction}
        />
        <img
          height={"30px"}
          src="https://roll0814.cn/ftp-images/soft-lyl/logoOfLyL.svg"
          alt="回到LyL主页"
          title="回到LyL主页"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        <p className="Title1" style={{ fontSize: "20px", lineHeight: "100%" }}>
          <span style={{ color: "#d1dbf9" }}>LyL</span>
          <span style={{ color: "#bbb6f1" }}>分布式系统</span>
          <span style={{ color: "#d1dbf9" }}>故障诊断</span>
          <span style={{ color: "#bbb6f1" }}>系统</span>
        </p>
      </Head>
    </div>
  );
};
export default Header;
