import { FloatButton, List, Steps } from "antd";
import MyLottie from "../../components/lottie";
import "./css/content.css";
import {
  RightCircleFilled,
  CloudUploadOutlined,
  CheckCircleFilled,
  CloudDownloadOutlined,
  CloudSyncOutlined,
  FundViewOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import MyIcon from "../../components/iconfont";
import ExitModal from "./exitModal";
import { useNavigate } from "react-router-dom";

const exciseAccess = [
  {
    hasArrow: true,
    type: "uploading-to-cloud",
    title: "上传训练集",
    desc: "上传训练集数据至云端",
  },
  {
    hasArrow: true,
    type: "headLoading",
    title: "在线训练",
    desc: "云端对模型进行在线训练",
  },
  {
    hasArrow: true,
    type: "real-time-data",
    title: "训练结果可视化",
    desc: "将训练结果可视化展示",
  },
  {
    hasArrow: false,
    type: "settings-updated",
    title: "下载训练模型",
    desc: "从云端下载训练完成后地模型",
  },
];

const Content = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [exitOpt,setExitOpt] = useState(0);

   const onCancelAction = () => {//确认退出
    if (exitOpt === 1) navigate("/");
    else navigate("/onlineTest");
    setModalOpen(false);
   };
   const onOkAction = () => {//取消退出
     setModalOpen(false);
   };

  return (
    <div className="Content1">
      <FloatButton
        style={{ left: 20, top: 10, zIndex: 999 }}
        icon={<HomeOutlined style={{ color: "#9da5fb" }} />}
        tooltip={<div placeholder="bottom">返回LyL主页</div>}
        onClick={() => {
          setModalOpen(true);
          setExitOpt(1);
        }}
      />
      <FloatButton
        style={{ left: 70, top: 10, zIndex: 999 }}
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

      <div className="TextWrapper">
        <p
          style={{
            width: "70%",
            margin: "0 auto",
            color: "#84868c",
            textAlign: "center",
            fontSize: "15px",
          }}
        >
          欢迎使用LyL分布式系统故障诊断系统在线训练功能
        </p>
        <p
          style={{
            width: "70%",
            margin: "0 auto",
            color: "#84868c",
            textAlign: "center",
            fontSize: "15px",
          }}
        >
          该功能基于带有故障标签的样本进行指标分析，训练故障分类模型，提高故障诊断的准确性和效率
        </p>
        <p
          style={{
            width: "70%",
            margin: "0 auto",
            color: "#84868c",
            textAlign: "center",
            fontSize: "15px",
          }}
        >
          你可以上传训练数据并在线训练，训练完成后可下载训练好的模型
        </p>
      </div>
      <div
        style={{
          margin: "0",
          padding: "0",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <List
          style={{ width: "80vw" }}
          dataSource={exciseAccess}
          grid={{
            gutter: 4,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 4,
          }}
          renderItem={(item) => (
            <>
              {item.hasArrow ? (
                <List.Item
                  style={{ display: "grid", gridTemplateColumns: "3fr 1fr" }}
                >
                  <div style={{ height: "40vh" }}>
                    <div
                      style={{
                        height: "20vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingBottom: "0",
                      }}
                    >
                      <MyLottie style={{ height: "80%" }} type={item.type} />
                    </div>
                    <h3 style={{ color: "#454a52" }}>{item.title}</h3>
                    <p style={{ color: "#84868c" }}>{item.desc}</p>
                  </div>
                  <div
                    style={{
                      height: "40vh",
                      //   width: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <RightCircleFilled
                      style={{ color: "#84868c", fontSize: "20px" }}
                    />
                  </div>
                </List.Item>
              ) : (
                <div style={{ height: "40vh" }}>
                  <List.Item
                    style={{
                      height: "20vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingBottom: "0",
                    }}
                  >
                    <MyLottie style={{ height: "80%" }} type={item.type} />
                  </List.Item>
                  <List.Item>
                    <h3 style={{ color: "#454a52" }}>{item.title}</h3>
                  </List.Item>
                  <List.Item>
                    <p style={{ color: "#84868c" }}>{item.desc}</p>
                  </List.Item>
                </div>
              )}
            </>
          )}
        />
        <div className="StepWrapper">
          <Steps
            direction="vertical"
            size="small"
            current={currentStep}
            status="process"
            items={[
              {
                title: "上传训练集",
                icon: (
                  <>
                    {currentStep === 0 ? (
                      <CloudUploadOutlined />
                    ) : (
                      <CheckCircleFilled />
                    )}
                  </>
                ),
              },
              {
                title: "在线训练",
                icon: (
                  <>
                    {currentStep <= 1 ? (
                      <CloudSyncOutlined />
                    ) : (
                      <CheckCircleFilled />
                    )}
                  </>
                ),
              },
              {
                title: "结果可视化",
                icon: (
                  <>
                    {currentStep <= 2 ? (
                      <FundViewOutlined />
                    ) : (
                      <CheckCircleFilled />
                    )}
                  </>
                ),
              },
              {
                title: "下载模型",
                disabled: true,
                icon: (
                  <>
                    {currentStep <= 3 ? (
                      <CloudDownloadOutlined />
                    ) : (
                      <CheckCircleFilled />
                    )}
                  </>
                ),
              },
            ]}
          />
        </div>
        <div className="LottieWrapper">
          <MyLottie type="people-brainstorming-and-get-feedback" />
        </div>
      </div>
    </div>
  );
};

export default Content;
