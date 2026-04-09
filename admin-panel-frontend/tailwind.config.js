var config = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                brand: {
                    DEFAULT: "#458BC1",
                    dark: "#003E6E",
                    deep: "#002847",
                    soft: "#E8F1FF",
                },
                surface: {
                    page: "#F8FCFF",
                    muted: "#F4F9FC",
                    line: "#E5E7EB",
                },
                text: {
                    primary: "#343637",
                    secondary: "#666666",
                    menu: "#1C1C1C",
                    icon: "#03314B",
                    active: "#0365F2",
                },
                state: {
                    success: "#52C41A",
                    danger: "#FF4D4F",
                    warning: "#FAAD14",
                    info: "#1890FF",
                    neutral: "#8C8C8C",
                },
            },
            boxShadow: {
                panel: "0 1px 3px rgba(0, 0, 0, 0.1)",
            },
            fontFamily: {
                sans: ["Inter", "Segoe UI", "Roboto", "Arial", "sans-serif"],
            },
            borderRadius: {
                panel: "8px",
            },
            maxWidth: {
                content: "1400px",
                narrow: "1075px",
            },
        },
    },
    plugins: [],
};
export default config;
