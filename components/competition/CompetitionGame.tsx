import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, Animated } from "react-native";
import { styles } from "./CompetitionGameStyles";
import { PlayerResult } from "../../types";

interface CompetitionGameProps {
  participants: string[];
  difficulty: 1 | 2 | 3; // 新增難度參數
  onGameComplete: (results: PlayerResult[]) => void;
  onExitGame: () => void;
}

const CompetitionGame: React.FC<CompetitionGameProps> = ({
  participants,
  difficulty, // 接收難度參數
  onGameComplete,
  onExitGame,
}) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [results, setResults] = useState<PlayerResult[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [isCurrentPlayerCompleted, setIsCurrentPlayerCompleted] =
    useState(false);
  const [breathAnim] = useState(new Animated.Value(1));

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // 清理計時器
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      breathAnim.stopAnimation();
    };
  }, []);

  // 準備階段
  const handleReady = () => {
    setIsReady(true);
    setCurrentTime(0);
  };

  // 開始計時
  const startTimer = () => {
    setIsTimerRunning(true);
    setIsReady(false);
    startTimeRef.current = Date.now();
    Animated.loop(
      Animated.sequence([
        Animated.timing(breathAnim, {
          toValue: 20,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(breathAnim, {
          toValue: 8,
          duration: 500,
          useNativeDriver: false,
        }),
      ])
    ).start();
    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      setCurrentTime(elapsed);
    }, 10); // 每10毫秒更新一次，提供更精確的顯示
  };

  // 停止計時
  const stopTimer = () => {
    if (!isTimerRunning) return;

    setIsTimerRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    breathAnim.stopAnimation();

    const finalTime = currentTime;
    const difference = Math.abs(finalTime - 10);
    const currentPlayer = participants[currentPlayerIndex];

    const newResult: PlayerResult = {
      name: currentPlayer,
      time: finalTime,
      difference: difference,
    };

    const updatedResults = [...results, newResult];
    setResults(updatedResults);
    setIsCurrentPlayerCompleted(true);

    // 最後一位玩家完成後不自動跳轉，等待用戶點擊"查看結果"
  };

  // 切換到下一位玩家
  const goToNextPlayer = () => {
    setCurrentPlayerIndex(currentPlayerIndex + 1);
    setCurrentTime(0);
    setIsReady(false);
    setIsCurrentPlayerCompleted(false);
  };

  // 查看結果
  const viewResults = () => {
    onGameComplete(results);
  };

  // 退出遊戲確認
  const handleExitGame = () => {
    Alert.alert("退出比賽", "確定要退出當前比賽嗎？比賽進度將會丟失。", [
      {
        text: "取消",
        style: "cancel",
      },
      {
        text: "退出",
        style: "destructive",
        onPress: () => {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          onExitGame();
        },
      },
    ]);
  };

  // 判斷是否應該隱藏時間顯示
  const shouldHideTime = () => {
    if (difficulty === 1) return false; // 1星：始終顯示
    if (difficulty === 2) return currentTime >= 7; // 2星：7秒後隱藏
    if (difficulty === 3) return currentTime >= 3; // 3星：3秒後隱藏
    return false;
  };

  // 格式化時間顯示
  const formatTimeDisplay = (time: number) => {
    if (shouldHideTime()) {
      return "???";
    }
    const timeString = time.toFixed(2);
    const parts = timeString.split(".");
    const seconds = parts[0].padStart(2, "0");
    const milliseconds = parts[1];
    return `${seconds}.${milliseconds}`;
  };

  // 判斷結束後的陰影顏色
  const getResultShadowColor = () => {
    if (!isTimerRunning && isCurrentPlayerCompleted) {
      if (currentTime >= 9.9 && currentTime <= 10.09) {
        return "#4CAF50"; // 綠色
      } else if (currentTime >= 9.7 && currentTime <= 10.29) {
        return "#CDDC39"; // 黃綠色
      } else return "#FFD600"; // 黃色
    }
    return "#FF1744"; // 計時中紅色
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.gameTitle}>⏱️ 計時比賽</Text>
        </View>
        <TouchableOpacity style={styles.exitButton} onPress={handleExitGame}>
          <Text style={styles.exitButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gameContent}>
        <Text style={styles.playerInfo}>
          第 {currentPlayerIndex + 1} / {participants.length} 位
        </Text>
        <Text style={styles.currentPlayer}>
          {participants[currentPlayerIndex]}
        </Text>

        <Animated.View
          style={[
            styles.timerContainer,
            isTimerRunning
              ? {
                  shadowColor: getResultShadowColor(),
                  shadowOpacity: 0.7,
                  shadowRadius: breathAnim,
                  elevation: breathAnim,
                  borderColor: getResultShadowColor(),
                  borderWidth: 2,
                }
              : isCurrentPlayerCompleted
              ? {
                  shadowColor: getResultShadowColor(),
                  shadowOpacity: 0.7,
                  shadowRadius: 20,
                  elevation: 20,
                  borderColor: getResultShadowColor(),
                  borderWidth: 2,
                }
              : {},
          ]}
        >
          <Text
            style={[
              styles.timerDisplay,
              shouldHideTime() && styles.hiddenTimeDisplay,
            ]}
          >
            {formatTimeDisplay(currentTime)}
          </Text>
          <Text style={styles.targetTime}>目標：10.00</Text>
        </Animated.View>

        <View style={styles.gameControls}>
          {!isReady && !isTimerRunning && !isCurrentPlayerCompleted && (
            <TouchableOpacity style={styles.readyButton} onPress={handleReady}>
              <Text style={styles.readyButtonText}>準備</Text>
            </TouchableOpacity>
          )}

          {isReady && !isTimerRunning && !isCurrentPlayerCompleted && (
            <TouchableOpacity
              style={styles.startTimerButton}
              onPress={startTimer}
            >
              <Text style={styles.startTimerButtonText}>開始計時</Text>
            </TouchableOpacity>
          )}

          {isTimerRunning && (
            <TouchableOpacity style={styles.stopButton} onPress={stopTimer}>
              <Text style={styles.stopButtonText}>停止！</Text>
            </TouchableOpacity>
          )}

          {isCurrentPlayerCompleted &&
            currentPlayerIndex < participants.length - 1 && (
              <TouchableOpacity
                style={styles.nextPlayerButton}
                onPress={goToNextPlayer}
              >
                <Text style={styles.nextPlayerButtonText}>下一位</Text>
              </TouchableOpacity>
            )}

          {isCurrentPlayerCompleted &&
            currentPlayerIndex === participants.length - 1 && (
              <View style={styles.completedContainer}>
                <Text style={styles.completedText}>🎉 所有玩家已完成！</Text>
                <TouchableOpacity
                  style={styles.viewResultsButton}
                  onPress={viewResults}
                >
                  <Text style={styles.viewResultsButtonText}>查看結果</Text>
                </TouchableOpacity>
              </View>
            )}
        </View>
      </View>
    </View>
  );
};

export default CompetitionGame;
