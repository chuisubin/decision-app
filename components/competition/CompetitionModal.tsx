import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { styles } from "./CompetitionModalStyles";
import { PlayerResult } from "../../types";
import CompetitionGame from "./CompetitionGame";

interface CompetitionModalProps {
  visible: boolean;
  participants: string[];
  difficulty: 1 | 2 | 3;
  onClose: () => void;
}

const CompetitionModal: React.FC<CompetitionModalProps> = ({
  visible,
  participants,
  difficulty,
  onClose,
}) => {
  const [gameState, setGameState] = useState<"playing" | "results">("playing");
  const [results, setResults] = useState<PlayerResult[]>([]);
  const [fadeAnim] = useState(new Animated.Value(0));

  // 重置狀態
  useEffect(() => {
    if (visible) {
      setGameState("playing");
      setResults([]);

      // 淡入動畫
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [visible]);

  // 遊戲完成處理
  const handleGameComplete = (gameResults: PlayerResult[]) => {
    setResults(gameResults);
    setGameState("results");
  };

  // 退出遊戲處理
  const handleExitGame = () => {
    onClose();
  };

  // 重新開始遊戲
  const restartGame = () => {
    setGameState("playing");
    setResults([]);
  };

  // 計算排名
  const sortedResults = [...results].sort(
    (a, b) => a.difference - b.difference
  );
  const winner = sortedResults[0];

  const renderPlayingStage = () => (
    <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
      <CompetitionGame
        participants={participants}
        difficulty={difficulty}
        onGameComplete={handleGameComplete}
        onExitGame={handleExitGame}
      />
    </Animated.View>
  );

  const renderResultsStage = () => (
    <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>🏆 比賽結果</Text>
        <Text style={styles.difficultyText}>
          難度：
          {difficulty === 1
            ? "😇 簡單"
            : difficulty === 2
            ? "😈 中等"
            : "☠️ 困難"}
        </Text>
      </View>

      <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={true}>
        <View style={styles.winnerContainer}>
          <Text style={styles.winnerLabel}>🥇 獲勝者</Text>
          <Text style={styles.winnerName}>{winner.name}</Text>
          <Text style={styles.winnerScore}>
            {winner.time.toFixed(2)} (差距: {winner.difference.toFixed(2)})
          </Text>
        </View>

        <View style={styles.rankingContainer}>
          <Text style={styles.rankingTitle}>完整排名</Text>
          {sortedResults.map((result, index) => (
            <View
              key={index}
              style={[styles.rankingItem, index === 0 && styles.firstPlace]}
            >
              <Text style={styles.rankingPosition}>#{index + 1}</Text>
              <Text style={styles.rankingName}>{result.name}</Text>
              <Text style={styles.rankingScore}>
                {result.time.toFixed(2)} (±{result.difference.toFixed(2)})
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.modalFooter}>
        <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
          <Text style={styles.restartButtonText}>重新比賽</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>返回設定</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        {gameState === "playing" ? renderPlayingStage() : renderResultsStage()}
      </View>
    </Modal>
  );
};

export default CompetitionModal;
