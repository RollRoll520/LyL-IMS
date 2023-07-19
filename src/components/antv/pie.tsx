import { Pie } from "@antv/g2plot";
import { useEffect } from "react";

interface MyPieProps {
  data: Array<{ label: any; count: any }>;
}

const MyPie = ({ data }: MyPieProps) => {
  useEffect(() => {
const piePlot = new Pie("container", {
  appendPadding: 10,
  data,
  angleField: "count",
  colorField: "label",
  radius: 1,
  innerRadius: 0.56,
  label: {
    type: "inner",
    offset: "-50%",
    autoRotate: false,
    style: { textAlign: "center" },
    formatter: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
  },
  statistic: {
    title: {
      offsetY: -8,
    },
    content: {
      offsetY: -4,
    },
  },
  // 添加 中心统计文本 交互
  interactions: [
    { type: "element-selected" },
    { type: "element-active" },
    {
      type: "pie-statistic-active",
      cfg: {
        start: [
          { trigger: "element:mouseenter", action: "pie-statistic:change" },
          { trigger: "legend-item:mouseenter", action: "pie-statistic:change" },
        ],
        end: [
          { trigger: "element:mouseleave", action: "pie-statistic:reset" },
          { trigger: "legend-item:mouseleave", action: "pie-statistic:reset" },
        ],
      },
    },
  ],
});

piePlot.render();
  }, [data]);

  return <div id="container"></div>;
};

export default MyPie;
