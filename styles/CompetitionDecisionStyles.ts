import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // 主容器樣式
  container: {
    flex: 1,
    backgroundColor: "#f8f4ff", // 淺紫色背景
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  collapsibleContainer: {
    marginBottom: 20,
  },

  // 難度選擇樣式
  difficultyContainer: {
    paddingVertical: 10,
  },
  difficultyButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  difficultyButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    borderWidth: 2,
    borderColor: "transparent",
    alignItems: "center",
  },
  selectedDifficultyButton: {
    backgroundColor: "#e3f2fd",
    borderColor: "#2196F3",
  },
  difficultyButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  selectedDifficultyButtonText: {
    color: "#2196F3",
  },
  difficultyDescription: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },

  // 參加者輸入樣式
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "white",
  },
  addButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  // 參加者名單樣式
  participantsList: {
    marginTop: 10,
  },
  participantItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  participantName: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  removeButton: {
    backgroundColor: "#f44336",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  removeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
    textAlign: "center",
    padding: 20,
  },

  // 開始按鈕樣式
  startButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  startButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  // 規則說明樣式
  rulesContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rulesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  rulesText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#666",
    lineHeight: 20,
  },

  // Switch樣式
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: "#333",
  },
});
