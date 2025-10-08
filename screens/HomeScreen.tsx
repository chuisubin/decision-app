import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp } from "@react-navigation/native";
import { styles } from "../styles/HomeScreenStyles";
import packageJson from "../package.json";

interface HomeScreenProps {
  navigation: NavigationProp<any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const decisionMethods = [
    {
      id: "wheel",
      title: "🎡 輪盤決策",
      description: "旋轉輪盤，讓命運為你做決定",
      color: "#9e35e5",
      screen: "WheelDecision",
      available: true,
    },
    {
      id: "voting",
      title: "🗳️ 投票決策",
      description: "多人投票，民主決定最終選擇",
      color: "#3b82f6",
      screen: "VotingDecision",
      available: false,
    },
    {
      id: "coin",
      title: "🪙 硬幣投擲",
      description: "簡單的正反面選擇",
      color: "#f59e0b",
      screen: "CoinFlip",
      available: false,
    },
    // {
    //   id: "proscons",
    //   title: "📊 優缺點列表",
    //   description: "理性分析，權衡利弊",
    //   color: "#10b981",
    //   screen: "ProsCons",
    //   available: false,
    // },
    // {
    //   id: "random",
    //   title: "🎲 隨機選擇",
    //   description: "純粹的隨機決策器",
    //   color: "#ef4444",
    //   screen: "RandomChoice",
    //   available: false,
    // },
    // {
    //   id: "matrix",
    //   title: "📋 決策矩陣",
    //   description: "多維度評估，科學決策",
    //   color: "#8b5cf6",
    //   screen: "DecisionMatrix",
    //   available: false,
    // },
  ];

  const navigateToMethod = (method: (typeof decisionMethods)[0]) => {
    if (method.available) {
      navigation.navigate(method.screen);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../assets/icon.png")}
            style={styles.headerImage}
          />
          <Text style={styles.title}>決策小助手</Text>
          <Text style={styles.subtitle}>選擇困難症的終極解決方案</Text>
        </View>

        <View style={styles.methodsContainer}>
          <View style={styles.methodsGrid}>
            {decisionMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.methodCard,
                  { borderColor: method.color },
                  !method.available && styles.methodCardDisabled,
                ]}
                onPress={() => navigateToMethod(method)}
                disabled={!method.available}
                activeOpacity={0.8}
              >
                <View style={styles.methodCardContent}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <Text style={styles.methodTitle}>{method.title}</Text>
                    {!method.available && (
                      <View style={styles.statusBadgeDisabled}>
                        <Text style={styles.statusTextDisabled}>即將推出</Text>
                      </View>
                    )}
                  </View>

                  <Text style={styles.methodDescription}>
                    {method.description}
                  </Text>
                </View>

                <View
                  style={[
                    styles.methodAccent,
                    { backgroundColor: method.color },
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>更多決策方法正在開發中...</Text>
          {__DEV__ && (
            <Text style={styles.versionText}>v{packageJson.version}</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
