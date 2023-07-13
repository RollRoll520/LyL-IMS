import { LockOutlined, MailOutlined, SmileOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal } from "antd";

interface RegisterModalProps {
  isOpen: boolean;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen }) => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title="新用户注册"
      centered={true}
      open={isOpen}
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
        <Form.Item
          name="email"
          rules={[{ required: true, message: "请输入你的邮箱!" }]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="请填写你的邮箱"
          />
        </Form.Item>
        <Form.Item
          name="invite"
          rules={[{ required: false, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<SmileOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="请填写你的邀请码"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
          >
            注册
          </Button>
          已有账号？ <a href="#1">立即登录!</a>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RegisterModal;
