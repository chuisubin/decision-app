import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 20,
    backgroundColor: "#f8f4ff",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(158, 53, 229, 0.15)",
    shadowColor: "#9e35e5",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(158, 53, 229, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(158, 53, 229, 0.2)",
  },
  backButtonText: {
    color: "#9e35e5",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: -1,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#9e35e5",
    textAlign: "center",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: "#6b46c1",
    textAlign: "center",
    fontWeight: "500",
  },
  headerRightSpace: {
    width: 40,
    height: 40,
  },
});
