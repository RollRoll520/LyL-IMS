import { Button, Col, Dropdown, Modal } from "antd";
import "./css/banner.css";
import MyIcon from "../../components/iconfont";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../modal/login.modal";
import RegisterModal from "../modal/register.modal";
import { getUser, logout } from "../../utils/tools";

type User = {
  id: string | null;
  username: string | null;
  role: string | null;
};

const Banner = () => {
  const [showContent, setShowContent] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [greeting, setGreeting] = useState("");

  const onLoginCancel = () => {
    setLoginOpen(false);
    Modal.destroyAll();
  };
  const onOk = async () => {
    setUser(await getUser());
  };
  const onLogin2Register = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  const onRegister2Login = () => {
    setRegisterOpen(false);
    setLoginOpen(true);
  };

  const onRegisterCancel = () => {
    setRegisterOpen(false);
  };

  useEffect(() => {
    async function updateUser() {
      const res = await getUser();
      if (res.id !== null) setUser(res);
      console.log(res);
    }
    updateUser();
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 6 && hour < 12) {
      setGreeting("早上好!");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("下午好!");
    } else {
      setGreeting("晚上好!");
    }
  }, []);

  function preventDefault(event: WheelEvent) {
    event.preventDefault();
  }

  //控制动画效果
  useEffect(() => {
    if (showContent) {
      window.addEventListener("wheel", preventDefault, { passive: false });

      const targetY = window.scrollY + window.innerHeight;
      let currentY = window.scrollY;

      const animateScroll = () => {
        currentY += (targetY - currentY) * 0.1;
        window.scrollTo(0, currentY);

        if (Math.abs(currentY - targetY) > 1) {
          window.requestAnimationFrame(animateScroll);
        } else {
          setShowContent(false);
          window.removeEventListener("wheel", preventDefault);
        }
      };

      window.requestAnimationFrame(animateScroll);
    }
  }, [showContent]);

  return (
    <div className="Banner">
      <LoginModal
        isOpen={loginOpen}
        onCancel={onLoginCancel}
        onLogin2Register={onLogin2Register}
        onOk={onOk}
      />
      <RegisterModal
        isOpen={registerOpen}
        onCancel={onRegisterCancel}
        onRegister2Login={onRegister2Login}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginLeft: "auto",
          paddingTop: "30px",
          marginRight: "30px",
          fontSize: "16px",
        }}
      >
        {(!user || user.id === null) && (
          <div style={{ margin: "0" }}>
            <p
              onClick={() => {
                setLoginOpen(true);
              }}
              style={{
                color: "white",
                cursor: "pointer",
              }}
            >
              登录
            </p>
            <div style={{ color: "white", cursor: "default" }}> / </div>
            <p
              onClick={() => {
                setRegisterOpen(true);
              }}
              style={{ color: "#9a91fb", cursor: "pointer" }}
            >
              注册
            </p>
          </div>
        )}
        <Dropdown
          menu={{
            items: [
              {
                label: (
                  <span
                    onClick={async () => {
                      await logout();
                      const res = await getUser();
                      setUser(res);
                    }}
                    style={{ color: "#9a91fb" }}
                  >
                    退出
                  </span>
                ),
                key: "logOut",
              },
            ],
          }}
        >
          <div>
            {user?.role === "teacher" && (
              <p
                style={{
                  color: "#9a91fb",
                  display: "flex",
                  alignContent: "center",
                  lineHeight: "25px",
                  margin: "0",
                }}
              >
                <MyIcon
                  style={{ fontSize: "25px" }}
                  type="icon-teacher"
                ></MyIcon>
                老师{greeting}
              </p>
            )}
            {user?.role === "admin" && (
              <p
                style={{
                  color: "#9a91fb",
                  display: "flex",
                  alignContent: "center",
                  lineHeight: "25px",
                  margin: "0",
                }}
              >
                <MyIcon
                  style={{ fontSize: "25px" }}
                  type="icon-guanliyuan"
                ></MyIcon>
                管理员{greeting}
              </p>
            )}
            {user?.role === "member" && (
              <p
                style={{
                  color: "#9a91fb",
                  display: "flex",
                  alignContent: "center",
                  lineHeight: "25px",
                  margin: "0",
                }}
              >
                <MyIcon
                  style={{ fontSize: "25px" }}
                  type="icon-member"
                ></MyIcon>
                <span style={{ color: "white" }}>{user.username}</span>
                {greeting}
              </p>
            )}
            {user?.role === "premium" && (
              <p
                style={{
                  color: "#9a91fb",
                  display: "flex",
                  alignContent: "center",
                  lineHeight: "25px",
                  margin: "0",
                }}
              >
                <MyIcon
                  style={{ fontSize: "25px" }}
                  type="icon-premium"
                ></MyIcon>
                <span style={{ color: "white" }}>尊贵的会员</span>
                {greeting}
              </p>
            )}
          </div>
        </Dropdown>
      </div>
      <div className="Title">
        <h1 className="Title1">
          <span style={{ color: "white" }}>LyL</span>
          <span style={{ color: "#9a91fb" }}>分布式系统</span>
          <span style={{ color: "white" }}>故障诊断</span>
          <span style={{ color: "#9a91fb" }}>系统</span>
        </h1>
        <p className="Des">
          基于<span style={{ color: "white" }}>机器学习</span>
          的分布式系统故障诊断模型在线
          <span style={{ color: "white" }}>训练、</span>在线
          <span style={{ color: "white" }}>测试</span>一站式解决方案
        </p>
        <Col>
          <Link to="/train/welcome">
            <Button
              className="link1 link-container"
              type="primary"
              style={{
                borderColor: "#9ea6fc",
                backgroundColor: "#9ea6fc",
                marginRight: "10px",
                fontWeight: "550",
              }}
              data-tooltip="点击进行在线训练"
            >
              在线训练
              <MyIcon type="icon-moxingxunlian" />
            </Button>
          </Link>
          <Link to="/test/welcome">
            <Button
              className="link2 link-container"
              type="primary"
              style={{
                borderColor: "white",
                backgroundColor: "white",
                color: "#9ea6fc",
                marginLeft: "10px",
                fontWeight: "550",
              }}
              data-tooltip="点击进行在线测试"
            >
              在线测试
              <MyIcon type="icon-pingtaishujuceshi" />
            </Button>
          </Link>
        </Col>
      </div>
      <div className="downIcon" onClick={() => setShowContent(true)}>
        <MyIcon type="icon-xiala" />
      </div>
      {showContent && <div style={{ height: "100vh" }} />}
    </div>
  );
};

export default Banner;
