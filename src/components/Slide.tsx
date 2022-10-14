import styles from "./Slide.module.scss";

const Slide = (props: { children?: any; className?: string }) => {
  return (
    <div
      className={`${styles.slide} ${props.className ? props.className : " "}`}
    >
      {props.children}
    </div>
  );
};

export default Slide;
