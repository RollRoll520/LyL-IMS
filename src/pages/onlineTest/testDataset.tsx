import {
  Card,
  Button,
  Table,
  Space,
  Menu,
  MenuProps,
  Badge,
  Tooltip,
} from "antd";
import {
  BlockOutlined,
  BorderOutlined,
  CloudUploadOutlined,
  DashboardOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "./css/testDataset.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TestUploadModal from "../modal/testUpload.modal";
import {
  loadMultipleTestSet,
  loadSingleTestSet,
} from "../../services/dataset.service";
import TestModal from "../modal/test.modal";

const items: MenuProps["items"] = [
  {
    label: "单条测试集",
    key: "single_test",
    icon: <BorderOutlined />,
  },
  {
    label: "批量测试集",
    key: "mul_test",
    icon: <BlockOutlined />,
  },
];

function TestDataset() {
  const navigate = useNavigate();
  const [query, setQuery] = useState(1); // 查询条件
  const [data, setData] = useState<any>([]);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [current, setCurrent] = useState("single_test");
  const [testOpen, setTestOpen] = useState(false);
  const [total, setTotal] = useState(0); // 总数量
  const [currentId, setCurrentId] = useState(""); // 当前id，如果为空表示新增

  function refreshDatasetList() {
    if (current === "single_test") {
      loadSingleTestSet().then((res) => {
        if (res.code === 0) {
          setData(res.result);
          setTotal(res.count);
        } else {
          console.log(res);
        }
      });
    } else {
      loadMultipleTestSet().then((res) => {
        if (res.code === 0) {
          setData(res.result);
          setTotal(res.count);
        } else {
          console.log(res);
        }
      });
    }
  }

  const onUploadCancel = () => {
    refreshDatasetList();
    setUploadOpen(false);
  };

  const onTestCancel = () => {
    refreshDatasetList();
    setTestOpen(false);
  };

  useEffect(() => {
    loadSingleTestSet().then((res) => {
      if (res.code === 0) {
        setData(res.result);
        setTotal(res.count);
      } else {
        console.log(res);
      }
    });
  }, []);

  useEffect(() => {
    if (current === "mul_test") {
      loadMultipleTestSet().then((res) => {
        if (res.code === 0) {
          setData(res.result);
          setTotal(res.count);
        } else {
          console.log(res);
        }
      });
    } else {
      loadSingleTestSet().then((res) => {
        if (res.code === 0) {
          setData(res.result);
          setTotal(res.count);
        } else {
          console.log(res);
        }
      });
    }
  }, [current]);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <>
      <div
        style={{
          padding: "0",
          marginLeft: "10px",
          marginTop: "10px",
          display: "inline-block",
        }}
      >
        <Button
          style={{ backgroundColor: "#c8c5f7" }}
          type="primary"
          icon={<CloudUploadOutlined />}
          onClick={() => {
            setUploadOpen(true);
          }}
        >
          上传测试集
        </Button>
      </div>
      <TestUploadModal isOpen={uploadOpen} onCancel={onUploadCancel} />
      <TestModal
        isOpen={testOpen}
        onCancel={onTestCancel}
        id={currentId}
        mode={current}
      ></TestModal>
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
            rowClassName={(r: any) => {
              return r.u_id === 0 ? "gray-row" : "";
            }}
            rowKey="id"
            columns={[
              {
                title: "数据集编号",
                width: 80,
                align: "center",
                render(v, r: any) {
                  if (r.u_id === 0) {
                    if (current === "mul_test")
                      return (
                        <div style={{ color: "#bbbbbb" }}>默认批量测试集</div>
                      );
                    else
                      return (
                        <div style={{ color: "#bbbbbb" }}>默认单条测试集</div>
                      );
                  } else return <>{r.id}</>;
                },
              },
              {
                title: "备注",
                width: 120,
                align: "center",
                render(v, r: any) {
                  if (r.u_id === 0)
                    return <div style={{ color: "#bbbbbb" }}>来自赛题官网</div>;
                  else
                    return (
                      <>
                        {/* <Button
                        type="primary"
                        icon={<EditOutlined />}
                        size="small"
                        ghost
                        style={{
                          marginRight: "5px",
                          color: "#c8c5f7",
                          borderColor: "#c8c5f7",
                        }}
                        onClick={() => {}}
                      /> */}
                        {r.remark}
                      </>
                    );
                },
              },
              {
                title: "测试进度",
                width: 80,
                align: "center",
                render(v, r: any) {
                  let label;
                  if (r.u_id === 0) {
                    label = (
                      <>
                        <div
                          style={{
                            color: "#bbbbbb",
                            lineHeight: "15px",
                            fontSize: "15px",
                          }}
                        >
                          <Badge status="default" />
                        </div>
                      </>
                    );
                  } else if (r.state === "isWaiting") {
                    label = (
                      <>
                        <div
                          style={{
                            color: "#007acc",
                            lineHeight: "15px",
                            fontSize: "15px",
                          }}
                        >
                          <Badge status="processing" text="未完成" />
                        </div>
                      </>
                    );
                  } else if (r.state === "isFinished") {
                    label = (
                      <>
                        <div
                          style={{
                            color: "#0e700e",
                            lineHeight: "15px",
                            fontSize: "15px",
                          }}
                        >
                          <Badge status="success" text="已完成" />
                        </div>
                      </>
                    );
                  } else {
                    label = (
                      <>
                        <div
                          style={{
                            color: "#ff0000",
                            lineHeight: "15px",
                            fontSize: "15px",
                          }}
                        >
                          <Badge status="warning" text="已失效" />
                        </div>
                      </>
                    );
                  }
                  return label;
                },
              },
              {
                title: "上传时间",
                width: 120,
                align: "center",
                render(v, r) {
                  if (r.u_id === 0)
                    return <div style={{ color: "#bbbbbb" }}>系统默认</div>;
                  const date = new Date(r.upload_time);
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
                title: "操作",
                align: "center",
                width: 100,
                render(v, r: any) {
                  return (
                    <Space>
                      <Tooltip placement="top" title="测试该数据集">
                        <Button
                          type="primary"
                          style={{ backgroundColor: "#c8c5f7" }}
                          icon={<DashboardOutlined />}
                          size="small"
                          onClick={() => {
                            setCurrentId(r.id);
                            setTestOpen(true);
                          }}
                        />
                      </Tooltip>
                      {/* <Button
                        type="primary"
                        style={{ backgroundColor: "#c8c5f7" }}
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => {
                          navigate(`/admin/UsageList/${r.p_id}`); // 导航到带有 u_p_id 参数设置为 r.p_id 的 UsageList 页面
                        }}
                      />

                      <Popconfirm
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
    </>
  );
}

export default TestDataset;
