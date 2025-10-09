import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f4ff", // 淺紫色背景
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  // Topic Section
  topicSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
    textAlign: "left",
  },

  // Voter Count Section
  voterCountSection: {
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  voterCountContainer: {
    alignItems: "center",
  },
  voterCountLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
    marginBottom: 15,
  },
  voterCountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  countButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#8b5cf6",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },
  countButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  voterCountDisplay: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    minWidth: 80,
    textAlign: "center",
  },

  // Options Section
  optionsSection: {
    marginBottom: 20,
  },
  optionsButton: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionsButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionsButtonIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  optionsButtonTextContainer: {
    flex: 1,
  },
  optionsButtonTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 2,
  },
  optionsButtonSubtitle: {
    fontSize: 13,
    color: "#666",
  },
  optionsButtonArrow: {
    fontSize: 20,
    color: "#8b5cf6",
    fontWeight: "bold",
  },

  // Start Voting Section
  startVotingSection: {
    marginTop: 20,
    alignItems: "center",
  },
  startVotingButton: {
    backgroundColor: "#10b981",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: screenWidth - 80,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  startVotingButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  startVotingSubText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
    fontWeight: "500",
  },
  votingPlaceholder: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 12,
    minWidth: screenWidth - 80,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderStyle: "dashed",
  },
  votingPlaceholderText: {
    color: "#9ca3af",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  votingPlaceholderHint: {
    color: "#6b7280",
    fontSize: 13,
    textAlign: "center",
  },
  votesPerPersonHint: {
    color: "#6b7280",
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
    fontStyle: "italic",
  },
});
