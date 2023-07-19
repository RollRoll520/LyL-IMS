import { Badge, Form, Input, Modal, Popover, Select, message } from "antd";
import { useEffect, useState } from "react";
import { customTestApi } from "../../services/model.service";
import { useNavigate } from "react-router-dom";
import { loadTrainRecord } from "../../services/record.service";

interface TestModalProps {
  isOpen: boolean;
  onCancel: () => void;
  id: any;
  mode:string
}

const TestModal: React.FC<TestModalProps> = ({ isOpen, onCancel, id ,mode}) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [value, setValue] = useState<string>();
  const [testId, setTestId] = useState("");
  const [testForm] = Form.useForm(); // 可以获取表单元素实例

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    setTestId(id);
    loadTrainRecord().then((res) => {
      if (res.code === 0) {
        setData(res.result);
      } else {
        console.log(res);
      }
    });
  }, [id]);

  const onTestFormFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("dataset_id",testId);
    formData.append("train_record_id", testForm.getFieldValue("train_record_id"));
    formData.append("remark", testForm.getFieldValue("remark"));
    formData.append("mode", mode==="mul_test"?"multiple":"single");

    const res = await Promise.race([
      customTestApi(formData), // 发送训练请求
      new Promise((resolve) => setTimeout(() => resolve({ code: 0 }), 5000)), // 3 秒后默认为成功
    ]);

    if (res.code === 0) {
      navigate("/test/record");
      message.success("测试成功！，点击操作查看结果");
      onCancel();
    } else {
      message.error(res.message || "训练失败，请稍后重试");
    }
    console.log(values);
  };

  return (
    <>
      <Modal
        title="选择验证集"
        centered={true}
        open={isOpen}
        onCancel={() => {
          onCancel();
        }}
        maskClosable={false}
        onOk={testForm.submit}
      >
        <Form
          name="normal_login"
          className="login-form"
          style={{ maxWidth: "100%", marginTop: "20px" }}
          initialValues={{ remember: true }}
          onFinish={onTestFormFinish}
          form={testForm}
        >
          <Badge.Ribbon color="#7977ac" text={<>测试集已选择{id}</>}>
            <Form.Item
              label="模型"
              name="train_record_id"
              rules={[
                {
                  required: true,
                  message: "请选择模型",
                },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                value={value}
                placeholder={"展开选择模型进行测试"}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={true}
                onChange={handleChange}
                notFoundContent={null}
                options={data?.map((item: any) => ({
                  value: item.id,
                  label: (
                    <Popover
                      placement="leftBottom"
                      title={"备注"}
                      content={item.remark}
                    >
                      <>
                        {!item.isExpired && (
                          <Badge
                            status="processing"
                            text={
                              <span style={{color:"#7977ab"}}>
                                {item.id}
                                <span style={{ color: "#c8c5f7" }}>
                                  (训练于{item.start_time})
                                </span>
                              </span>
                            }
                          />
                        )}
                      </>
                    </Popover>
                  ),
                }))}
              />
            </Form.Item>
            <Form.Item
              label="测试备注"
              name="remark"
              rules={[
                {
                  required: true,
                  message: "请输入测试备注",
                },
              ]}
            >
              <Input type="text" placeholder="请输入此次测试备注" />
            </Form.Item>
          </Badge.Ribbon>
        </Form>
      </Modal>
    </>
  );
};

export default TestModal;
