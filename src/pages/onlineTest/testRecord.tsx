import {
  Card,
  Button,
  Form,
  Table,
  Space,
  Popconfirm,
  Menu,
  MenuProps,
  Badge,
} from "antd";
import {
  AppstoreOutlined,
  BarChartOutlined,
  BlockOutlined,
  BorderOutlined,
  BuildOutlined,
  CloudDownloadOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MailOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [isShow, setIsShow] = useState(false); // 控制modal显示和隐藏
  const [myForm] = Form.useForm(); // 可以获取表单元素实例
  const [query, setQuery] = useState(1); // 查询条件
  const [data, setData] = useState<any>([
    {
      id: 230713001,
      state: "isWaiting",
      remark: "test",
    },
  ]);
  const [total, setTotal] = useState(0); // 总数量
  const [currentId, setCurrentId] = useState(""); // 当前id，如果为空表示新增
  const [imageUrl, setImageUrl] = useState<string>(""); // 上传之后的数据
  const [findId, setFindId] = useState("");

  //   useEffect(() => {
  //     // 调用 loadProductListAPI 函数获取产品列表数据
  //     loadProductListAPI(query)
  //       .then((res) => {
  //         if (query !== 0) {
  //           setData(res.result.list);
  //           setTotal(res.result.total); // 设置总数量
  //           console.log(res);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }, [query]); // 监听query改变

  //   useEffect(() => {
  //     loadProductByIdAPI(findId)
  //       .then((res) => {
  //         if (findId !== "0") {
  //           let li = {
  //             p_id: res.result.p_id,
  //             p_type: res.result.p_type,
  //             p_state: res.result.p_state,
  //             p_time: res.result.p_time,
  //             p_img_url: res.result.p_img_url,
  //           };
  //           let arr = [li];
  //           setData(arr);
  //           setTotal(1); // 设置总数量
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }, [findId]);

  useEffect(() => {
    if (!isShow) {
      // 关闭弹窗之后重置数据
      setCurrentId("");
      setImageUrl("");
    }
  }, [isShow]);

  const [current, setCurrent] = useState("single");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
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
                title: "备注",
                width: 120,
                align: "center",
                render(v, r: any) {
                  return (
                    <>
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        size="small"
                        ghost
                        style={{
                          marginRight: "5px",
                          color: "#7977ac",
                          borderColor: "#7977ac",
                        }}
                        onClick={() => {
                          setIsShow(true);
                          setCurrentId(r.p_id);
                          setImageUrl(r.p_img_url);
                          myForm.setFieldsValue(r);
                        }}
                      />
                      {r.remark}
                    </>
                  );
                },
              },
              {
                title: "状态",
                width: 80,
                align: "center",
                render(v, r: any) {
                  let label;
                  if (r.state === "isWaiting") {
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
                  } else if (r.p_state === "isFinished") {
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
                title: "测试时间",
                width: 120,
                align: "center",
                render(v, r) {
                  return <>{r.upload_time}</>;
                },
              },
              {
                title: "测试用时",
                width: 120,
                align: "center",
                render(v, r) {
                  return <>{r.duration}</>;
                },
              },
              {
                title: "操作",
                align: "center",
                width: 100,
                render(v, r: any) {
                  return (
                    <Space>
                      <Button
                        type="primary"
                        style={{ backgroundColor: "#7977ac" }}
                        icon={<BarChartOutlined />}
                        size="small"
                        onClick={() => {
                          navigate(`/admin/UsageList/${r.p_id}`); // 导航到带有 u_p_id 参数设置为 r.p_id 的 UsageList 页面
                        }}
                      />
                      <Button
                        type="primary"
                        style={{ backgroundColor: "#7977ac" }}
                        icon={<CloudDownloadOutlined />}
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
                      </Popconfirm>
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

export default TestRecord;
