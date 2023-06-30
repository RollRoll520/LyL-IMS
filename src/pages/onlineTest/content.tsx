import { FloatButton, List, Steps } from "antd";
import MyLottie from "../../components/lottie";
import "./css/content.css";
import {
  RightCircleFilled,
  CloudUploadOutlined,
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
    desc: "上传测试集数据至云端",
  },
  {
    hasArrow: true,
    type: "ai-animation",
    title: "在线测试",
    desc: "云端对模型进行在线测试",
  },
  {
    hasArrow: true,
    type: "real-time-data",
    title: "测试结果可视化",
    desc: "将在线测试结果可视化展示",
  },
  {
    hasArrow: false,
    type: "light-download-from-cloud",
    title: "下载测试结果",
    desc: "从云端下载测试结果",
  },
];

const Content = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(2);
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
            color: "white",
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
            color: "white",
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
            color: "#ffffff",
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
                    <h3 style={{ color: "white" }}>{item.title}</h3>
                    <p style={{ color: "#f5f5f5" }}>{item.desc}</p>
                  </div>
                  <div
                    style={{
                      height: "40vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <RightCircleFilled
                      style={{ color: "#f6f8fa", fontSize: "20px" }}
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
                    <h3 style={{ color: "white" }}>{item.title}</h3>
                  </List.Item>
                  <List.Item>
                    <p style={{ color: "#f5f5f5" }}>{item.desc}</p>
                  </List.Item>
                </div>
              )}
            </>
          )}
        />
        <div className="StepWrapper">
          <Steps
            style={{ backgroundColor: "white important" }}
            labelPlacement="vertical"
            direction="vertical"
            size="small"
            current={currentStep}
            status="finish"
            items={[
              {
                style: {
                  backgroundColor: "white !important",
                  fontWeight: "1000em",
                },
                title: "上传测试集",
                icon: (
                  <>
                    {currentStep === 0 ? (
                      <CloudUploadOutlined style={{ color: "#a9b2fc" }} />
                    ) : (
                      <CloudUploadOutlined style={{ color: "#4162e6" }} />
                    )}
                  </>
                ),
              },
              {
                title: "在线测试",
                icon: (
                  <>
                    {currentStep < 1 ? (
                      <CloudSyncOutlined style={{ color: "#a9b2fc" }} />
                    ) : (
                      <CloudSyncOutlined style={{ color: "#4162e6" }} />
                    )}
                  </>
                ),
              },
              {
                title: "结果可视化",
                icon: (
                  <>
                    {currentStep < 2 ? (
                      <FundViewOutlined style={{ color: "#a9b2fc" }} />
                    ) : (
                      <FundViewOutlined style={{ color: "#4162e6" }} />
                    )}
                  </>
                ),
              },
              {
                title: "下载结果",
                disabled: true,
                icon: (
                  <>
                    {currentStep < 3 ? (
                      <CloudDownloadOutlined style={{ color: "#a9b2fc" }} />
                    ) : (
                      <CloudDownloadOutlined style={{ color: "#4162e6" }} />
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
