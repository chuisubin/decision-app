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
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp } from "@react-navigation/native";
import { styles } from "../styles/WheelDecisionStyles";
import WheelPicker from "../components/wheel/WheelPicker";
import Collapsible from "../components/Collapsible";
import TopicInput from "../components/wheel/TopicInput";
import OptionsEditor from "../components/wheel/OptionsEditor";
import {
  presetOptions,
  getCategoryKeyByDisplayName,
  getOptionsByKey,
} from "../data/presetOptions";

interface WheelDecisionScreenProps {
  navigation: NavigationProp<any>;
}

const WheelDecisionScreen: React.FC<WheelDecisionScreenProps> = ({
  navigation,
}) => {
  const [topic, setTopic] = useState<string>("");
  const [customOptions, setCustomOptions] = useState<string[]>([""]);
  const [result, setResult] = useState<string>("");
  const [showResultPopup, setShowResultPopup] = useState<boolean>(false);
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

    return customOptionsFiltered.length > 0 ? customOptionsFiltered : [];
  };

  // 處理輪盤結果
  const handleWheelResult = (selectedOption: string): void => {
    setResult(selectedOption);
    setShowResultPopup(true);

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
    setShowResultPopup(false);
    setSelectedPresetCategory(null);
    fadeAnim.setValue(0);
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
          <Text style={styles.title}>🎡 輪盤話事</Text>
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
                // 檢查是否匹配預設主題（根據中文顯示名稱或英文 key）
                const matchedKey = Object.keys(presetOptions).find((key) => {
                  const category = presetOptions[key];
                  return (
                    text.toLowerCase().includes(category.displayName) ||
                    category.displayName.includes(text.toLowerCase()) ||
                    text.toLowerCase().includes(key) ||
                    key.includes(text.toLowerCase())
                  );
                });
                setSelectedPresetCategory(matchedKey || null);

                // 如果匹配到預設分類，自動填入選項
                if (matchedKey && presetOptions[matchedKey]) {
                  setCustomOptions(presetOptions[matchedKey].options);
                } else {
                  // 如果沒有匹配到預設分類，重置為空選項
                  setCustomOptions([""]);
                }
              }}
              onCategoryMatch={(category) => {
                // category 現在是中文顯示名稱，需要轉換為 key
                if (category) {
                  const categoryKey = getCategoryKeyByDisplayName(category);
                  setSelectedPresetCategory(categoryKey);
                  // 當直接選擇分類時也要填入選項
                  if (categoryKey) {
                    setCustomOptions(getOptionsByKey(categoryKey));
                  }
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
            </>
          )}
          {/* 底部結果區域 - 有結果時顯示 */}
          {result && (
            <View style={styles.bottomResultContainer}>
              <View style={styles.bottomResultContent}>
                <Text style={styles.bottomResultLabel}>結果：</Text>
                <Text style={styles.bottomResultText}>{result}</Text>
              </View>
              <TouchableOpacity
                style={styles.bottomResetButton}
                onPress={resetApp}
              >
                <Text style={styles.bottomResetButtonText}>🔄 重置</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Result Popup Modal */}
      <Modal
        visible={showResultPopup}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowResultPopup(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.resultPopup, { opacity: fadeAnim }]}>
            <Text style={styles.resultPopupTitle}>✨ 輪盤結果出爐！</Text>
            <View style={styles.resultPopupBox}>
              <Text style={styles.resultPopupText}>{result}</Text>
            </View>
            <View style={styles.resultPopupButtons}>
              <TouchableOpacity
                style={styles.resultPopupButton}
                onPress={() => setShowResultPopup(false)}
              >
                <Text style={styles.resultPopupButtonText}>OK!</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>

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
