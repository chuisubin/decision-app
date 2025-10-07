import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../styles/TopicInputStyles";
import { PresetOptions, TopicInputProps } from "../types";

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

const TopicInput: React.FC<TopicInputProps> = ({ topic, onTopicChange, onCategoryMatch }) => {
  const [isEditing, setIsEditing] = useState<boolean>(!topic.trim());

  const handleTopicSubmit = (): void => {
    if (topic.trim()) {
      setIsEditing(false);
    }
  };

  const handleEdit = (): void => {
    setIsEditing(true);
  };

  const handleTopicChange = (text: string): void => {
    onTopicChange(text);
    // 檢查是否匹配預設主題
    const matchedCategory = Object.keys(presetOptions).find(
      (category: string) =>
        text.toLowerCase().includes(category) ||
        category.includes(text.toLowerCase())
    );
    onCategoryMatch(matchedCategory || null);
  };

  const selectPresetTopic = (category: string): void => {
    const newTopic = `${category}`;
    onTopicChange(newTopic);
    onCategoryMatch(category);
    setIsEditing(false);
  };

  const renderEditButton = (): React.ReactElement | null => {
    if (topic.trim() && !isEditing) {
      return (
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editButtonText}>✏️</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const renderPreview = (): React.ReactElement | null => {
    if (topic.trim() && !isEditing) {
      return (
        <Text style={styles.preview} numberOfLines={1}>
          {topic}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.topicInput}
            placeholder="例如：午餐吃什麼、今天穿什麼..."
            value={topic}
            onChangeText={handleTopicChange}
            multiline
            autoFocus={isEditing && !!topic.trim()}
          />
          {topic.trim() && (
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleTopicSubmit}
            >
              <Text style={styles.confirmButtonText}>✓ 確認</Text>
            </TouchableOpacity>
          )}

          {/* 預設主題選項 */}
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
        </View>
      ) : (
        topic.trim() && (
          <TouchableOpacity style={styles.topicDisplay} onPress={handleEdit}>
            <Text style={styles.topicText}>{topic}</Text>
            <Text style={styles.editHint}>點擊編輯</Text>
          </TouchableOpacity>
        )
      )}
    </View>
  );
};

export default TopicInput;
