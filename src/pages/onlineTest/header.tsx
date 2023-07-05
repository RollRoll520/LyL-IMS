import { Header as Head } from "antd/es/layout/layout";
import "./css/header.css";
import { useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { FloatButton } from "antd";
import MyIcon from "../../components/iconfont";
import ExitModal from "../onlineExercise/exitModal";

const Header = () => {
  const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const [exitOpt, setExitOpt] = useState(0);

    const onCancelAction = () => {
      //确认退出
      if (exitOpt === 0) navigate("/");
      else navigate("/onlineExercise");
      setModalOpen(false);
    };
    const onOkAction = () => {
      //取消退出
      setModalOpen(false);
    };

  return (
    <div className="Header">
      <FloatButton
        style={{ left: 20, top: 10, zIndex: 9999 }}
        icon={<HomeOutlined style={{ color: "#9da5fb" }} />}
        tooltip={<div placeholder="bottom">返回LyL主页</div>}
        onClick={() => {
          setModalOpen(true);
          setExitOpt(0);
        }}
      />
      <FloatButton
        style={{ left: 70, top: 10, zIndex: 9999 }}
        icon={<MyIcon type="icon-moxingxunlian-copy" />}
        tooltip={<div placeholder="bottom">前往在线训练</div>}
        onClick={() => {
          setModalOpen(true);
          setExitOpt(1);
        }}
      />
      <ExitModal
        isOpen={modalOpen}
        onCancel={onCancelAction}
        onOk={onOkAction}
      />
      <Head
        style={{
          backgroundColor: "#7977ac",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          width: "100%",
          zIndex: "999",
        }}
      >
        <img
          height={"30px"}
          src="https://roll0814.cn/ftp-images/soft-lyl/logoOfLyL.svg"
          alt="回到LyL主页"
          title="回到LyL主页"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        <p className="Title1" style={{ fontSize: "20px", lineHeight: "100%" }}>
          <span style={{ color: "white" }}>LyL</span>
          <span style={{ color: "#bbafe8" }}>分布式系统</span>
          <span style={{ color: "white" }}>故障诊断</span>
          <span style={{ color: "#bbafe8" }}>系统</span>
        </p>
      </Head>
    </div>
  );
};
export default Header;
