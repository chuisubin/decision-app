import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
  Animated,
} from "react-native";

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

export default function App() {
  const [topic, setTopic] = useState("");
  const [customOptions, setCustomOptions] = useState([""]);
  const [result, setResult] = useState("");
  const [isDeciding, setIsDeciding] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [selectedPresetCategory, setSelectedPresetCategory] = useState(null);

  const makeDecision = () => {
    if (!topic.trim()) {
      Alert.alert("請輸入主題", "請先輸入您正在糾結的主題");
      return;
    }

    setIsDeciding(true);
    setResult("");

    // 檢查是否有預設選項
    let options = [];
    const topicLower = topic.toLowerCase();
    const matchedCategory = Object.keys(presetOptions).find(
      (category) =>
        topicLower.includes(category) || category.includes(topicLower)
    );

    if (matchedCategory) {
      options = presetOptions[matchedCategory];
    } else {
      // 使用自定義選項
      const customOptionsFiltered = customOptions
        .map((option) => option.trim())
        .filter((option) => option);

      if (customOptionsFiltered.length > 0) {
        options = customOptionsFiltered;
      } else {
        // 通用預設選項
        options = [
          "選項A",
          "選項B",
          "選項C",
          "試試看",
          "不要",
          "改天再說",
          "隨便",
          "都可以",
        ];
      }
    }

    if (options.length === 0) {
      Alert.alert("沒有選項", "請輸入一些選項，用逗號分隔");
      setIsDeciding(false);
      return;
    }

    // 模擬決策過程
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * options.length);
      const selectedOption = options[randomIndex];
      setResult(selectedOption);
      setIsDeciding(false);

      // 結果動畫
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }, 2000);
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
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>🎯 決策助手</Text>
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

          <TouchableOpacity style={styles.addButton} onPress={addCustomOption}>
            <Text style={styles.addButtonText}>+ 新增選擇</Text>
          </TouchableOpacity>
        </View>

        {selectedPresetCategory && (
          <View style={styles.presetOptionsContainer}>
            <Text style={styles.presetOptionsTitle}>
              📋 {selectedPresetCategory}的預設選項
            </Text>
            <Text style={styles.presetOptionsHint}>
              以下是系統為您準備的選項，點擊「幫我決定」將從這些選項中隨機選擇
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

        <TouchableOpacity
          style={[styles.button, isDeciding && styles.buttonDisabled]}
          onPress={makeDecision}
          disabled={isDeciding}
        >
          <Text style={styles.buttonText}>
            {isDeciding ? "🤔 思考中..." : "🎲 幫我決定"}
          </Text>
        </TouchableOpacity>

        {isDeciding && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>正在為你分析選項...</Text>
            <Text style={styles.loadingSubtext}>請稍等片刻 ⏳</Text>
          </View>
        )}

        {result && !isDeciding && (
          <Animated.View
            style={[styles.resultContainer, { opacity: fadeAnim }]}
          >
            <Text style={styles.resultTitle}>✨ 結果出爐！</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#718096",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    color: "#a0aec0",
    marginBottom: 8,
  },
  topicInput: {
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#fff",
    minHeight: 60,
    textAlignVertical: "top",
  },
  optionsInput: {
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#fff",
    minHeight: 50,
    textAlignVertical: "center",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: "#48bb78",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  removeButton: {
    backgroundColor: "#f56565",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginLeft: 8,
    minWidth: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  presetOptionsContainer: {
    backgroundColor: "#f7fafc",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#e2e8f0",
  },
  presetOptionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 8,
    textAlign: "center",
  },
  presetOptionsHint: {
    fontSize: 14,
    color: "#718096",
    marginBottom: 16,
    textAlign: "center",
    lineHeight: 20,
  },
  presetOptionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  presetOptionTag: {
    backgroundColor: "#e6fffa",
    borderColor: "#38b2ac",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    margin: 4,
  },
  presetOptionText: {
    color: "#234e52",
    fontSize: 14,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#4299e1",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 20,
    shadowColor: "#4299e1",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: "#a0aec0",
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  loadingText: {
    fontSize: 18,
    color: "#4a5568",
    marginBottom: 8,
  },
  loadingSubtext: {
    fontSize: 14,
    color: "#718096",
  },
  resultContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#38a169",
    marginBottom: 16,
  },
  resultBox: {
    backgroundColor: "#68d391",
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: 20,
    minWidth: 200,
    alignItems: "center",
    shadowColor: "#68d391",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  resultText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  resetButton: {
    backgroundColor: "#ed8936",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginTop: 16,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  presetContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  presetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 8,
    textAlign: "center",
  },
  presetHint: {
    fontSize: 14,
    color: "#718096",
    marginBottom: 12,
    textAlign: "center",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  categoryTag: {
    backgroundColor: "#bee3f8",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    margin: 4,
    shadowColor: "#2b6cb0",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
  },
  categoryText: {
    color: "#2b6cb0",
    fontSize: 14,
    fontWeight: "500",
  },
});
