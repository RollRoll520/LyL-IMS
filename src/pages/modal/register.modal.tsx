import { LockOutlined, MailOutlined, SmileOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, message } from "antd";
import { registerAPI } from "../../services/user.service";

interface RegisterModalProps {
  isOpen: boolean;
  onCancel:()=>void;
  onRegister2Login:()=>void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen ,onCancel,onRegister2Login}) => {
  const onFinish = async (values: any) => {
    try {
      const res = await registerAPI(values);
      if (!res) {
        const error = "无响应！";
        throw error;
      }
      if (res && res.code === 0) {
        message.success("注册成功");
        onRegister2Login();
      } else {
        const error = res;
        console.log(error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      message.error(`注册失败`);
    }
  };


  return (
    <Modal
      title="新用户注册"
      centered={true}
      open={isOpen}
      maskClosable={false}
      onCancel={onCancel}
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
            type="invite"
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
          <p>
            已有账号？ <span style={{ color: "#1677ff" ,cursor:"pointer"}} onClick={onRegister2Login}>立即登录!</span>
          </p>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RegisterModal;
