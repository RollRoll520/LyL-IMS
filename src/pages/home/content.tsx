import { Card, Col, Row } from "antd";
import "./css/content.css";
import { useEffect, useState } from "react";
import { lazy, Suspense } from "react";

import { LoadingOutlined } from "@ant-design/icons";

const LazyMyLottie = lazy(() => import("../../components/lottie"));

const Content = () => {
  const [showDesc, setShowDesc] = useState(false);

  useEffect(() => {
    const descEle = document.querySelector(".desc");
    if (descEle == null) return;
    const descTop = descEle.getBoundingClientRect().top;

    const onScroll = () => {
      if (window.scrollY + window.innerHeight >= descTop) {
        setShowDesc(true);
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="Content">
      <h1 className="title">
        我们<span style={{ color: "#c1d3fe" }}>使用</span>了
      </h1>
      <div style={{ width: "80%", margin: "0 auto" }}>
        <Row
          className={`desc ${showDesc ? "show" : ""}`}
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
                  <Suspense
                    fallback={
                      <div style={{ color: "#172d66" }}>
                        <LoadingOutlined />
                        Loading...
                      </div>
                    }
                  >
                    <LazyMyLottie
                      type={"deepLearning"}
                      // url= {"deepLearning"}
                      style={{ color: "white", width: "100%" }}
                      speed={2}
                    />
                  </Suspense>
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
                  <Suspense
                    fallback={
                      <div style={{ color: "#172d66" }}>
                        <LoadingOutlined />
                        Loading...
                      </div>
                    }
                  >
                    <LazyMyLottie type={"react-dark"} />
                  </Suspense>
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
              cover={
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Suspense
                    fallback={
                      <div style={{ color: "#172d66" }}>
                        <LoadingOutlined />
                        Loading...
                      </div>
                    }
                  >
                    <LazyMyLottie type={"graphVision"} speed={1.5} />
                  </Suspense>
                </div>
              }
              bordered={false}
            ></Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Content;
