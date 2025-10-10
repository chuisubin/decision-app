import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import HomeScreen from "./screens/HomeScreen";
import WheelDecisionScreen from "./screens/WheelDecisionScreen";
import VotingDecisionScreen from "./screens/VotingDecisionScreen";
import CompetitionDecisionScreen from "./screens/CompetitionDecisionScreen";
import { RootStackParamList } from "./types/navigation";

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.ReactElement {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false, // 隱藏預設標題欄，使用自定義標題
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "話得事嘅APP",
            }}
          />
          <Stack.Screen
            name="WheelDecision"
            component={WheelDecisionScreen}
            options={{
              title: "輪盤話事",
            }}
          />
          <Stack.Screen
            name="VotingDecision"
            component={VotingDecisionScreen}
            options={{
              title: "投票話事",
            }}
          />
          <Stack.Screen
            name="CompetitionDecision"
            component={CompetitionDecisionScreen}
            options={{
              title: "比賽話事",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
