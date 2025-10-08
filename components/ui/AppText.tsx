import React from "react";
import { Text, TextProps } from "@rneui/themed";

interface AppTextProps extends TextProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "caption" | "label";
  color?: "primary" | "secondary" | "muted" | "danger" | "success";
  align?: "left" | "center" | "right";
}

export const AppText: React.FC<AppTextProps> = ({
  variant = "body",
  color = "secondary",
  align = "left",
  style,
  children,
  ...props
}) => {
  const getTextStyle = () => {
    const variantStyles = {
      h1: {
        fontSize: 32,
        fontWeight: "bold" as const,
        lineHeight: 40,
      },
      h2: {
        fontSize: 24,
        fontWeight: "bold" as const,
        lineHeight: 32,
      },
      h3: {
        fontSize: 20,
        fontWeight: "600" as const,
        lineHeight: 28,
      },
      h4: {
        fontSize: 18,
        fontWeight: "600" as const,
        lineHeight: 24,
      },
      body: {
        fontSize: 16,
        fontWeight: "normal" as const,
        lineHeight: 24,
      },
      caption: {
        fontSize: 14,
        fontWeight: "normal" as const,
        lineHeight: 20,
      },
      label: {
        fontSize: 16,
        fontWeight: "600" as const,
        lineHeight: 22,
      },
    };

    const colorStyles = {
      primary: { color: "#9e35e5" },
      secondary: { color: "#1f2937" },
      muted: { color: "#6b7280" },
      danger: { color: "#ef4444" },
      success: { color: "#10b981" },
    };

    const alignStyles = {
      left: { textAlign: "left" as const },
      center: { textAlign: "center" as const },
      right: { textAlign: "right" as const },
    };

    return {
      ...variantStyles[variant],
      ...colorStyles[color],
      ...alignStyles[align],
    };
  };

  return (
    <Text style={[getTextStyle(), style]} {...props}>
      {children}
    </Text>
  );
};
