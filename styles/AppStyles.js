import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f4ff", // 淺紫色背景
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#9e35e5", // 主紫色
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b46c1", // 深紫色
    textAlign: "center",
    opacity: 0.8,
  },
  inputContainer: {
    marginBottom: 25,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#9e35e5",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#9e35e5", // 主紫色
    marginBottom: 12,
  },
  hint: {
    fontSize: 14,
    color: "#8b5cf6", // 中紫色
    marginBottom: 15,
    opacity: 0.7,
  },
  topicInput: {
    borderWidth: 2,
    borderColor: "#e0e7ff",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: "top",
    backgroundColor: "#faf5ff", // 極淺紫色
    color: "#4c1d95", // 深紫色文字
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  optionsInput: {
    borderWidth: 2,
    borderColor: "#e0e7ff",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    backgroundColor: "#faf5ff", // 極淺紫色
    color: "#4c1d95", // 深紫色文字
    marginRight: 10,
    flex: 1,
  },
  addButton: {
    backgroundColor: "#9e35e5", // 主紫色
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#9e35e5",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  removeButton: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  removeButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  presetOptionsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    borderWidth: 2,
    borderColor: "#e0e7ff",
    shadowColor: "#9e35e5",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  presetOptionsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#9e35e5", // 主紫色
    marginBottom: 8,
    textAlign: "center",
  },
  presetOptionsHint: {
    fontSize: 14,
    color: "#8b5cf6", // 中紫色
    marginBottom: 15,
    textAlign: "center",
    lineHeight: 20,
  },
  presetOptionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  presetOptionTag: {
    backgroundColor: "#f3e8ff", // 淺紫色標籤背景
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    margin: 4,
    borderWidth: 1,
    borderColor: "#c4b5fd",
  },
  presetOptionText: {
    color: "#7c3aed", // 深紫色文字
    fontSize: 14,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#9e35e5", // 主紫色
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 16,
    alignItems: "center",
    marginVertical: 20,
    shadowColor: "#9e35e5",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: "#c4b5fd", // 淺紫色（禁用狀態）
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  loadingContainer: {
    alignItems: "center",
    marginVertical: 20,
    padding: 20,
    backgroundColor: "#faf5ff", // 極淺紫色
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#e0e7ff",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#9e35e5", // 主紫色
    marginBottom: 8,
  },
  loadingSubtext: {
    fontSize: 14,
    color: "#8b5cf6", // 中紫色
  },
  resultContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#9e35e5", // 主紫色
    marginBottom: 16,
  },
  resultBox: {
    backgroundColor: "#f3e8ff", // 淺紫色結果背景
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: 20,
    minWidth: 200,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#c4b5fd",
    shadowColor: "#9e35e5",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  resultText: {
    color: "#7c3aed", // 深紫色結果文字
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  resetButton: {
    backgroundColor: "#8b5cf6", // 中紫色重置按鈕
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginTop: 16,
  },
  resetButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  presetContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    shadowColor: "#9e35e5",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  presetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#9e35e5", // 主紫色
    marginBottom: 8,
    textAlign: "center",
  },
  presetHint: {
    fontSize: 14,
    color: "#8b5cf6", // 中紫色
    marginBottom: 12,
    textAlign: "center",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  categoryTag: {
    backgroundColor: "#9e35e5", // 主紫色分類標籤
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    margin: 4,
    shadowColor: "#9e35e5",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
  },
  categoryText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },

  // 輪盤相關樣式
  wheelSection: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    marginVertical: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#9e35e5",
    shadowColor: "#9e35e5",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  wheelTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#9e35e5",
    marginBottom: 5,
    textAlign: "center",
  },

  wheelSubtitle: {
    fontSize: 16,
    color: "#7c3aed",
    marginBottom: 15,
    textAlign: "center",
    opacity: 0.8,
  },

  noOptionsContainer: {
    backgroundColor: "#fff4e6",
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f59e0b",
  },

  noOptionsText: {
    color: "#d97706",
    fontSize: 16,
    textAlign: "center",
    fontStyle: "italic",
  },
});
