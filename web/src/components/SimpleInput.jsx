import { forwardRef } from "react";
import "./styles/simple-input.css";

const SimpleInput = forwardRef(({ className, size, ...inputProps }, ref) => {
    className = className || "";
    return <input className={`simple-input ${size} ${className}`} ref={ref} {...inputProps} />;
});

export default SimpleInput;
