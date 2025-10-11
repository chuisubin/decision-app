import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { styles } from "../styles/CompetitionDecisionStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import Collapsible from "../components/Collapsible";
import CompetitionModal from "../components/competition/CompetitionModal";
import DecisionHeader from "../components/common/DecisionHeader";

type CompetitionDecisionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CompetitionDecision"
>;

interface Props {
  navigation: CompetitionDecisionScreenNavigationProp;
}

const CompetitionDecisionScreen: React.FC<Props> = ({ navigation }) => {
  const [participants, setParticipants] = useState<string[]>([]);
  const [newParticipantName, setNewParticipantName] = useState("");
  const [difficulty, setDifficulty] = useState<1 | 2 | 3>(1);
  const [showGameModal, setShowGameModal] = useState<boolean>(false);

  // 開始遊戲
  const startGame = () => {
    if (participants.length < 2) {
      Alert.alert("提示", "至少需要2位參加者才能開始遊戲");
      return;
    }
    setShowGameModal(true);
  };

  // 關閉遊戲彈窗
  const closeGameModal = () => {
    setShowGameModal(false);
  };

  // 添加參加者
  const addParticipant = () => {
    if (
      newParticipantName.trim() &&
      !participants.includes(newParticipantName.trim())
    ) {
      setParticipants([...participants, newParticipantName.trim()]);
      setNewParticipantName("");
    }
  };

  // 移除參加者
  const removeParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const renderSetupPhase = () => (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ flex: 1, padding: 20 }}>
        {/* 難度設定區域 */}

        <Collapsible
          title={`參加者名單 (${participants.length})`}
          icon="👥"
          isInitiallyCollapsed={false}
          containerStyle={styles.collapsibleContainer}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={newParticipantName}
              onChangeText={setNewParticipantName}
              placeholder="輸入參加者姓名"
              onSubmitEditing={addParticipant}
              returnKeyType="done"
            />
            <TouchableOpacity
              style={[
                styles.addButton,
                !newParticipantName.trim() && styles.disabledButton,
              ]}
              onPress={addParticipant}
              disabled={!newParticipantName.trim()}
            >
              <Text style={styles.addButtonText}>添加</Text>
            </TouchableOpacity>
          </View>

          {/* 動物 emoji 選擇區 */}
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}
          >
            {[
              { icon: "🐶", name: "小狗" },
              { icon: "🐱", name: "小貓" },
              { icon: "🐭", name: "老鼠" },
              { icon: "🐹", name: "倉鼠" },
              { icon: "🐰", name: "兔子" },
              { icon: "🦊", name: "狐狸" },
              { icon: "🐻", name: "熊" },
              { icon: "🐼", name: "熊貓" },
              { icon: "🐯", name: "老虎" },
              { icon: "🦁", name: "獅子" },
              { icon: "🐮", name: "牛" },
              { icon: "🐷", name: "豬" },
              { icon: "🐸", name: "青蛙" },
              { icon: "🐵", name: "猴子" },
              { icon: "🐔", name: "雞" },
              { icon: "🐧", name: "企鵝" },
              { icon: "🐦", name: "小鳥" },
              { icon: "🐴", name: "馬" },
              { icon: "🐟", name: "魚" },
              { icon: "🦄", name: "獨角獸" },
            ].map((animal, idx) => (
              <TouchableOpacity
                key={animal.icon}
                style={{
                  padding: 6,
                  margin: 2,
                  borderRadius: 8,
                  backgroundColor: "#f2f2f2",
                }}
                onPress={() => {
                  const display = animal.icon + animal.name;
                  if (!participants.includes(display)) {
                    setParticipants([...participants, display]);
                  }
                }}
              >
                <Text style={{ fontSize: 24 }}>{animal.icon}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.participantsList}>
            {participants.map((participant, index) => (
              <View key={index} style={styles.participantItem}>
                <Text style={styles.participantName}>{participant}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeParticipant(index)}
                >
                  <Text style={styles.removeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
            {participants.length === 0 && (
              <Text style={styles.emptyText}>還沒有參加者，請先添加</Text>
            )}
          </View>
        </Collapsible>
        <Collapsible
          title="難度設定"
          icon="⚡"
          isInitiallyCollapsed={true}
          containerStyle={styles.collapsibleContainer}
        >
          <View style={styles.difficultyContainer}>
            <View style={styles.difficultyButtons}>
              <TouchableOpacity
                style={[
                  styles.difficultyButton,
                  difficulty === 1 && styles.selectedDifficultyButton,
                ]}
                onPress={() => setDifficulty(1)}
              >
                <Text
                  style={[
                    styles.difficultyButtonText,
                    difficulty === 1 && styles.selectedDifficultyButtonText,
                  ]}
                >
                  😇 簡單
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.difficultyButton,
                  difficulty === 2 && styles.selectedDifficultyButton,
                ]}
                onPress={() => setDifficulty(2)}
              >
                <Text
                  style={[
                    styles.difficultyButtonText,
                    difficulty === 2 && styles.selectedDifficultyButtonText,
                  ]}
                >
                  😈 中等
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.difficultyButton,
                  difficulty === 3 && styles.selectedDifficultyButton,
                ]}
                onPress={() => setDifficulty(3)}
              >
                <Text
                  style={[
                    styles.difficultyButtonText,
                    difficulty === 3 && styles.selectedDifficultyButtonText,
                  ]}
                >
                  ☠️ 困難
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.difficultyDescription}>
              {difficulty === 1 && "簡單：始終顯示時間"}
              {difficulty === 2 && "中等：7秒後隱藏時間顯示"}
              {difficulty === 3 && "困難：3秒後隱藏時間顯示"}
            </Text>
          </View>
        </Collapsible>
        <TouchableOpacity
          style={[
            styles.startButton,
            participants.length < 2 && styles.disabledButton,
          ]}
          onPress={startGame}
          disabled={participants.length < 2}
        >
          <Text style={styles.startButtonText}>開始比賽</Text>
        </TouchableOpacity>

        <View style={styles.rulesContainer}>
          <Text style={styles.rulesTitle}>遊戲規則：</Text>
          <Text style={styles.rulesText}>
            • 每位參加者要在最接近10秒時按下停止
          </Text>
          <Text style={styles.rulesText}>• 與10秒差距最小的人獲得決策權</Text>
          <Text style={styles.rulesText}>
            • 如果大家都不想決策,與10秒差距最遠的人負責決策
          </Text>
          <Text style={styles.rulesText}>• 按「準備」後再按「開始」計時</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <DecisionHeader
          navigation={navigation}
          title="⏱️ 比賽話事"
          subtitle="計時比賽，最接近目標時間的人獲勝"
        />

        {/* Setup 頁面始終顯示 */}
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          {renderSetupPhase()}
        </ScrollView>
      </SafeAreaView>

      {/* 比賽彈窗 */}
      <CompetitionModal
        visible={showGameModal}
        participants={participants}
        difficulty={difficulty}
        onClose={closeGameModal}
      />
    </>
  );
};

export default CompetitionDecisionScreen;
