import { Card, Col, Row } from "antd";
import "./css/content.css";
import MyLottie from "../../components/lottie";

const Content = () => {
  return (
    <div className="Content">
      <h1 className="title">
        我们<span style={{ color: "#c1d3fe" }}>使用</span>了
      </h1>
      <div style={{ width: "80%", margin: "0 auto" }}>
        <Row
          className="desc"
          justify="center"
          gutter={20}
          style={{ height: "50%" }}
        >
          <Col span={7}>
            <Card
              title="神经网络训练模型"
              style={{ backgroundColor: "#9fa0ff", height: "85%" }}
              headStyle={{ color: "white" }}
              cover={
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MyLottie
                    type={"deepLearning"}
                    style={{ color: "white", width: "100%" }}
                    speed={2}
                  />
                </div>
              }
              bordered={false}
            ></Card>
          </Col>
          <Col span={7}>
            <Card
              title="React框架"
              style={{ backgroundColor: "#9fa0ff", height: "85%" }}
              headStyle={{ color: "white" }}
              cover={
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MyLottie type={"react-dark"}  />
                </div>
              }
              bordered={false}
            ></Card>
          </Col>
          <Col span={7}>
            <Card
              title="Antv数据可视化"
              style={{ backgroundColor: "#9fa0ff", height: "85%" }}
              headStyle={{ color: "white" }}
              cover={<MyLottie type={"graphVision"} speed={1.5} />}
              bordered={false}
            ></Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Content;
