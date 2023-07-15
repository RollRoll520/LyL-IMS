import { Card, Col, List, Row, Statistic } from "antd";
import MyLottie from "../../components/lottie";
import "./css/trainWelcome.css";
import {
  RightCircleFilled,
  DatabaseOutlined,
  RightOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadTrainSet, loadValidateSet } from "../../services/dataset.service";
import { loadTrainRecord } from "../../services/record.service";

const exciseAccess = [
  {
    hasArrow: true,
    type: "uploading-to-cloud",
    title: "上传训练集",
    desc: "上传训练数据至云端",
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
    desc: "从云端下载训练完成后的模型",
  },
];

const TrainWelcome = () => {
  const navigate = useNavigate();
  const [trainNum, setTrainNum] = useState(0);
  const [validateNum, setValidateNum] = useState(0);
  const [recordNum, setRecordNum] = useState(0);

  useEffect(() => {
    loadTrainSet().then((res) => {
      if (res.code === 0) {
        setTrainNum(res.count);
      } else {
      }
    });
    loadValidateSet().then((res) => {
      if (res.code === 0) {
        setValidateNum(res.count);
      } else {
      }
    });
    loadTrainRecord().then((res) => {
      if (res.code === 0) {
        setRecordNum(res.count);
      } else {
      }
    });
  }, []);

  return (
    <div className="Content1">
      <div className="TextWrapper">
        <p
          style={{
            width: "100%",
            height: "100%",
            margin: "0 auto",
            padding: "0",
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
          height: "40vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <List
          style={{ width: "85%" }}
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
                  <div style={{ height: "38vh" }}>
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
                      height: "38vh",
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
      </div>

      <div
        style={{
          // marginLeft: "40px",
          marginBottom: "100px",
          padding: "0",
          height: "20vh",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Row gutter={2} justify="center" style={{ textAlign: "center" }}>
          <Col span={4}>
            <Card
              title={
                <div style={{ color: "white" }}>
                  <HistoryOutlined />
                  数据集
                </div>
              }
              onClick={() => navigate("/train/dataset")}
              extra={<RightOutlined style={{ color: "white" }} />}
              bordered={true}
              hoverable={true}
              style={{ backgroundColor: "#182e67" }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic
                    title={
                      <p style={{ color: "white", margin: "0", padding: "0" }}>
                        训练集
                      </p>
                    }
                    value={trainNum}
                    valueStyle={{ color: "white" }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title={
                      <p style={{ color: "white", margin: "0", padding: "0" }}>
                        验证集
                      </p>
                    }
                    value={validateNum}
                    valueStyle={{ color: "white" }}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={2}></Col>
          <Col span={4}>
            <Card
              title={
                <div style={{ color: "#182e67" }}>
                  <DatabaseOutlined />
                  训练记录
                </div>
              }
              onClick={() => navigate("/train/record")}
              extra={<RightOutlined style={{ color: "#182e67" }} />}
              bordered={true}
              hoverable={true}
              style={{ backgroundColor: "white" }}
            >
              <Row justify="center" align="middle" gutter={16}>
                <Col span={24}>
                  <Statistic title="记录数" value={recordNum} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TrainWelcome;
