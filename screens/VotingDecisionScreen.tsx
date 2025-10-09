import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp } from "@react-navigation/native";
import { styles } from "../styles/VotingDecisionStyles";
import DecisionHeader from "../components/common/DecisionHeader";
import TopicInput from "../components/wheel/TopicInput";
import OptionsEditor from "../components/wheel/OptionsEditor";
import VotingModal from "../components/voting/VotingModal";
import {
  presetOptions,
  getCategoryKeyByDisplayName,
  getOptionsByKey,
} from "../data/presetOptions";

interface VotingDecisionScreenProps {
  navigation: NavigationProp<any>;
}

const VotingDecisionScreen: React.FC<VotingDecisionScreenProps> = ({
  navigation,
}) => {
  const [topic, setTopic] = useState<string>("");
  const [customOptions, setCustomOptions] = useState<string[]>([""]);
  const [voterCount, setVoterCount] = useState<string>("");
  const [selectedPresetCategory, setSelectedPresetCategory] = useState<
    string | null
  >(null);
  const [showOptionsEditor, setShowOptionsEditor] = useState<boolean>(false);
  const [showVotingModal, setShowVotingModal] = useState<boolean>(false);

  // 獲取當前可用選項
  const getCurrentOptions = (): string[] => {
    if (!topic.trim()) return [];

    const customOptionsFiltered = customOptions
      .map((option) => option.trim())
      .filter((option) => option);

    return customOptionsFiltered.length > 0 ? customOptionsFiltered : [];
  };

  const handleOptionsUpdate = (newOptions: string[]): void => {
    setCustomOptions(newOptions);
  };

  const openOptionsEditor = (): void => {
    setShowOptionsEditor(true);
  };

  const startVoting = (): void => {
    const options = getCurrentOptions();
    const voterNum = parseInt(voterCount);

    if (!topic.trim()) {
      Alert.alert("錯誤", "請輸入投票主題");
      return;
    }

    if (options.length < 2) {
      Alert.alert("錯誤", "至少需要 2 個投票選項");
      return;
    }

    if (!voterCount || voterNum < 2) {
      Alert.alert("錯誤", "投票人數至少需要 2 人");
      return;
    }

    if (voterNum > 20) {
      Alert.alert("錯誤", "投票人數不能超過 20 人");
      return;
    }

    setShowVotingModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <DecisionHeader
        navigation={navigation}
        title="🗳️ 投票決策"
        subtitle="多人投票，民主決定最終選擇"
      />

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
          {/* 題目輸入區域 */}
          <View style={styles.topicSection}>
            {!topic && (
              <Text style={styles.sectionTitle}>🤔 請輸入投票主題</Text>
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

          {/* 投票人數設定 */}
          {topic.trim() && (
            <View style={styles.voterCountSection}>
              <Text style={styles.sectionTitle}>👥 設定投票人數</Text>
              <View style={styles.voterCountContainer}>
                <Text style={styles.voterCountLabel}>投票人數:</Text>
                <View style={styles.voterCountInputContainer}>
                  <TouchableOpacity
                    style={styles.countButton}
                    onPress={() => {
                      const current = parseInt(voterCount) || 0;
                      if (current > 2) setVoterCount((current - 1).toString());
                    }}
                  >
                    <Text style={styles.countButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.voterCountDisplay}>
                    {voterCount || "0"} 人
                  </Text>
                  <TouchableOpacity
                    style={styles.countButton}
                    onPress={() => {
                      const current = parseInt(voterCount) || 0;
                      if (current < 20) setVoterCount((current + 1).toString());
                    }}
                  >
                    <Text style={styles.countButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {/* 選項設定區域 */}
          {topic.trim() && (
            <View style={styles.optionsSection}>
              <TouchableOpacity
                style={styles.optionsButton}
                onPress={openOptionsEditor}
              >
                <View style={styles.optionsButtonContent}>
                  <Text style={styles.optionsButtonIcon}>📝</Text>
                  <View style={styles.optionsButtonTextContainer}>
                    <Text style={styles.optionsButtonTitle}>投票選項設定</Text>
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

          {/* 開始投票按鈕 */}
          {topic.trim() && (
            <View style={styles.startVotingSection}>
              {getCurrentOptions().length >= 2 &&
              voterCount &&
              parseInt(voterCount) >= 2 ? (
                <TouchableOpacity
                  style={styles.startVotingButton}
                  onPress={startVoting}
                >
                  <Text style={styles.startVotingButtonText}>
                    🗳️ 開始 {voterCount} 人投票
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.votingPlaceholder}>
                  <Text style={styles.votingPlaceholderText}>
                    📋 準備投票中...
                  </Text>
                  <Text style={styles.votingPlaceholderHint}>
                    需要至少 2 個選項和 2 位投票者
                  </Text>
                </View>
              )}
            </View>
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

      {/* Voting Modal */}
      <VotingModal
        visible={showVotingModal}
        topic={topic}
        options={getCurrentOptions()}
        voterCount={parseInt(voterCount)}
        onClose={() => setShowVotingModal(false)}
      />
    </SafeAreaView>
  );
};

export default VotingDecisionScreen;
