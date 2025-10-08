import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp } from "@react-navigation/native";
import { styles } from "../styles/WheelDecisionStyles";
import WheelPicker from "../components/wheel/WheelPicker";
import Collapsible from "../components/Collapsible";
import TopicInput from "../components/wheel/TopicInput";
import OptionsEditor from "../components/wheel/OptionsEditor";
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
  const [showOptionsEditor, setShowOptionsEditor] = useState<boolean>(false);

  // 獲取當前可用選項
  const getCurrentOptions = (): string[] => {
    if (!topic.trim()) return [];

    const customOptionsFiltered = customOptions
      .map((option) => option.trim())
      .filter((option) => option);

    return customOptionsFiltered.length > 0
      ? customOptionsFiltered
      : ["選項A", "選項B", "選項C", "試試看", "不要", "改天再說"];
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

  const selectPresetTopic = (category: string): void => {
    setTopic(`${category}`);
    setSelectedPresetCategory(category);
  };

  const handleOptionsUpdate = (newOptions: string[]): void => {
    setCustomOptions(newOptions);
  };

  const openOptionsEditor = (): void => {
    setShowOptionsEditor(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button - Fixed at top */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>🎡 輪盤決策</Text>
          <Text style={styles.subtitle}>讓輪盤為你做決定！</Text>
        </View>
        <View style={styles.headerRightSpace} />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* 題目輸入區域 - 始終顯示 */}
          <View style={styles.topicSection}>
            {!topic && (
              <Text style={styles.sectionTitle}>🤔 請輸入您的問題</Text>
            )}
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

                // 如果匹配到預設分類，自動填入選項
                if (matchedCategory && presetOptions[matchedCategory]) {
                  setCustomOptions(presetOptions[matchedCategory]);
                } else {
                  // 如果沒有匹配到預設分類，重置為空選項
                  setCustomOptions([""]);
                }
              }}
              onCategoryMatch={(category) => {
                setSelectedPresetCategory(category);
                // 當直接選擇分類時也要填入選項
                if (category && presetOptions[category]) {
                  setCustomOptions(presetOptions[category]);
                }
              }}
            />
          </View>

          {/* 只有在有題目時才顯示選項區域 */}
          {topic.trim() && (
            <View style={styles.optionsSection}>
              <TouchableOpacity
                style={styles.optionsButton}
                onPress={openOptionsEditor}
              >
                <View style={styles.optionsButtonContent}>
                  <Text style={styles.optionsButtonIcon}>📝</Text>
                  <View style={styles.optionsButtonTextContainer}>
                    <Text style={styles.optionsButtonTitle}>選項設定</Text>
                    <Text style={styles.optionsButtonSubtitle}>
                      目前有 {customOptions.filter((opt) => opt.trim()).length}{" "}
                      個選項
                    </Text>
                  </View>
                  <Text style={styles.optionsButtonArrow}>›</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* 輪盤區域 - 只有在有題目且至少2個選項時才顯示 */}
          {topic.trim() && (
            <>
              {getCurrentOptions().length >= 2 ? (
                <View>
                  <WheelPicker
                    options={getCurrentOptions()}
                    onResult={handleWheelResult}
                  />
                </View>
              ) : (
                <View style={styles.wheelPlaceholder}>
                  <Text style={styles.wheelPlaceholderText}>
                    🎡 需要至少 2 個選項才能開始決策
                  </Text>
                  <Text style={styles.wheelPlaceholderHint}>
                    請點擊「選項設定」添加更多選項
                  </Text>
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
                  <TouchableOpacity
                    style={styles.resetButton}
                    onPress={resetApp}
                  >
                    <Text style={styles.resetButtonText}>🔄 重新開始</Text>
                  </TouchableOpacity>
                </Animated.View>
              )}
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Options Editor Modal */}
      <OptionsEditor
        visible={showOptionsEditor}
        options={customOptions}
        onClose={() => setShowOptionsEditor(false)}
        onSave={handleOptionsUpdate}
      />
    </SafeAreaView>
  );
};

export default WheelDecisionScreen;
