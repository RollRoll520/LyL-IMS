import lottie from "lottie-web";
import { useEffect, useRef } from "react";

const data = {};
const req = require.context("../../assets/", true, /\.json$/);
req.keys().forEach((filename) => {
  data[filename.replace(/\.\/(.+)\.json/, "$1")] = req(filename);
});

/**
 * @typedef {object} MyLottieProps
 * @property {string} type - The type of Lottie animation to display.
 * @property {object} [style] - The CSS styles to apply to the Lottie container.
 * @property {boolean} [loop] - The value to decide the loop option.
 * @property {number} [speed] - The speed at which to play the animation.
 */

/**
 * A component that displays a Lottie animation.
 * @param {MyLottieProps} props - The component props.
 */
const MyLottie = ({ type, style, speed ,loop}) => {
  const lottieRef = useRef(document.createElement("div"));

  useEffect(() => {
    const animationData = data[type];
    if (animationData && lottieRef.current) {
      const anim = lottie.loadAnimation({
        container: lottieRef.current,
        renderer: "svg",
        loop: (loop!==undefined)?loop:true,
        autoplay: true,
        animationData,
      });

      if (speed !== undefined) {
        anim.setSpeed(speed);
      }
    }
  }, [type, speed,loop]);

  return <div ref={lottieRef} style={style}></div>;
};

export default MyLottie;