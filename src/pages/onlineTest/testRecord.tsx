import {
  Card,
  Button,
  Form,
  Table,
  Space,
  Menu,
  MenuProps,
  Tooltip,
} from "antd";
import {
  BarChartOutlined,
  BlockOutlined,
  BorderOutlined,
  EditOutlined,
  FileZipOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loadMultipleTestRecord,
  loadSingleTestRecord,
} from "../../services/record.service";
import TestResultModal from "../modal/testResult.modal";
import { downloadTestApi } from "../../services/result.service";

const items: MenuProps["items"] = [
  {
    label: "单条测试记录",
    key: "single",
    icon: <BorderOutlined />,
  },
  {
    label: "批量测试记录",
    key: "multiple",
    icon: <BlockOutlined />,
  },
];

function TestRecord() {
  const navigate = useNavigate();
  const [myForm] = Form.useForm(); // 可以获取表单元素实例
  const [query, setQuery] = useState(1); // 查询条件
  const [data, setData] = useState<any>([]);
  const [total, setTotal] = useState(0); // 总数量
  const [currentId, setCurrentId] = useState(0); // 当前id，如果为空表示新增
  const [mode, setMode] = useState("single_test");
  const [resultOpen, setResultOpen] = useState(false);
  const [current, setCurrent] = useState("single");

  function download(url: any, name: any) {
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
  }

  // useEffect(() => {
  //   // 定时刷新数据

  //   const intervalId = setInterval(() => {
  //     if (current === "single") {
  //       loadSingleTestRecord().then((res) => {
  //         setData(res.result);
  //         setTotal(res.count);
  //       });
  //     } else if (current === "multiple") {
  //       loadMultipleTestRecord().then((res) => {
  //         if (res.code === 0) {
  //           setData(res.result);
  //           setTotal(res.count);
  //         } else {
  //         }
  //       });
  //     }
  //   }, 10000);

  //   // 组件销毁时清除定时器
  //   return () => clearInterval(intervalId);
  // }, []);

  useEffect(() => {
    loadSingleTestRecord().then((res) => {
      if (res.code === 0) {
        setData(res.result);
        setTotal(res.count);
      } else {
      }
    });
  }, []);

  const onResultCancel = () => {
    setResultOpen(false);
  };

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    if (e.key === "single") {
      loadSingleTestRecord().then((res) => {
        setData(res.result);
        setTotal(res.count);
      });
    } else {
      loadMultipleTestRecord().then((res) => {
        setData(res.result);
        setTotal(res.count);
      });
    }
  };

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <Card style={{ padding: "0px" }}>
        <Space direction="vertical" style={{ width: "100%", padding: "0px" }}>
          <Table
            dataSource={data}
            rowKey="id"
            columns={[
              {
                title: "测试记录编号",
                width: 80,
                align: "center",
                render(v, r: any) {
                  return <>{r.id}</>;
                },
              },
              {
                title: "测试集编号",
                width: 80,
                align: "center",
                render(v, r: any) {
                  return <>{r.dataset_id}</>;
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
                          color: "#7977ac",
                          borderColor: "#7977ac",
                        }}
                        onClick={() => {}}
                      /> */}
                      {r.remark}
                    </>
                  );
                },
              },
              {
                title: "测试时间",
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
                title: "测试用时",
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
                      <Tooltip title={"查看测试结果"}>
                        <Button
                          type="primary"
                          style={{ backgroundColor: "#7977ac" }}
                          icon={<BarChartOutlined />}
                          size="small"
                          onClick={() => {
                            setCurrentId(r.id);
                            setMode(r.mode);
                            setResultOpen(true);
                            console.log(currentId);
                          }}
                        />
                      </Tooltip>

                      {current === "multiple" && (
                      <Tooltip title={"下载测试结果"}>
                        <Button
                          type="primary"
                          style={{ backgroundColor: "#7977ac" }}
                          icon={<FileZipOutlined />}
                          size="small"
                          onClick={() => {
                            downloadTestApi(r.id).then((res) => {
                              console.log(res);
                              const str = JSON.stringify(res, null, 2);
                              const url = `data:,${str}`;
                              download(url, "result.json");
                            });
                          }}
                        />
                        </Tooltip>
                      )}

                      {/* <Popconfirm
                        title="是否确认删除此项?"
                        onConfirm={async () => {
                          //   await delProductByIdAPI(r.p_id);
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
      <TestResultModal
        isOpen={resultOpen}
        onCancel={onResultCancel}
        record_id={currentId}
        mode={mode}
      />
    </>
  );
}

export default TestRecord;
