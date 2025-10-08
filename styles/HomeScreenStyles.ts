import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

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
  headerImage: {
    width: 80,
    height: 80,
    marginBottom: 20,
    borderRadius: 20,
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
  methodsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  methodsGrid: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
  },
  methodCard: {
    width: "100%", // 1列佈局，考慮 padding 和 gap
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: "relative",
    overflow: "hidden",
  },
  methodCardDisabled: {
    opacity: 0.6,
    backgroundColor: "#f9fafb",
  },
  methodCardContent: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  methodDescription: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: "auto",
  },
  statusBadgeDisabled: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    marginTop: "auto",
  },
  statusText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  statusTextDisabled: {
    color: "#9ca3af",
    fontSize: 12,
    fontWeight: "600",
  },
  methodAccent: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 4,
    height: "100%",
  },
  footer: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 5,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 10,
  },
  versionText: {
    fontSize: 12,
    color: "#9ca3af",
    textAlign: "center",
  },
});
