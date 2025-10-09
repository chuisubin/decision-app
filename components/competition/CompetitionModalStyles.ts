import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    width: screenWidth - 40,
    height: screenHeight * 0.8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },

  // Modal Header
  modalHeader: {
    padding: 20,

    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  difficultyText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
  },

  // Modal Body
  modalBody: {
    flex: 1,
    padding: 20,
  },

  // Winner Section
  winnerContainer: {
    backgroundColor: "#fff3cd",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ffc107",
  },
  winnerLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#856404",
    marginBottom: 10,
  },
  winnerName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2196F3",
    marginBottom: 8,
  },
  winnerScore: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
  },

  // Ranking Section
  rankingContainer: {
    marginTop: 10,
  },
  rankingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  rankingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  firstPlace: {
    backgroundColor: "#fff3cd",
    borderWidth: 1,
    borderColor: "#ffc107",
  },
  rankingPosition: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
    width: 40,
  },
  rankingName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    marginLeft: 10,
  },
  rankingScore: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },

  // Modal Footer
  modalFooter: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    gap: 15,
  },
  restartButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  restartButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    flex: 1,
    backgroundColor: "#6c757d",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
