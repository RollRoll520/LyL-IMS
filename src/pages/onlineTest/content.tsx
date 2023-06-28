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
import { useNavigate } from "react-router-dom";
import ExitModal from "../onlineExercise/exitModal";

const exciseAccess = [
  {
    hasArrow: true,
    type: "uploading-to-cloud",
    title: "上传测试集",
    desc: "上传训练集数据至云端",
  },
  {
    hasArrow: true,
    type: "ai-animation",
    title: "在线测试",
    desc: "云端在线对模型进行训练",
  },
  {
    hasArrow: true,
    type: "real-time-data",
    title: "测试结果可视化",
    desc: "将训练结果可视化展示",
  },
  {
    hasArrow: false,
    type: "download from cloud",
    title: "下载测试结果",
    desc: "从云端下载训练完成后地模型",
  },
];

const Content = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
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
    <div className="Content2">
      <FloatButton
        style={{ left: 20, top: 10, zIndex: 999 }}
        icon={<HomeOutlined style={{ color: "#9da5fb" }} />}
        tooltip={<div placeholder="bottom">返回LyL主页</div>}
        onClick={() => {
          setModalOpen(true);
          setExitOpt(0);
        }}
      />
      <FloatButton
        style={{ left: 70, top: 10, zIndex: 999 }}
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
          欢迎使用LyL分布式系统故障诊断系统在线测试功能
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
          你可以上传单条或批量测试样本进行测试
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
          该功能可视化分类结果，你可以直观地了解并下载测试样本的分类情况
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
            labelPlacement="vertical"
            direction="vertical"
            size="small"
            current={currentStep}
            status="process"
            items={[
              {
                title: "上传测试集",
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
                title: "在线测试",
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
                title: "下载结果",
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
          <MyLottie type="working-on-computer-desk-illustration" />
        </div>
      </div>
    </div>
  );
};

export default Content;
