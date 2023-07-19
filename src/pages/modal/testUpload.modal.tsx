import { InboxOutlined } from "@ant-design/icons";
import { Form,  Modal, Radio, UploadProps, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import Dragger from "antd/es/upload/Dragger";
import { getToken, serverUrl } from "../../utils/tools";
import { useState } from "react";

interface UploadModalProps {
  isOpen: boolean;
  onCancel: () => void;
}

const TestUploadModal: React.FC<UploadModalProps> = ({ isOpen, onCancel }) => {
  const [modeValue, setModeValue] = useState<string | undefined>(undefined); // 使用useState保存type字段的值

  const onFinish = async (values: any) => {
    console.log("Success:" + values);
  };

  const handleUpload = async (file: any) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("dataset", file);
    formData.append("type", form.getFieldValue("mode"));
    formData.append("remark", form.getFieldValue("remark"));

    const token = getToken();
    xhr.open("POST", serverUrl + "dataset/new", true);
    xhr.setRequestHeader("token", token!);

    xhr.upload.onprogress = function (e) {
      const percent = Math.round((e.loaded / e.total) * 100);
      message.loading(`上传进度：${percent}%`);
    };
    message.warning("请耐心等待服务器接收数据！");

    xhr.onload = function () {
      if (xhr.status === 200) {
        message.success("上传成功");
        onCancel();
      } else {
        message.error("上传失败");
      }
    };

    xhr.onerror = function () {
      console.log("上传失败");
    };

    xhr.send(formData);
  };

  const [form] = Form.useForm();

  // 监听 type 字段的值
  const handleModeChange = (e: any) => {
    setModeValue(e.target.value);
  };

  // 根据 type 字段的值来动态更新上传组件的 disabled 状态
  const props: UploadProps = {
    name: "dataset",
    multiple: false,
    customRequest: ({ file }) => handleUpload(file),
    disabled: !modeValue,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <Modal
      title="上传数据集"
      centered={true}
      open={isOpen}
      maskClosable={false}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        style={{ maxWidth: "100%", marginTop: "20px" }}
        onFinish={onFinish}
      >
        <Form.Item label="数据集类型" name="mode">
          <Radio.Group onChange={handleModeChange}>
            {" "}
            {/* 监听type字段值的变化 */}
            <Radio.Button value="single_test">单条测试集</Radio.Button>
            <Radio.Button value="mul_test">批量测试集</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="数据集备注" name="remark">
          <TextArea rows={2} required={true} />
        </Form.Item>
        <Form.Item>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽进行上传</p>
            <p className="ant-upload-hint">
              请确保你的数据集类型选择正确！否则将影响操作结果！
            </p>
          </Dragger>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TestUploadModal;
