import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,

    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomColor: "#f0f0f0",
    borderBottomWidth: 1,
  },
  headerLeft: {
    flex: 1,
  },
  gameTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  exitButton: {
    backgroundColor: "#f44336",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#f44336",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  exitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  gameContent: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  playerInfo: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  currentPlayer: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2196F3",
    marginBottom: 30,
    textAlign: "center",
  },
  timerContainer: {
    alignItems: "center",
    marginBottom: 50,
    backgroundColor: "white",
    padding: 30,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    width: "100%",
    maxWidth: 300,
  },
  timerDisplay: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "monospace",
  },

  targetTime: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  gameControls: {
    alignItems: "center",
    minHeight: 80,
    width: "100%",
  },
  readyButton: {
    width: "100%", // Full width
    height: 50, // Unified height
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF9800",
    borderRadius: 25, // Unified border radius
    paddingHorizontal: 20,
  },
  readyButtonText: {
    fontSize: 20, // Unified and larger font size
    fontWeight: "bold",
    color: "white",
  },
  startTimerButton: {
    width: "100%", // Full width
    height: 50, // Unified height
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2196F3",
    borderRadius: 25, // Unified border radius
    paddingHorizontal: 20,
  },
  startTimerButtonText: {
    fontSize: 20, // Unified and larger font size
    fontWeight: "bold",
    color: "white",
  },
  stopButton: {
    width: "100%", // Full width
    height: 50, // Unified height
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f44336",
    borderRadius: 25, // Unified border radius
    paddingHorizontal: 20,
  },
  stopButtonText: {
    fontSize: 20, // Unified and larger font size
    fontWeight: "bold",
    color: "white",
  },
  nextPlayerButton: {
    width: "100%", // Full width
    height: 50, // Unified height
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    borderRadius: 25, // Unified border radius
    paddingHorizontal: 20,
  },
  nextPlayerButtonText: {
    fontSize: 20, // Unified and larger font size
    fontWeight: "bold",
    color: "white",
  },
  completedContainer: {
    alignItems: "center",
    padding: 5,
    width: "100%",
  },
  completedText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 5,
  },
  completedSubText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  viewResultsButton: {
    width: "100%", // Full width
    backgroundColor: "#2196F3",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25, // Unified border radius
    marginTop: 15,
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  viewResultsButtonText: {
    fontSize: 20, // Unified and larger font size
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  hiddenTimeDisplay: {
    color: "#bbb", // or use 'transparent' if you want to hide completely
  },
  rankingContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    width: "100%",
    paddingHorizontal: 10, // Add padding for better alignment
  },
  rankingItem: {
    textAlign: "left", // Align text to the left
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  rankingScrollView: {
    maxHeight: 120, // Limit the height for current ranking
    marginTop: 5,
    width: "100%", // Make it full width
  },
});
