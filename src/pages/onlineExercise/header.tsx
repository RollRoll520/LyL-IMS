import { Header as Head } from "antd/es/layout/layout";
import "./css/header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="Header">
      <Head
        style={{
          backgroundColor: "#182e67",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
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
