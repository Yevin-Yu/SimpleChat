import { forwardRef } from "react";
import "./styles/simple-tag.css";

const SimpleTag = forwardRef(({ className, size, ...props }, ref) => {
    className = className || "";
    return <div className={`simple-tag ${size} ${className}`} ref={ref} {...props} />;
});

export default SimpleTag;
