import React from "react";
import './styles/theme-toggle.css';
import { useTheme } from "@/hooks/useTheme";

const ThemeToggle = () => {
  const { toggleTheme, isDark, isAuto } = useTheme();

  const getIcon = () => {
    if (isAuto) {
      return "🌓"; // 自动模式图标
    }
    return isDark ? "🌙" : "☀️"; // 深色模式用月亮，浅色模式用太阳
  };

  const getTitle = () => {
    if (isAuto) {
      return "自动主题 (点击切换)";
    }
    return isDark ? "深色主题 (点击切换)" : "浅色主题 (点击切换)";
  };

  return (
    <button
      className="theme-toggle-button"
      onClick={toggleTheme}
      title={getTitle()}
      aria-label={getTitle()}
    >
      {getIcon()}
    </button>
  );
};

export default ThemeToggle;
