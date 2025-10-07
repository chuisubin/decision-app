import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp } from "@react-navigation/native";
import { styles } from "../styles/WheelDecisionStyles";
import WheelPicker from "../components/WheelPicker";
import Collapsible from "../components/Collapsible";
import TopicInput from "../components/TopicInput";
import { PresetOptions } from "../types";

interface WheelDecisionScreenProps {
  navigation: NavigationProp<any>;
}

// 預設選項分類
const presetOptions: PresetOptions = {
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

const WheelDecisionScreen: React.FC<WheelDecisionScreenProps> = ({
  navigation,
}) => {
  const [topic, setTopic] = useState<string>("");
  const [customOptions, setCustomOptions] = useState<string[]>([""]);
  const [result, setResult] = useState<string>("");
  const [fadeAnim] = useState<Animated.Value>(new Animated.Value(0));
  const [selectedPresetCategory, setSelectedPresetCategory] = useState<
    string | null
  >(null);

  // 獲取當前可用選項
  const getCurrentOptions = (): string[] => {
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
  const handleWheelResult = (selectedOption: string): void => {
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

  const updateCustomOption = (index: number, value: string): void => {
    const newOptions = [...customOptions];
    newOptions[index] = value;
    setCustomOptions(newOptions);
  };

  const removeCustomOption = (index: number): void => {
    if (customOptions.length > 1) {
      const newOptions = customOptions.filter((_, i) => i !== index);
      setCustomOptions(newOptions);
    }
  };

  const selectPresetTopic = (category: string): void => {
    setTopic(`${category}`);
    setSelectedPresetCategory(category);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>🎡 輪盤決策</Text>
          <Text style={styles.subtitle}>讓輪盤為你做決定！</Text>
        </View>

        <Collapsible
          title="你正在糾結什麼？"
          icon="🤔"
          isInitiallyCollapsed={false} // 預設展開，讓用戶輸入題目
          rightElement={
            topic.trim() && (
              <Text style={styles.topicPreview} numberOfLines={1}>
                {topic}
              </Text>
            )
          }
        >
          <TopicInput
            topic={topic}
            onTopicChange={(text) => {
              setTopic(text);
              // 檢查是否匹配預設主題
              const matchedCategory = Object.keys(presetOptions).find(
                (category) =>
                  text.toLowerCase().includes(category) ||
                  category.includes(text.toLowerCase())
              );
              setSelectedPresetCategory(matchedCategory || null);
            }}
            onCategoryMatch={setSelectedPresetCategory}
          />
        </Collapsible>

        {/* 只有在有題目時才顯示其他組件 */}
        {topic.trim() && (
          <Collapsible
            title="自定義選項"
            icon="✍️"
            isInitiallyCollapsed={true}
            rightElement={
              <Text style={styles.optionsCount}>
                ({customOptions.filter((opt) => opt.trim()).length} 個選項)
              </Text>
            }
          >
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
          </Collapsible>
        )}

        {/* 只有在有題目且匹配預設分類時才顯示 */}
        {topic.trim() && selectedPresetCategory && (
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

        {/* 輪盤區域 - 只有在有題目時才顯示 */}
        {topic.trim() && (
          <>
            {getCurrentOptions().length > 0 && (
              <View>
                <WheelPicker
                  options={getCurrentOptions()}
                  onResult={handleWheelResult}
                />
              </View>
            )}

            {/* 結果顯示 */}
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
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WheelDecisionScreen;
