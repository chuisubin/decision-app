import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Animated,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles/AppStyles";
import WheelPicker from "./components/WheelPicker";

// 預設選項分類
const presetOptions = {
  午餐: [
    "炒飯",
    "麵條",
    "便當",
    "披薩",
    "漢堡",
    "沙拉",
    "三明治",
    "湯麵",
    "火鍋",
    "壽司",
  ],
  晚餐: [
    "火鍋",
    "燒烤",
    "義大利麵",
    "牛排",
    "中式熱炒",
    "日式料理",
    "韓式料理",
    "泰式料理",
    "印度料理",
    "素食",
  ],
  飲料: [
    "咖啡",
    "奶茶",
    "果汁",
    "汽水",
    "開水",
    "綠茶",
    "烏龍茶",
    "檸檬水",
    "椰子水",
    "氣泡水",
  ],
  娛樂: [
    "看電影",
    "逛街",
    "打遊戲",
    "運動",
    "讀書",
    "聽音樂",
    "畫畫",
    "散步",
    "聊天",
    "睡覺",
  ],
  交通: [
    "走路",
    "騎車",
    "開車",
    "搭公車",
    "搭捷運",
    "搭計程車",
    "搭火車",
    "騎機車",
    "滑板車",
    "跑步",
  ],
  穿搭: [
    "休閒服",
    "正式服裝",
    "運動服",
    "連身裙",
    "牛仔褲",
    "T恤",
    "襯衫",
    "外套",
    "短褲",
    "裙子",
  ],
};

function App() {
  const [topic, setTopic] = useState("");
  const [customOptions, setCustomOptions] = useState([""]);
  const [result, setResult] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));
  const [selectedPresetCategory, setSelectedPresetCategory] = useState(null);

  // 獲取當前可用選項
  const getCurrentOptions = () => {
    if (!topic.trim()) return [];

    const topicLower = topic.toLowerCase();
    const matchedCategory = Object.keys(presetOptions).find(
      (category) =>
        topicLower.includes(category) || category.includes(topicLower)
    );

    if (matchedCategory) {
      return presetOptions[matchedCategory];
    } else {
      const customOptionsFiltered = customOptions
        .map((option) => option.trim())
        .filter((option) => option);

      return customOptionsFiltered.length > 0
        ? customOptionsFiltered
        : ["選項A", "選項B", "選項C", "試試看", "不要", "改天再說"];
    }
  };

  // 處理輪盤結果
  const handleWheelResult = (selectedOption) => {
    setResult(selectedOption);

    // 結果動畫
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const resetApp = () => {
    setTopic("");
    setCustomOptions([""]);
    setResult("");
    setSelectedPresetCategory(null);
    fadeAnim.setValue(0);
  };

  const addCustomOption = () => {
    setCustomOptions([...customOptions, ""]);
  };

  const updateCustomOption = (index, value) => {
    const newOptions = [...customOptions];
    newOptions[index] = value;
    setCustomOptions(newOptions);
  };

  const removeCustomOption = (index) => {
    if (customOptions.length > 1) {
      const newOptions = customOptions.filter((_, i) => i !== index);
      setCustomOptions(newOptions);
    }
  };

  const selectPresetTopic = (category) => {
    setTopic(`${category}要選什麼`);
    setSelectedPresetCategory(category);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>🎯 決策小助手</Text>
            <Text style={styles.subtitle}>讓我來幫你做決定！</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>你正在糾結什麼？</Text>
            <TextInput
              style={styles.topicInput}
              placeholder="例如：午餐吃什麼、今天穿什麼..."
              value={topic}
              onChangeText={(text) => {
                setTopic(text);
                // 檢查是否匹配預設主題
                const matchedCategory = Object.keys(presetOptions).find(
                  (category) =>
                    text.toLowerCase().includes(category) ||
                    category.includes(text.toLowerCase())
                );
                setSelectedPresetCategory(matchedCategory || null);
              }}
              multiline
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>自定義選項 (可選)</Text>
            <Text style={styles.hint}>每個輸入框代表一個選擇</Text>

            {customOptions.map((option, index) => (
              <View key={index} style={styles.optionRow}>
                <TextInput
                  style={[styles.optionsInput, { flex: 1 }]}
                  placeholder={`選項 ${index + 1}`}
                  value={option}
                  onChangeText={(value) => updateCustomOption(index, value)}
                />
                {customOptions.length > 1 && (
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeCustomOption(index)}
                  >
                    <Text style={styles.removeButtonText}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}

            <TouchableOpacity
              style={styles.addButton}
              onPress={addCustomOption}
            >
              <Text style={styles.addButtonText}>+ 新增選擇</Text>
            </TouchableOpacity>
          </View>
          {selectedPresetCategory && (
            <View style={styles.presetOptionsContainer}>
              <Text style={styles.presetOptionsTitle}>
                📋 {selectedPresetCategory}的預設選項
              </Text>
              <Text style={styles.presetOptionsHint}>
                以下是系統為您準備的選項，使用輪盤進行隨機選擇
              </Text>
              <View style={styles.presetOptionsGrid}>
                {presetOptions[selectedPresetCategory].map((option, index) => (
                  <View key={index} style={styles.presetOptionTag}>
                    <Text style={styles.presetOptionText}>{option}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          {/* 輪盤區域 */}
          {topic.trim() && getCurrentOptions().length > 0 ? (
            <View style={styles.wheelSection}>
              <Text style={styles.wheelTitle}>🎡 決策輪盤</Text>
              <Text style={styles.wheelSubtitle}>旋轉輪盤來做決定吧！</Text>
              <WheelPicker
                options={getCurrentOptions()}
                onResult={handleWheelResult}
              />
            </View>
          ) : topic.trim() ? (
            <View style={styles.noOptionsContainer}>
              <Text style={styles.noOptionsText}>
                請添加一些自定義選項，或者選擇預設主題
              </Text>
            </View>
          ) : null}{" "}
          {result && (
            <Animated.View
              style={[styles.resultContainer, { opacity: fadeAnim }]}
            >
              <Text style={styles.resultTitle}>✨ 輪盤結果出爐！</Text>
              <View style={styles.resultBox}>
                <Text style={styles.resultText}>{result}</Text>
              </View>
              <TouchableOpacity style={styles.resetButton} onPress={resetApp}>
                <Text style={styles.resetButtonText}>🔄 重新開始</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
          <View style={styles.presetContainer}>
            <Text style={styles.presetTitle}>💡 支援的主題</Text>
            <Text style={styles.presetHint}>點擊任一主題快速填入</Text>
            <View style={styles.categoryContainer}>
              {Object.keys(presetOptions).map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.categoryTag}
                  onPress={() => selectPresetTopic(category)}
                >
                  <Text style={styles.categoryText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
