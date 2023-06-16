import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import { Spin } from "antd";
import { SpinProps } from "antd/lib/spin";
import loading from "../../assets/rotateLoading.json";

interface Props extends SpinProps {
  children?: React.ReactNode;
}

// 大小映射，spin中small，default和large三种大小对应的像素
const SIZE_MAP = {
  small: 140,
  default: 200,
  large: 320,
};

const CustomLoad = (props: { style: React.CSSProperties }) => {
  const load = useRef() as React.MutableRefObject<any>;
  useEffect(() => {
    lottie.loadAnimation({
      container: load.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: loading,
    });
  }, []);

  return <div style={props.style} ref={load}></div>;
};

const CustomSpin = (props: Props) => {
  const { children, size = "default", ...rest } = props;
  const style: React.CSSProperties = {
    width: SIZE_MAP[size],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -SIZE_MAP[size],
    marginLeft: -SIZE_MAP[size] / 2,
  };

  return (
    <Spin {...rest} indicator={<CustomLoad style={style} />}>
      {children}
    </Spin>
  );
};

export default CustomSpin;
