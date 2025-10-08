import React from "react";
import { Card, CardProps } from "@rneui/themed";

interface AppCardProps extends CardProps {
  variant?: "default" | "elevated" | "bordered";
  padding?: "none" | "small" | "medium" | "large";
  children?: React.ReactNode;
}

export const AppCard: React.FC<AppCardProps> = ({
  variant = "default",
  padding = "medium",
  children,
  ...props
}) => {
  const getCardStyle = () => {
    const baseStyle = {
      borderRadius: 16,
      margin: 0,
      backgroundColor: "#ffffff",
    };

    const variantStyles = {
      default: {
        borderWidth: 0,
      },
      elevated: {
        shadowColor: "#9e35e5",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 5,
      },
      bordered: {
        borderWidth: 2,
        borderColor: "#9e35e5",
      },
    };

    const paddingStyles = {
      none: { padding: 0 },
      small: { padding: 12 },
      medium: { padding: 20 },
      large: { padding: 28 },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
      ...paddingStyles[padding],
    };
  };

  return (
    <Card containerStyle={getCardStyle()} {...props}>
      {children}
    </Card>
  );
};
