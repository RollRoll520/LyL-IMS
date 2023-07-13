import { Datum, Heatmap } from "@antv/g2plot";
import { useEffect } from "react";
import { message } from "antd";
import { loadTrainHeatApi, loadValidateHeatApi } from "../../services/result.service";
interface MyHeatmapProps {
  params: {
    type: string;
    record_id: number;
  };
}

const MyHeatmap = ({ params }: MyHeatmapProps) => {
  const { type, record_id } = params;
  const loadData = (type: string, record_id: number) => {
    if (type === "train") {
      return loadTrainHeatApi(record_id);
    } else if (type === "validate") {
      return loadValidateHeatApi(record_id);
    } else {
      return Promise.reject(new Error("Invalid API type"));
    }
  };

  useEffect(() => {
    loadData(type, record_id)
      .then((res) => {
        const heatmapPlot = new Heatmap("container", {
          data: res,
          xField: "row",
          yField: "col",
          colorField: "value",
          sizeField: "value",
          tooltip: {
            formatter: (datum: Datum) => {
              return { name: "计数", value: datum.value };
            },
          },
          shape: "circle",
          color: ["#dddddd", "#9ec8e0", "#5fa4cd", "#2e7ab6", "#114d90"],
          label: {
            style: {
              fill: "#fff",
              shadowBlur: 2,
              shadowColor: "rgba(0, 0, 0, 1)",
            },
            labelLine: false,
          },
        });
        heatmapPlot.render();
      })
      .catch((error) => {
        message.error("请求数据失败");
        console.log("API request error:", error);
      });
  }, [type, record_id]);

  return (
    <div style={{ alignContent: "center" }}>
      <div
        id="container"
        style={{ width: "400px", height: "400px", padding: "auto" }}
      ></div>
    </div>
  );
};

export default MyHeatmap;
