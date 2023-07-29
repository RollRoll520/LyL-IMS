import { Card, Menu, MenuProps, Modal, Statistic, Table } from "antd";
import { useEffect, useState } from "react";
import {
  loadSingleTestResultApi,
  loadTestResultApi,
} from "../../services/result.service";
import MyHeatmap from "../../components/antv/myHeatmap";
import {
  BarChartOutlined,
  BulbOutlined,
  FlagOutlined,
  FundOutlined,
  PieChartOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import MyColumn from "../../components/antv/column";
import MyPie from "../../components/antv/pie";
import MyLine from "../../components/antv/line";

interface TrainResultModalProps {
  isOpen: boolean;
  record_id: any;
  mode: string;
  onCancel: () => void;
}

const items: MenuProps["items"] = [
  {
    label: "饼图",
    key: "pie",
    icon: <PieChartOutlined />,
  },
  {
    label: "条形图",
    key: "bar",
    icon: <BarChartOutlined />,
  },
  {
    label: "阶梯折线图",
    key: "line",
    icon: <FundOutlined />,
  },
];

const TestResultModal: React.FC<TrainResultModalProps> = ({
  isOpen,
  record_id,
  mode,
  onCancel,
}) => {
  const [typeValue, setTypeValue] = useState<string>("bar");
  const [data, setData] = useState<any[]>([]); // 将 data 的类型设置为 any[]
  const [singleData,setSingleData] = useState("");

  useEffect(() => {
    if (isOpen && record_id) {
      if (mode === "single")
        loadSingleTestResultApi(record_id).then((res) => {
          const str = JSON.stringify(res, null, 2);
          console.log(str[0]);
          const obj = JSON.parse(str);
          const values = Object.values(obj);
          const firstValue = values[0];;
          setSingleData(firstValue as string);
        });
     else {
      loadTestResultApi(record_id).then((res) => {
        setData(res);
      }).then(()=>{
      setTypeValue("pie");
      })
    }}
  }, [isOpen, mode, record_id]);

  // 监听 type 字段的值
  const handleTypeChange = (e: any) => {
    setTypeValue(e.key);
  };

  return (
    <>
      {mode === "single" && (
        <Modal
          title="单条测试集测试结果"
          centered={true}
          open={isOpen}
          footer={null}
          width="auto"
          destroyOnClose={true}
          onCancel={() => {
            onCancel();
            setSingleData("");
          }}
          maskClosable={false}
        >
          <Card bordered={false}>
            <Statistic
              title="你的预测结果是："
              value={singleData}
              precision={0}
              valueStyle={{ color: "#3f8600" }}
              prefix={<BulbOutlined />}
            />
          </Card>
        </Modal>
      )}
      {mode !== "single" && (
        <Modal
          title="批量测试结果"
          centered={true}
          open={isOpen}
          footer={null}
          width="auto"
          destroyOnClose={true}
          onCancel={() => {
            onCancel();
            setData([]);
            setTypeValue("bar");
          }}
          maskClosable={false}
        >
          <Menu
            onClick={handleTypeChange}
            selectedKeys={[typeValue]}
            mode="horizontal"
            items={items}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            {typeValue === "pie" && <MyPie data={data} />}
            {typeValue === "bar" && <MyColumn data={data} />}
            {typeValue === "line" && <MyLine data={data} />}
          </div>
        </Modal>
      )}
    </>
  );
};

export default TestResultModal;
