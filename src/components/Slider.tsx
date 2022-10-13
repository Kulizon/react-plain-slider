import { useState, useEffect, useRef } from "react";

import styles from "./Slider.module.scss";

const Slider = (props: {
  width: string;
  height: string;
  children?: any;
  className?: string;
  innerClassname?: string;
}) => {
  const innerSliderRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [isPressed, setIsPressed] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startLeft, setStartLeft] = useState(0);

  const mouseDownHandler = (e: any) => {
    setIsPressed(true);
    setStartX(e.nativeEvent.offsetX - innerSliderRef.current?.offsetLeft!);
    if (sliderRef.current) {
      sliderRef.current!.style.cursor = "grabbing";
      sliderRef.current!.style.transform = "scale(1.03)";
      setStartLeft(0);
    }
    cancelMomentumTracking();
  };

  const mouseEnterHandler = () => {
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grab";
    }
  };

  const mouseUpHandler = (e: any) => {
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grab";
      sliderRef.current!.style.transform = "scale(1)";
      setStartLeft(0);
    }

    setIsPressed(false);
    beginMomentumTracking();
  };

  const mouseLeaveHandler = (e: any) => {
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "defualt";
      sliderRef.current!.style.transform = "scale(1)";
    }
    setIsPressed(false);
  };

  const checkBoundary = () => {
    const outerBoundary = sliderRef.current?.getBoundingClientRect()!;
    const innerBoundary = innerSliderRef.current?.getBoundingClientRect()!;

    if (parseInt(innerSliderRef.current?.style.left!) > 0) {
      innerSliderRef.current!.style.left = "0";
    } else if (innerBoundary.right < outerBoundary?.right) {
      innerSliderRef.current!.style.left = `-${
        innerBoundary?.width - outerBoundary?.width
      }px`;
    }
  };

  const mouseMoveHandler = (e: any) => {
    if (!isPressed) return;
    if (!startLeft) setStartLeft(parseInt(innerSliderRef.current!.style.left));
    e.preventDefault();

    const movedX: number = e.nativeEvent.offsetX - startX;

    const prevLeft = parseInt(innerSliderRef.current!.style.left);

    if (innerSliderRef.current)
      innerSliderRef.current.style.left = `${movedX}px`;

    checkBoundary();

    setVelocityX(movedX - startLeft);
  };

  const [velocityX, setVelocityX] = useState<number>(0);
  const [momentumID, setMomentumID] = useState<any>();

  const beginMomentumTracking = () => {
    cancelMomentumTracking();
    setMomentumID(requestAnimationFrame(momentumLoop));
  };

  const cancelMomentumTracking = () => {
    cancelAnimationFrame(momentumID);
  };

  const momentumLoop = () => {
    if (!velocityX || isPressed) return;

    const moveValueX =
      (parseInt(innerSliderRef.current!.style.left) + velocityX) / 150;

    if (innerSliderRef.current)
      innerSliderRef.current.style.left = `${
        velocityX > 0
          ? parseInt(innerSliderRef.current!.style.left) - moveValueX
          : parseInt(innerSliderRef.current!.style.left) + moveValueX
      }px`;
    checkBoundary();

    setVelocityX((prevVel) => prevVel * 0.96);
  };

  useEffect(() => {
    if (velocityX && Math.abs(velocityX * 0.96) > 0.75)
      setMomentumID(requestAnimationFrame(momentumLoop));
  }, [velocityX]);

  return (
    <>
      <div
        className={`${styles.slider} ${props.className ? props.className : ""}`}
        style={{ width: `${props.width}`, height: `${props.height}` }}
        onMouseDown={mouseDownHandler}
        onMouseEnter={mouseEnterHandler}
        onMouseUp={mouseUpHandler}
        onMouseMove={mouseMoveHandler}
        onMouseLeave={mouseLeaveHandler}
        ref={sliderRef}
      >
        <div
           className={`${styles.slider__inner} ${props.innerClassname ? props.innerClassname : ""}`}
          style={{
            gridTemplateColumns: `repeat(${props.children.length}, 1fr)`,
          }}
          ref={innerSliderRef}
        >
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Slider;
