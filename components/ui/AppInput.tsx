import React from "react";
import { Input, InputProps, Text } from "@rneui/themed";
import { View, StyleSheet } from "react-native";

interface AppInputProps extends InputProps {
  label?: string;
  error?: string;
  helper?: string;
  size?: "small" | "medium" | "large";
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  helper,
  size = "medium",
  ...props
}) => {
  const getSizeStyles = () => {
    const sizeStyles = {
      small: {
        containerStyle: { marginBottom: 12 },
        inputStyle: { fontSize: 14, paddingVertical: 8 },
        labelStyle: { fontSize: 14, marginBottom: 6 },
      },
      medium: {
        containerStyle: { marginBottom: 16 },
        inputStyle: { fontSize: 16, paddingVertical: 12 },
        labelStyle: { fontSize: 16, marginBottom: 8 },
      },
      large: {
        containerStyle: { marginBottom: 20 },
        inputStyle: { fontSize: 18, paddingVertical: 16 },
        labelStyle: { fontSize: 18, marginBottom: 10 },
      },
    };
    return sizeStyles[size];
  };

  const sizeStyles = getSizeStyles();

  return (
    <View style={[styles.container, sizeStyles.containerStyle]}>
      {label && (
        <Text style={[styles.label, sizeStyles.labelStyle]}>{label}</Text>
      )}
      <Input
        inputContainerStyle={[
          styles.inputContainer,
          error && styles.inputContainerError,
        ]}
        inputStyle={[styles.input, sizeStyles.inputStyle]}
        errorMessage={error}
        errorStyle={styles.errorText}
        {...props}
      />
      {helper && !error && <Text style={styles.helperText}>{helper}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontWeight: "600",
    color: "#9e35e5",
  },
  inputContainer: {
    backgroundColor: "#f8f9fa",
    borderWidth: 2,
    borderColor: "#e9ecef",
    borderRadius: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
  },
  inputContainerError: {
    borderColor: "#ef4444",
  },
  input: {
    color: "#343a40",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 14,
    marginTop: 4,
  },
  helperText: {
    color: "#6b7280",
    fontSize: 14,
    marginTop: 4,
    marginLeft: 16,
  },
});
