import { forwardRef } from "react";
import "./styles/simple-button.css";

const SimpleButton = forwardRef(({ className, size, ...buttonProps }, ref) => {
    className = className || "";
    return <button className={`simple-button ${size} ${className}`} ref={ref} {...buttonProps} />;
});

export default SimpleButton;
