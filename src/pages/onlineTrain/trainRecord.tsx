import { Card, Button, Form, Table, Space, Tooltip, message } from "antd";
import {
  BarChartOutlined,
  CloudDownloadOutlined,
  DashboardOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadTrainRecord } from "../../services/record.service";
import TrainResultModal from "../modal/trainResult.modal";
import { getModelApi } from "../../services/model.service";
import { AxiosResponse } from "axios";
import { getUser } from "../../utils/tools";

function TrainRecord() {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false); // 控制modal显示和隐藏
  const [myForm] = Form.useForm(); // 可以获取表单元素实例
  const [resultOpen, setResultOpen] = useState(false);
  const [query, setQuery] = useState(1); // 查询条件
  const [data, setData] = useState<any>([]);
  const [total, setTotal] = useState(0); // 总数量
  const [currentId, setCurrentId] = useState(""); // 当前id，如果为空表示新增

  useEffect(() => {
    // 定时刷新数据
    const intervalId = setInterval(() => {
      loadTrainRecord().then((res) => {
        if (res.code === 0) {
          setData(res.result);
          setTotal(res.count);
        }
      });
    }, 5000);

    // 组件销毁时清除定时器
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    loadTrainRecord().then((res) => {
      if (res.code === 0) {
        setData(res.result);
        setTotal(res.count);
      }
    });
  }, []);

  const onResultCancel = () => {
    setResultOpen(false);
  };

  return (
    <>
      <Card style={{ padding: "0px" }} title="训练记录">
        <Space direction="vertical" style={{ width: "100%", padding: "0px" }}>
          <Table
            dataSource={data}
            rowKey="id"
            columns={[
              {
                title: "训练记录编号",
                width: 80,
                align: "center",
                render(v, r: any) {
                  return <>{r.id}</>;
                },
              },
              {
                title: "备注",
                width: 120,
                align: "center",
                render(v, r: any) {
                  return (
                    <>
                      {/* <Button
                        type="primary"
                        icon={<EditOutlined />}
                        size="small"
                        ghost
                        style={{
                          marginRight: "5px",
                          color: "#182e67",
                          borderColor: "#182e67",
                        }}
                        onClick={() => {
                          setIsShow(true);
                          setCurrentId(r.p_id);
                          myForm.setFieldsValue(r);
                        }}
                      /> */}
                      {r.remark}
                    </>
                  );
                },
              },
              {
                title: "训练时间",
                width: 120,
                align: "center",
                render(v, r) {
                  const date = new Date(r.start_time);
                  const year = date.getFullYear();
                  const month = ("0" + (date.getMonth() + 1)).slice(-2);
                  const day = ("0" + date.getDate()).slice(-2);
                  const hours = ("0" + date.getHours()).slice(-2);
                  const minutes = ("0" + date.getMinutes()).slice(-2);
                  const seconds = ("0" + date.getSeconds()).slice(-2);
                  return (
                    <>{`${year}.${month}.${day}/${hours}:${minutes}:${seconds}`}</>
                  );
                },
              },
              {
                title: "训练用时",
                width: 120,
                align: "center",
                render(v, r) {
                  if (r.end_time == null) return null;
                  const startTime = new Date(r.start_time).getTime();
                  const endTime = new Date(r.end_time).getTime();
                  const durationSeconds = (endTime - startTime) / 1000;
                  const durationMinutes = Math.floor(durationSeconds / 60);
                  const durationSecondsRemainder = Math.floor(
                    durationSeconds % 60
                  );
                  return (
                    <>{`${durationMinutes} 分钟 ${durationSecondsRemainder} 秒`}</>
                  );
                },
              },
              {
                title: "操作",
                align: "center",
                width: 100,
                render(v, r: any) {
                  return (
                    <Space>
                      <Tooltip title={"查看可视化训练结果"}>
                        <Button
                          type="primary"
                          style={{ backgroundColor: "#182e67" }}
                          icon={<BarChartOutlined />}
                          size="small"
                          disabled={r.isExpired}
                          onClick={() => {
                            if (r.end_time === null)
                              message.warning(
                                "请耐心等待训练用时显示后查看结果！"
                              );
                            else {
                              setCurrentId(r.id);
                              setResultOpen(true);
                            }
                          }}
                        />
                        <TrainResultModal
                          isOpen={resultOpen}
                          onCancel={onResultCancel}
                          record_id={currentId}
                        />
                      </Tooltip>
                      <Tooltip title={"下载训练模型"}>
                        <Button
                          type="primary"
                          style={{ backgroundColor: "#182e67" }}
                          icon={<CloudDownloadOutlined />}
                          size="small"
                          disabled={r.isExpired}
                          onClick={async () => {
                            if (r.end_time === null)
                              message.warning(
                                "请耐心等待训练用时显示后下载训练模型！"
                              );
                            else {
                              const user = await getUser();
                              getModelApi(r.id).then((res) => {
                                const file = res.result.file;
                                const link = document.createElement("a");
                                link.href =
                                  "https://roll0814.cn/application/lyl/backend/result/model/" +
                                  `${user.id}` +
                                  "/" +
                                  file;
                                console.log(link.href);
                                link.download = "model.joblib";
                                document.body.appendChild(link);
                                link.click();
                                link.remove();
                              });
                              // getModelApi(r.id).then(
                              //   (response: AxiosResponse) => {
                              //     const data = new Blob([response.data], {
                              //       type: "application/octet-stream",
                              //     });
                              //     const reader = new FileReader();
                              //     reader.readAsArrayBuffer(data);
                              //     reader.onload = () => {
                              //       const url = URL.createObjectURL(data);
                              //       const link = document.createElement("a");
                              //       link.href = url;
                              //       link.download = "model.joblib";
                              //       document.body.appendChild(link);
                              //       link.click();
                              //       link.remove();
                              //     };
                              //   }
                              // );
                            }
                          }}
                        />
                      </Tooltip>
                      <Tooltip title={"前往在线测试"}>
                        <Button
                          type="primary"
                          style={{ backgroundColor: "#182e67" }}
                          icon={<DashboardOutlined />}
                          size="small"
                          disabled={r.isExpired}
                          onClick={() => {
                            navigate("/test/welcome");
                          }}
                        />
                      </Tooltip>

                      {/* <Popconfirm
                        title="是否确认删除此项?"
                        onConfirm={async () => {
                          setQuery(1); // 重新加载数据
                        }}
                      >
                        <Button
                          type="primary"
                          icon={<DeleteOutlined />}
                          size="small"
                          danger
                        />
                      </Popconfirm> */}
                    </Space>
                  );
                },
              },
            ]}
            // 分页
            pagination={{
              pageSize: 5,
              total, // 总数量
              // 页码改变的时候执行
              onChange(page) {
                setQuery(page);
              },
            }}
          />
        </Space>
      </Card>
    </>
  );
}

export default TrainRecord;
