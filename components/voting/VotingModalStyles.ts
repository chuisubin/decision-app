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
    maxHeight: screenHeight * 0.8,
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  topicText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 12,
  },
  totalVotesText: {
    fontSize: 14,
    color: "#8b5cf6",
    fontWeight: "600",
  },

  // Voter Progress
  voterProgress: {
    width: "100%",
    alignItems: "center",
  },
  voterProgressText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    fontWeight: "500",
  },
  progressBar: {
    width: "100%",
    height: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#8b5cf6",
    borderRadius: 3,
  },

  // Voting Options
  optionsContainer: {
    maxHeight: 300,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  voteOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8f9fa",
    padding: 16,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  voteOptionText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },
  voteOptionArrow: {
    fontSize: 18,
    color: "#8b5cf6",
    fontWeight: "bold",
  },

  // Winner Section
  winnerSection: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f8f9ff",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
  },
  singleWinner: {
    alignItems: "center",
  },
  winnerIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  winnerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
    textAlign: "center",
  },
  winnerVotes: {
    fontSize: 16,
    color: "#8b5cf6",
    fontWeight: "600",
  },
  tieWinner: {
    alignItems: "center",
  },
  tieIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  tieTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  tieSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  tieOption: {
    fontSize: 16,
    color: "#8b5cf6",
    fontWeight: "600",
    marginVertical: 2,
  },

  // Results Container
  resultsContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  resultsScrollView: {
    maxHeight: 200,
  },
  resultItem: {
    marginBottom: 16,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  resultInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  resultOptionText: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },
  resultVoteText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "700",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    minWidth: 60,
    textAlign: "center",
  },
  resultBarContainer: {
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
  },
  resultBar: {
    height: "100%",
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
  },
  winnerBar: {
    backgroundColor: "#10b981",
  },

  // Action Buttons
  actionButtons: {
    flexDirection: "row",
    padding: 20,
    gap: 10,
  },
  revoteButton: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  revoteButtonText: {
    color: "#6b7280",
    fontSize: 14,
    fontWeight: "600",
  },
  finishButton: {
    flex: 1,
    backgroundColor: "#10b981",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  finishButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },

  // Close Button
  closeButton: {
    margin: 20,
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  closeButtonText: {
    color: "#6b7280",
    fontSize: 14,
    fontWeight: "600",
  },

  // Enhanced Result Display Styles
  optionNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  resultRank: {
    fontSize: 14,
    fontWeight: "700",
    color: "#8b5cf6",
    marginRight: 8,
    minWidth: 24,
  },
  voteCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0fdf4",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#bbf7d0",
  },
  resultVoteCount: {
    fontSize: 18,
    fontWeight: "800",
    color: "#059669",
    marginRight: 2,
  },
  resultVoteLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#059669",
    marginRight: 6,
  },
  resultPercentage: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6b7280",
  },
});
