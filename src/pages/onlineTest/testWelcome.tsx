import { Card, Col, List, Row, Statistic } from "antd";
import MyLottie from "../../components/lottie";
import "./css/testWelcome.css";
import {
  DatabaseOutlined,
  HistoryOutlined,
  RightCircleFilled,
  RightOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import userEvent from "@testing-library/user-event";
import { loadMultipleTestSet, loadSingleTestSet } from "../../services/dataset.service";
import { loadMultipleTestRecord, loadSingleTestRecord } from "../../services/record.service";

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
    desc: "将测试结果可视化展示",
  },
  {
    hasArrow: false,
    type: "light-download-from-cloud",
    title: "下载测试结果",
    desc: "从云端下载测试结果",
  },
];

const TestWelcome = () => {
  const navigate = useNavigate();

  const [singleNum,setSingleNum] = useState(0);
  const [multipleNum,setMultipleNum] = useState(0);
  const [singleRecordNum,setSingleRecordNum] = useState(0);
  const [multipleRecordNum,setMultipleRecordNum] = useState(0);

  useEffect(()=>{
    loadSingleTestSet().then((res)=>{
      if(res.code===0){
        setSingleNum(res.count);
      }
      else console.log(res)
    });
    loadMultipleTestSet().then((res)=>{
      if(res.code===0){
        setMultipleNum(res.count);
      }else console.log(res);
    })
    loadSingleTestRecord().then((res)=>{
      if(res.code===0){
        setSingleRecordNum(res.count);
      }else console.log(res);
    })
    loadMultipleTestRecord().then((res)=>{
      if(res.code===0){
        setMultipleRecordNum(res.count);
      }else console.log(res);
    })
  },[])

  return (
    <div className="Content2">
      <div className="TextWrapper">
        <p
          style={{
            width: "100%",
            height: "100%",
            margin: "0 auto",
            padding: "0",
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
                    <h3 style={{ color: "white" }}>{item.title}</h3>
                    <p style={{ color: "#f5f5f5" }}>{item.desc}</p>
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
      </div>

      <div
        style={{
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
                <div style={{ color: "#c8c5f7" }}>
                  <DatabaseOutlined />
                  测试集
                </div>
              }
              onClick={() => navigate("/test/dataset")}
              extra={<RightOutlined style={{ color: "#c8c5f7" }} />}
              bordered={true}
              hoverable={true}
              style={{ backgroundColor: "white" }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic
                    title={
                      <p
                        style={{
                          color: "#c8c5f7",
                          margin: "0",
                          padding: "0",
                        }}
                      >
                        单条
                      </p>
                    }
                    value={singleNum}
                    valueStyle={{ color: "#c8c5f7" }}
                  />
                </Col>

                <Col span={12}>
                  <Statistic
                    title={
                      <p
                        style={{ color: "#c8c5f7", margin: "0", padding: "0" }}
                      >
                        多条
                      </p>
                    }
                    value={multipleNum}
                    valueStyle={{ color: "#c8c5f7" }}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={2}></Col>
          <Col span={4}>
            <Card
              title={
                <div style={{ color: "white" }}>
                  <HistoryOutlined />
                  测试记录
                </div>
              }
              extra={<RightOutlined style={{ color: "white" }} />}
              onClick={() => navigate("/test/record")}
              bordered={true}
              hoverable={true}
              style={{ backgroundColor: "rgb(200, 197, 247)" }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic
                    title={
                      <p style={{ color: "white", margin: "0", padding: "0" }}>
                        单条
                      </p>
                    }
                    value={singleRecordNum}
                    valueStyle={{ color: "white" }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title={
                      <p style={{ color: "white", margin: "0", padding: "0" }}>
                        多条
                      </p>
                    }
                    value={multipleRecordNum}
                    valueStyle={{ color: "white" }}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TestWelcome;
