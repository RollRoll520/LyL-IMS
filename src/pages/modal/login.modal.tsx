import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal, message } from "antd";
import { loginAPI } from "../../services/user.service";
import { useEffect, useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onLogin2Register: () => void;
  onOk: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onCancel,
  onLogin2Register,
  onOk,
}) => {
  const [remember, setRemember] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    if (storedUsername && storedPassword) {
      setUsername(storedUsername);
      setPassword(storedPassword);
      setRemember(true);
    }
  }, []);

  const onFinish = async (values: any) => {
    try {
      const res = await loginAPI(values);
      if (!res) {
        const error = "无响应！";
        throw error;
      }

      if (res && res.code === 0) {
        message.success("登录成功");
        if (remember) {
          localStorage.setItem("username", values.username);
          localStorage.setItem("password", values.password);
        } else {
          localStorage.removeItem("username");
          localStorage.removeItem("password");
        }
        onOk();
        onCancel();
      } else {
        const error = res.response.data.message;
        throw error;
      }
    } catch (err) {
      console.log(err);
      message.error("登录失败，请确认账号或密码是否输入正确");
    }
  };

  return (
    <Modal
      title="账号登陆"
      centered={true}
      open={isOpen}
      onCancel={() => {
        onCancel();
      }}
      maskClosable={false}
      footer={null}
    >
      <Form
        name="normal_login"
        className="login-form"
        style={{ maxWidth: "100%", marginTop: "20px" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="请输入用户名"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请输入密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          {/* <a style={{ float: "right" }} href="#1">
            忘记密码
          </a> */}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
          >
            登录
          </Button>
          <p>
            没有账号？{" "}
            <span
              style={{ color: "#1677ff", cursor: "pointer" }}
              onClick={onLogin2Register}
            >
              免费注册!
            </span>
          </p>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModal;
