import { Badge, Form, Input, Modal, Popover, Select, message } from "antd";
import { useEffect, useState } from "react";
import { loadTrainSet, loadValidateSet } from "../../services/dataset.service";
import { trainModelApi } from "../../services/model.service";
import { useNavigate } from "react-router-dom";

interface TrainModalProps {
  isOpen: boolean;
  trainOrValidate: boolean;
  onCancel: () => void;
  id: any;
}

const TrainModal: React.FC<TrainModalProps> = ({
  isOpen,
  onCancel,
  trainOrValidate,
  id,
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [value, setValue] = useState<string>();
  const [trainId, setTrainId] = useState("");
  const [validateId, setValidateId] = useState("");
  const [trainForm] = Form.useForm(); // 可以获取表单元素实例
  const [validateForm] = Form.useForm(); // 可以获取表单元素实例

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (trainOrValidate) {
      setTrainId(id);
      loadValidateSet().then((res) => {
        if (res.code === 0) {
          setData(res.result);
        } else {
          console.log(res);
        }
      });
    } else {
      setValidateId(id);
      loadTrainSet().then((res) => {
        if (res.code === 0) {
          setData(res.result);
        } else {
          console.log(res);
        }
      });
    }
  }, [id, trainOrValidate]);

  const onValidateFormFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("train_set_id", trainId);
    formData.append(
      "validate_set_id",
      validateForm.getFieldValue("validate_id")
    );
    formData.append("remark", validateForm.getFieldValue("remark"));

    const res = await Promise.race([
      trainModelApi(formData), // 发送训练请求
      new Promise((resolve) => setTimeout(() => resolve({ code: 0 }), 3000)), // 3 秒后默认为成功
    ]);

    if (res.code === 0) {
      navigate("/train/record");
      message.success("已开始训练，请稍后查看结果");
      onCancel();
    } else {
      message.error(res.message || "训练失败，请稍后重试");
    }
    console.log(values);
  };

  const onTrainFormFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("validate_set_id", validateId);
    formData.append("train_set_id", trainForm.getFieldValue("train_id"));
    formData.append("remark", trainForm.getFieldValue("remark"));

    const res = await Promise.race([
      trainModelApi(formData), // 发送训练请求
      new Promise((resolve) => setTimeout(() => resolve({ code: 0 }), 3000)), // 3 秒后默认为成功
    ]);

    if (res.code === 0) {
      navigate("/train/record");
      message.success("已开始训练，请在显示训练用时后查看结果");
      onCancel();
    } else {
      message.error(res.message || "训练失败，请稍后重试");
    }
    console.log(values);
  };

  return (
    <>
      {trainOrValidate && (
        <Modal
          title="选择验证集"
          centered={true}
          open={isOpen}
          onCancel={() => {
            onCancel();
          }}
          maskClosable={false}
          onOk={validateForm.submit}
        >
          <Form
            name="normal_login"
            className="login-form"
            style={{ maxWidth: "100%", marginTop: "20px" }}
            initialValues={{ remember: true }}
            onFinish={onValidateFormFinish}
            form={validateForm}
          >
            <Badge.Ribbon
              color="#182e67"
              text={
                <>
                  {id === 230000001 && <>已选择默认训练集</>}
                  {id !== 230000001 && <>训练集已选择{id}</>}
                </>
              }
            >
              <Form.Item
                label="验证集"
                name="validate_id"
                rules={[
                  {
                    required: true,
                    message: "请选择验证集",
                  },
                ]}
              >
                <Select
                  style={{ width: "100%" }}
                  value={value}
                  placeholder={"展开选择验证集"}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={true}
                  onChange={handleChange}
                  notFoundContent={null}
                  options={data?.map((item: any) => ({
                    value: item.id,
                    label: (
                      <>
                        <Popover
                          placement="leftBottom"
                          title={"备注"}
                          content={item.remark}
                        >
                          {item.u_id === 0 && (
                            <Badge status="default" text={item.remark} />
                          )}
                          {item.u_id !== 0 && item.state === "isWaiting" && (
                            <Badge
                              status="processing"
                              text={
                                <span style={{ color: "#7977ab" }}>
                                  {item.id}
                                  <span style={{ color: "#c8c5f7" }}>
                                    (上传于{item.upload_time})
                                  </span>
                                </span>
                              }
                            />
                          )}
                          {item.u_id !== 0 && item.state === "isFinished" && (
                            <Badge
                              status="success"
                              text={
                                <span style={{ color: "#182e67" }}>
                                  {item.id}
                                  <span style={{ color: "#182e67" }}>
                                    (上传于{item.upload_time})
                                  </span>
                                </span>
                              }
                            />
                          )}
                          {item.u_id !== 0 && item.state === "isExpired" && (
                            <Badge
                              status="warning"
                              text={
                                <span style={{ color: "#182e67" }}>
                                  {item.id}
                                  <span style={{ color: "#182e67" }}>
                                    (上传于{item.upload_time})
                                  </span>
                                </span>
                              }
                            />
                          )}
                        </Popover>
                      </>
                    ),
                  }))}
                />
              </Form.Item>
              <Form.Item
                label="训练备注"
                name="remark"
                rules={[
                  {
                    required: true,
                    message: "请输入训练备注",
                  },
                ]}
              >
                <Input type="text" placeholder="请输入此次训练备注" />
              </Form.Item>
            </Badge.Ribbon>
          </Form>
        </Modal>
      )}
      {!trainOrValidate && (
        <Modal
          title="选择训练集"
          centered={true}
          open={isOpen}
          onCancel={() => {
            onCancel();
          }}
          maskClosable={false}
          onOk={trainForm.submit}
        >
          <Form
            name="normal_train"
            style={{ maxWidth: "100%", marginTop: "20px" }}
            onFinish={onTrainFormFinish}
            form={trainForm}
          >
            <Badge.Ribbon
              color="#182e67"
              text={
                <>
                  {id === 230000002 && <>已选择默认验证集</>}
                  {id !== 230000002 && <>验证集已选择{id}</>}
                </>
              }
            >
              <Form.Item
                label="训练集"
                name="train_id"
                rules={[
                  {
                    required: true,
                    message: "请选择训练集",
                  },
                ]}
              >
                <Select
                  style={{ width: "100%" }}
                  value={value}
                  placeholder={"展开选择训练集"}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={true}
                  onChange={handleChange}
                  notFoundContent={null}
                  options={data?.map((item: any) => ({
                    value: item.id,
                    label: (
                      <>
                        <Popover
                          placement="leftBottom"
                          title={"备注"}
                          content={item.remark}
                        >
                          {item.u_id === 0 && (
                            <Badge status="default" text={item.remark} />
                          )}
                          {item.u_id !== 0 && item.state === "isWaiting" && (
                            <Badge
                              status="processing"
                              text={
                                <span style={{ color: "#182e67" }}>
                                  {item.id}
                                  <span style={{ color: "#182e67" }}>
                                    (上传于{item.upload_time})
                                  </span>
                                </span>
                              }
                            />
                          )}
                          {item.u_id !== 0 && item.state === "isFinished" && (
                            <Badge
                              status="success"
                              text={
                                <span style={{ color: "#182e67" }}>
                                  {item.id}
                                  <span style={{ color: "#182e67" }}>
                                    (上传于{item.upload_time})
                                  </span>
                                </span>
                              }
                            />
                          )}
                          {item.u_id !== 0 && item.state === "isExpired" && (
                            <Badge
                              status="warning"
                              text={
                                <span style={{ color: "#182e67" }}>
                                  {item.id}
                                  <span style={{ color: "#182e67" }}>
                                    (上传于{item.upload_time})
                                  </span>
                                </span>
                              }
                            />
                          )}
                        </Popover>
                      </>
                    ),
                  }))}
                />
              </Form.Item>
              <Form.Item
                label="训练备注"
                name="remark"
                rules={[
                  {
                    required: true,
                    message: "请输入训练备注",
                  },
                ]}
              >
                <Input type="text" placeholder="请输入此次训练备注" />
              </Form.Item>
            </Badge.Ribbon>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default TrainModal;
