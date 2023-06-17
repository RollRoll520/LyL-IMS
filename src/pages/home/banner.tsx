import { Button, Col } from "antd";
import "./css/banner.css";
import MyIcon from "../../components/iconfont";
import { DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const Banner = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (showContent) {
      const targetY = window.scrollY + window.innerHeight;
      let currentY = window.scrollY;

      const animateScroll = () => {
        currentY += (targetY - currentY) * 0.1;
        window.scrollTo(0, currentY);

        if (Math.abs(currentY - targetY) > 1) {
          window.requestAnimationFrame(animateScroll);
        } else {
          setShowContent(false);
        }
      };

      window.requestAnimationFrame(animateScroll);
    }
  }, [showContent]);

  return (
    <div className="Banner">
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
          <span style={{ color: "white" }}>训练</span>、在线
          <span style={{ color: "white" }}>测试</span>一站式解决方案
        </p>
        <Col>
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
        </Col>
      </div>
      <div className="downIcon" onClick={() => setShowContent(true)}>
        <DownOutlined />
      </div>
      {showContent && <div style={{ height: "100vh" }} />}
    </div>
  );
};

export default Banner;
