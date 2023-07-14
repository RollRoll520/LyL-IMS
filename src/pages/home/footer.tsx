import { Tooltip } from "antd";
import "./css/footer.css";
import { GithubOutlined } from "@ant-design/icons";

const Footer = ({ color = "#abc4ff" }) => {
  return (
    <div className="Footer">
      <p className="member">
        ©2023 Created by
        <Tooltip placement="top" title="仓库即将公开">
          <a href="https://github.com/RollRoll520" style={{paddingLeft:"10px", color: "#8b91df" ,textDecoration:"none" }}>
            <GithubOutlined />
            RollRoll520
          </a>
        </Tooltip>
      </p>
    </div>
  );
};

export default Footer;
