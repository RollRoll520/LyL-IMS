import { Header as Head } from "antd/es/layout/layout";
import "./css/header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="Header">
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
          // borderBottom: "2px solid #dedcf7",
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
