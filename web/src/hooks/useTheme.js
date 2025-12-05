import { useState, useEffect, useCallback } from "react";

/**
 * 主题切换的自定义 hook
 * 支持浅色、深色和自动三种模式
 * 自动模式会根据系统主题设置自动切换
 *
 * @returns {Object} 包含主题状态和操作方法的对象
 */
export const useTheme = () => {
    // 从 localStorage 获取保存的主题，默认为 "auto"
    const [theme, setThemeState] = useState(() => {
        if (typeof window === "undefined") return "auto";
        return localStorage.getItem("sc-theme") || "auto";
    });

    // 应用主题到根元素
    const applyTheme = useCallback((newTheme) => {
        if (typeof window === "undefined") return;
        let themeToApply = newTheme;
        if (newTheme === "auto") {
            // 自动切换主题 根据当前系统
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            themeToApply = mediaQuery.matches ? "dark-theme" : "light-theme";
        } else if (newTheme === "dark") {
            themeToApply = "dark-theme";
        } else if (newTheme === "light") {
            themeToApply = "light-theme";
        }
        // 设置 data-theme 属性到根元素
        document.documentElement.setAttribute("data-theme", themeToApply);
    }, []);

    // 设置特定主题
    const setTheme = useCallback(
        (newTheme) => {
            setThemeState(newTheme);
            localStorage.setItem("sc-theme", newTheme);
            applyTheme(newTheme);
        },
        [applyTheme],
    );

    // 切换主题（浅色↔深色）
    const toggleTheme = useCallback(() => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    }, [theme, setTheme]);

    // 监听系统主题变化
    useEffect(() => {
        if (typeof window === "undefined") return;
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleSystemThemeChange = () => {
            if (theme === "auto") {
                applyTheme("auto");
            }
        };
        // 初始化应用主题
        applyTheme(theme);
        // 添加系统主题变化监听
        mediaQuery.addEventListener("change", handleSystemThemeChange);
        // 清理函数
        return () => {
            mediaQuery.removeEventListener("change", handleSystemThemeChange);
        };
    }, [theme, applyTheme]);

    // 监听主题变化
    useEffect(() => {
        applyTheme(theme);
    }, [theme, applyTheme]);

    // 获取当前应用的主题（考虑 auto 模式）
    const getCurrentAppliedTheme = useCallback(() => {
        if (typeof window === "undefined") return "light-theme";
        if (theme === "auto") {
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            return mediaQuery.matches ? "dark-theme" : "light-theme";
        }
        return theme === "dark" ? "dark-theme" : "light-theme";
    }, [theme]);

    return {
        // 主题状态
        theme,
        isDark: getCurrentAppliedTheme() === "dark-theme",
        isLight: getCurrentAppliedTheme() === "light-theme",
        isAuto: theme === "auto",

        // 主题操作方法
        setTheme,
        toggleTheme,
        getCurrentAppliedTheme,

        // 快捷方法
        setLightTheme: () => setTheme("light"),
        setDarkTheme: () => setTheme("dark"),
        setAutoTheme: () => setTheme("auto"),
    };
};
