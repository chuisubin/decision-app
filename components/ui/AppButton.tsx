import React from "react";
import { Button, ButtonProps } from "@rneui/themed";

interface AppButtonProps extends Omit<ButtonProps, "size"> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "small" | "medium" | "large";
}

export const AppButton: React.FC<AppButtonProps> = ({
  variant = "primary",
  size = "medium",
  children,
  title,
  ...props
}) => {
  const getButtonStyle = () => {
    const baseStyle = {
      borderRadius: 12,
    };

    const variantStyles = {
      primary: {
        backgroundColor: "#9e35e5",
        borderColor: "#9e35e5",
      },
      secondary: {
        backgroundColor: "#f3f4f6",
        borderColor: "#e5e7eb",
      },
      outline: {
        backgroundColor: "transparent",
        borderColor: "#9e35e5",
        borderWidth: 2,
      },
      danger: {
        backgroundColor: "#ef4444",
        borderColor: "#ef4444",
      },
    };

    const sizeStyles = {
      small: { paddingVertical: 8, paddingHorizontal: 16 },
      medium: { paddingVertical: 12, paddingHorizontal: 24 },
      large: { paddingVertical: 16, paddingHorizontal: 32 },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
      ...sizeStyles[size],
    };
  };

  const getTitleStyle = () => {
    const variantTextStyles = {
      primary: { color: "#ffffff", fontWeight: "600" as const },
      secondary: { color: "#374151", fontWeight: "600" as const },
      outline: { color: "#9e35e5", fontWeight: "600" as const },
      danger: { color: "#ffffff", fontWeight: "600" as const },
    };

    const sizeTextStyles = {
      small: { fontSize: 14 },
      medium: { fontSize: 16 },
      large: { fontSize: 18 },
    };

    return {
      ...variantTextStyles[variant],
      ...sizeTextStyles[size],
    };
  };

  return (
    <Button
      buttonStyle={getButtonStyle()}
      titleStyle={getTitleStyle()}
      title={title}
      activeOpacity={0.8}
      {...props}
    >
      {children}
    </Button>
  );
};
