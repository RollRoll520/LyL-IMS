import { Line } from "@antv/g2plot";
import { useEffect } from "react";

interface MyLineProps {
  data: Array<{ label: any; count: any }>;
}

const MyLine = ({ data }: MyLineProps) => {
  useEffect(() => {
    const linePlot = new Line("container", {
      data,
      xField: "label",
      yField: "count",
      stepType: "vh",
    });

    linePlot.render();
  }, [data]);

  return <div id="container"></div>;
};

export default MyLine;
