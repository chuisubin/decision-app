import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../../styles/TopicInputStyles";
import { TopicInputProps } from "../../types";
import {
  presetOptions,
  getCategoryDisplayNames,
} from "../../data/presetOptions";

const TopicInput: React.FC<TopicInputProps> = ({
  topic,
  onTopicChange,
  onCategoryMatch,
}) => {
  const [inputValue, setInputValue] = useState<string>(topic);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(!!topic.trim());

  const handleInputChange = (text: string): void => {
    // 限制輸入20個字符
    if (text.length <= 20) {
      setInputValue(text);
      setIsConfirmed(false);
    }
  };

  const handleConfirm = (): void => {
    if (inputValue.trim()) {
      onTopicChange(inputValue.trim());
      setIsConfirmed(true);

      // 檢查是否匹配預設分類（根據中文顯示名稱）
      const matchedDisplayName = getCategoryDisplayNames().find(
        (displayName) =>
          inputValue.toLowerCase().includes(displayName) ||
          displayName.includes(inputValue.toLowerCase())
      );
      onCategoryMatch(matchedDisplayName || null);
    }
  };

  const handleEdit = (): void => {
    setIsConfirmed(false);
    setInputValue(topic);
  };

  const selectPresetTopic = (category: string): void => {
    const newTopic = `${category}`;
    setInputValue(newTopic);
    onTopicChange(newTopic);
    onCategoryMatch(category);
    setIsConfirmed(true);
  };

  if (isConfirmed && topic.trim()) {
    // 已確認狀態 - 顯示主題和編輯按鈕
    return (
      <View style={styles.container}>
        <View style={styles.confirmedContainer}>
          <Text style={styles.confirmedTopic}>{topic}</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.editButtonText}>編輯</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // 輸入狀態
  return (
    <View style={styles.container}>
      {/* 輸入框和確定按鈕 */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.topicInput}
          placeholder="例如：午餐吃什麼..."
          value={inputValue}
          onChangeText={handleInputChange}
          maxLength={20}
          autoFocus={!isConfirmed}
          returnKeyType="done"
          onSubmitEditing={handleConfirm}
        />
        <TouchableOpacity
          style={[
            styles.confirmButton,
            !inputValue.trim() && styles.confirmButtonDisabled,
          ]}
          onPress={handleConfirm}
          disabled={!inputValue.trim()}
        >
          <Text style={styles.confirmButtonText}>確定</Text>
        </TouchableOpacity>
      </View>

      {/* 字數統計 */}
      <Text style={styles.characterCount}>{inputValue.length}/20</Text>

      {/* 快速選擇主題 */}
      <View style={styles.presetContainer}>
        <Text style={styles.presetTitle}>💡 快速選擇</Text>
        <View style={styles.categoryContainer}>
          {getCategoryDisplayNames().map((displayName, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryTag}
              onPress={() => selectPresetTopic(displayName)}
            >
              <Text style={styles.categoryText}>{displayName}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default TopicInput;
