// import "./CSS/UseShineBtn.css";

const UseShineBtn = ({ children, className }) => {
  return (
    <h1 className={`shineBtn ${className ? className : ""}`}>{children}</h1>
  );
};

export default UseShineBtn;
