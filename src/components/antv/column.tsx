import { Column } from "@antv/g2plot";
import { useEffect } from "react";

interface MyColumnProps {
    data: Array<{ label: any; count: any }>;
}



const MyColumn = ({ data }: MyColumnProps) => {
  useEffect(() => {
const columnPlot = new Column("container", {
  data,
  xField: "label",
  yField: "count",
  label: {
    // 可手动配置 label 数据标签位置
    position: "middle", // 'top', 'bottom', 'middle',
    // 配置样式
    style: {
      fill: "#FFFFFF",
      opacity: 0.6,
    },
  },
  xAxis: {
    label: {
      autoHide: true,
      autoRotate: false,
    },
  },
  meta: {
    value: {
      alias: "分类结果",
    },
    count: {
      alias: "个数",
    },
  },
});

columnPlot.render();

  }, [data]);

  return <div id="container" style={{ maxHeight: "400px" }}></div>;
};

export default MyColumn;
