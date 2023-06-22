import lottie from "lottie-web";
import { useEffect, useRef, useState } from "react";
import { lottieUrl } from "../../utils/tools";

/**
 * A component that displays a Lottie animation.
 * @param {object} props - The component props.
 * @param {string} [props.url] - The URL of the Lottie animation to display.
 * @param {string} [props.type] - The type of Lottie animation to display.
 * @param {object} [props.style] - The CSS styles to apply to the Lottie container.
 * @param {boolean} [props.loop] - The value to decide the loop option.
 * @param {number} [props.speed] - The speed at which to play the animation.
 */
const MyLottie = ({ url, type, style, speed, loop }) => {
  const lottieRef = useRef(null);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const defaultUrl = "../../assets/default.json";
    const fetchData = async () => {
      if (url) {
        const response = await fetch(lottieUrl+url+".json",{ mode: 'no-cors' });
        const data = await response.json();
        setAnimationData(data);
      } else if (type) {
        const data = await import(`../../assets/${type}.json`);
        setAnimationData(data);
      } else {
        const response = await fetch(defaultUrl);
        const data = await response.json();
        setAnimationData(data);
      }
    };
    fetchData();
  }, [url, type]);

  useEffect(() => {
    if (animationData && lottieRef.current) {
      const anim = lottie.loadAnimation({
        container: lottieRef.current,
        renderer: "svg",
        loop: loop !== undefined ? loop : true,
        autoplay: true,
        animationData,
      });

      if (speed !== undefined) {
        anim.setSpeed(speed);
      }
    }
  }, [animationData, speed, loop]);

  return <div ref={lottieRef} style={style}></div>;
};

export default MyLottie;