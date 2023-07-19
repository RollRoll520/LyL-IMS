import { Menu, MenuProps, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import {
  loadTrainReportApi,
  loadValidateReportApi,
} from "../../services/result.service";
import MyHeatmap from "../../components/antv/myHeatmap";
import {
  BulbOutlined,
  FlagOutlined,
  StockOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

interface TrainResultModalProps {
  isOpen: boolean;
  record_id: any;
  onCancel: () => void;
}

const items: MenuProps["items"] = [
  {
    label: "训练集报告",
    key: "train_report",
    icon: <ThunderboltOutlined />,
  },
  {
    label: "训练集热力图",
    key: "train_heat",
    icon: <FlagOutlined />,
  },
  {
    label: "验证集报告",
    key: "validate_report",
    icon: <BulbOutlined />,
  },
  {
    label: "验证集热力图",
    key: "validate_heat",
    icon: <StockOutlined />,
  },
];

const columns = [
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Precision",
    dataIndex: "precision",
    key: "precision",
    render: (text: any, row: any) => {
      if (row.key === "accuracy") {
        return "";
      }
      return Number(text).toFixed(4);
    },
  },
  {
    title: "Recall",
    dataIndex: "recall",
    key: "recall",
    render: (text: any, row: any) => {
      if (row.key === "accuracy") {
        return "";
      }
      return Number(text).toFixed(4);
    },
  },
  {
    title: "F1-score",
    dataIndex: "f1-score",
    key: "f1-score",
    render: (text: any) => Number(text).toFixed(4),
  },
  {
    title: "Support",
    dataIndex: "support",
    key: "support",
    render: (text: any) => Number(text).toFixed(0),
  },
];

const TrainResultModal: React.FC<TrainResultModalProps> = ({
  isOpen,
  record_id,
  onCancel,
}) => {
  const [typeValue, setTypeValue] = useState<string>("train_report"); // 使用useState保存type字段的值

  const [trainReportData, setTrainReportData] = useState([]);

  const [validateReportData, setValidateReportData] = useState([]);

  useEffect(() => {
    if (isOpen&&record_id>0) {
      loadTrainReportApi(record_id).then((res) => {
        setTrainReportData(res);
      });
      loadValidateReportApi(record_id).then((res) => {
        setValidateReportData(res);
      });
    }
  }, [isOpen, record_id]);

  // 监听 type 字段的值
  const handleTypeChange = (e: any) => {
    if (e.key === "train_report")
      loadTrainReportApi(record_id).then((res) => {
        setTrainReportData(res);
      });
    else
      loadValidateReportApi(record_id).then((res) => {
        setValidateReportData(res);
      });
    setTypeValue(e.key);
  };

  return (
    <>
      <Modal
        title="训练结果"
        centered={true}
        open={isOpen}
        footer={null}
        width="auto"
        destroyOnClose={true}
        onCancel={() => {
          onCancel();
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
          {typeValue === "train_report" && (
            <Table
              dataSource={trainReportData}
              columns={columns}
              size="middle"
              pagination={false}
            />
          )}
          {typeValue === "train_heat" && (
            <MyHeatmap params={{ type: "train", record_id: record_id }} />
          )}
          {typeValue === "validate_report" && (
            <Table
              dataSource={validateReportData}
              columns={columns}
              size="middle"
              pagination={false}
            />
          )}
          {typeValue === "validate_heat" && (
            <MyHeatmap params={{ type: "validate", record_id: record_id }} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default TrainResultModal;
