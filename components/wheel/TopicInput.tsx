import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../../styles/TopicInputStyles";
import { PresetOptions, TopicInputProps } from "../../types";

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

      // 檢查是否匹配預設分類
      const matchedCategory = Object.keys(presetOptions).find(
        (category) =>
          inputValue.toLowerCase().includes(category) ||
          category.includes(inputValue.toLowerCase())
      );
      onCategoryMatch(matchedCategory || null);
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
    </View>
  );
};

export default TopicInput;
