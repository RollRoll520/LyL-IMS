import {
  DeploymentUnitOutlined,
  FormOutlined,
  GithubOutlined,
  HomeOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, Tooltip } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MyIcon from "../../../components/iconfont";
import RegisterModal from "../../modal/register.modal";
import MyLottie from "../../../components/lottie";
import LoginModal from "../../modal/login.modal";
import { getUser, logout } from "../../../utils/tools";

const { Header, Sider, Content } = Layout;

const rootMenuKeys = ["welcome", "dataset", "record"];

type User = {
  id: string | null;
  username: string | null;
  role: string | null;
};

const TrainLayout = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginOpen, setLoginOpen] = useState(false); //登录对话
  const [registerOpen, setRegisterOpen] = useState(false); //注册对话
  const [user, setUser] = useState<User>(); //用户
  const [greeting, setGreeting] = useState(""); //hello
  const [selectedKey,setSelectedKey] = useState([""]);

  const onLoginCancel = () => {
    setLoginOpen(false);
  };
  const onOk = async () => {
    setUser(await getUser());
  };

  const onRegisterCancel = () => {
    setRegisterOpen(false);
  };

  const onLogin2Register = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  const onRegister2Login = () => {
    setRegisterOpen(false);
    setLoginOpen(true);
  };

  const onLogout = async () => {
    await logout();
    setUser(undefined);
    navigate("/train/");
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

  useEffect(() => {
    const currentPath = location.pathname;
    const currentSubmenuKey = rootMenuKeys.find((key) =>
      currentPath.startsWith(`/train/${key}`)
    );

    setSelectedKey(currentSubmenuKey ? [currentSubmenuKey] : []);
  }, [location.pathname]);

  return (
    <Layout
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Header
        style={{
          backgroundColor: "#182e67",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          zIndex: "999",
        }}
      >
        <RegisterModal
          isOpen={registerOpen}
          onCancel={onRegisterCancel}
          onRegister2Login={onRegister2Login}
        />
        <LoginModal
          isOpen={loginOpen}
          onCancel={onLoginCancel}
          onLogin2Register={onLogin2Register}
          onOk={onOk}
        />

        <div
          className="title"
          style={{
            display: "flex",
            alignItems: "center",
            margin: "0",
            padding: "0",
            height: "100%",
          }}
        >
          <Tooltip placement="bottom" title={"返回主页"}>
            <Button
              icon={<HomeOutlined style={{ color: "#9da5fb" }} />}
              shape="circle"
              style={{ marginRight: "10px" }}
              onClick={() => {
                navigate("/");
              }}
            ></Button>
          </Tooltip>

          <Tooltip placement="bottom" title={"前往在线测试"}>
            <Button
              icon={<MyIcon type="icon-pingtaishujuceshi" />}
              shape="circle"
              style={{ marginRight: "10px" }}
              onClick={() => {
                navigate("/test/welcome");
              }}
            ></Button>
          </Tooltip>

          <img
            height={"30px"}
            src="https://roll0814.cn/ftp-images/soft-lyl/logoOfLyL.svg"
            alt="回到LyL主页"
            title="回到LyL主页"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          <p
            className="Title1"
            style={{ fontSize: "20px", lineHeight: "100%" }}
          >
            <span style={{ color: "#d1dbf9" }}>LyL</span>
            <span style={{ color: "#bbb6f1" }}>分布式系统</span>
            <span style={{ color: "#d1dbf9" }}>故障诊断</span>
            <span style={{ color: "#bbb6f1" }}>系统</span>
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "8px",
            fontSize: "16px",
          }}
        >
          {(!user || user?.role === null) && (
            <>
              <MyIcon
                style={{ fontSize: "25px" }}
                type="icon-wode_weidenglu"
              ></MyIcon>
              <p
                onClick={() => {
                  setLoginOpen(true);
                }}
                style={{
                  marginLeft: "10px",
                  color: "#9ea6fc",
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
                style={{ color: "white", cursor: "pointer" }}
              >
                注册
              </p>
            </>
          )}
          <Dropdown
            menu={{
              items: [
                {
                  label: (
                    <span onClick={onLogout} style={{ color: "#182e67" }}>
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
                    color: "#d1dbf9",
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
      </Header>
      <Layout>
        <Sider style={{ backgroundColor: "white", height: "100%" }}>
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={selectedKey}
            defaultSelectedKeys={["welcome"]}
            style={{ backgroundColor: "white" }}
          >
            <Menu.Item key="welcome" icon={<DeploymentUnitOutlined />}>
              <Link to="welcome">概览</Link>
            </Menu.Item>
            <Menu.Item key="dataset" icon={<FormOutlined />}>
              <Link to="dataset">数据集管理</Link>
            </Menu.Item>
            <Menu.Item key="record" icon={<ThunderboltOutlined />}>
              <Link to="record">训练记录</Link>
            </Menu.Item>
          </Menu>
          <div style={{ position: "absolute", bottom: "0" }}>
            <MyLottie type="people-brainstorming-and-get-feedback" />
            <p style={{ width: "100%", textAlign: "center", color: "#5e5e5e" }}>
              ©2023 Created by
              <br />
              <Tooltip placement="top" title="仓库即将公开">
                <a
                  href="https://github.com/RollRoll520"
                  style={{ color: "#182e67" }}
                >
                  <GithubOutlined />
                  RollRoll520
                </a>
              </Tooltip>
            </p>
          </div>
        </Sider>
        <Layout>
          <Content
            style={{
              marginTop: "10px",
              marginLeft: "8px",
              marginRight: "8px",
              padding: 0,
              width: "auto",
              minHeight: 280,
              overflow: "auto",
              backgroundColor: "white",
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default TrainLayout;
