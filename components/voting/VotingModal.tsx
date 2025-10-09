import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Animated,
} from "react-native";
import { styles } from "./VotingModalStyles";

interface VotingModalProps {
  visible: boolean;
  topic: string;
  options: string[];
  voterCount: number;
  votesPerPerson: number;
  onClose: () => void;
}

interface VoteResults {
  [option: string]: number;
}

const VotingModal: React.FC<VotingModalProps> = ({
  visible,
  topic,
  options,
  voterCount,
  votesPerPerson,
  onClose,
}) => {
  const [currentVoter, setCurrentVoter] = useState<number>(1);
  const [votes, setVotes] = useState<VoteResults>({});
  const [votingStage, setVotingStage] = useState<"voting" | "results">(
    "voting"
  );
  const [fadeAnim] = useState(new Animated.Value(0));
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [currentVoterVotes, setCurrentVoterVotes] = useState<number>(0);

  // 重置狀態
  useEffect(() => {
    if (visible) {
      setCurrentVoter(1);
      setVotingStage("voting");
      setSelectedOptions([]);
      setCurrentVoterVotes(0);

      // 初始化投票結果
      const initialVotes: VoteResults = {};
      options.forEach((option) => {
        initialVotes[option] = 0;
      });
      setVotes(initialVotes);

      // 淡入動畫
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [visible, options]);

  const handleOptionSelect = (option: string) => {
    // 檢查是否已經選中該選項
    const isSelected = selectedOptions.includes(option);

    if (isSelected) {
      // 取消選擇
      setSelectedOptions((prev) => prev.filter((opt) => opt !== option));
      setCurrentVoterVotes((prev) => prev - 1);
    } else {
      // 檢查是否還能選擇更多選項
      if (currentVoterVotes < votesPerPerson) {
        setSelectedOptions((prev) => [...prev, option]);
        setCurrentVoterVotes((prev) => prev + 1);
      }
    }
  };

  const handleConfirmVote = () => {
    if (selectedOptions.length === 0) return;

    // 更新投票結果
    setVotes((prev) => {
      const newVotes = { ...prev };
      selectedOptions.forEach((option) => {
        newVotes[option] = (newVotes[option] || 0) + 1;
      });
      return newVotes;
    });

    // 清除當前投票者的選擇
    setSelectedOptions([]);
    setCurrentVoterVotes(0);

    if (currentVoter < voterCount) {
      // 還有下一位投票者
      setCurrentVoter((prev) => prev + 1);
    } else {
      // 投票完成，顯示結果
      setTimeout(() => {
        setVotingStage("results");
      }, 500);
    }
  };

  const handleCancelSelection = () => {
    setSelectedOptions([]);
    setCurrentVoterVotes(0);
  };

  const getWinningOptions = (): string[] => {
    const voteValues = Object.values(votes);
    if (voteValues.length === 0) return [];
    const maxVotes = Math.max(...voteValues);
    if (maxVotes === 0) return [];
    return Object.keys(votes).filter((option) => votes[option] === maxVotes);
  };

  const getVotePercentage = (option: string): number => {
    const totalVotes = Object.values(votes).reduce(
      (sum, count) => sum + count,
      0
    );
    return totalVotes > 0 ? Math.round((votes[option] / totalVotes) * 100) : 0;
  };

  const handleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const renderVotingStage = () => (
    <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
      {/* Close Button */}
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 15,
          top: 15,
          zIndex: 1000,
          padding: 8,
          borderRadius: 20,
          backgroundColor: "#f3f4f6",
        }}
        onPress={handleClose}
      >
        <Text style={{ fontSize: 18, color: "#6b7280" }}>✕</Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>🗳️ 投票進行中</Text>
        <Text style={styles.topicText}>{topic}</Text>
        <Text style={styles.totalVotesText}>
          共 {options.length} 個選項可選 • 每人可投 {votesPerPerson} 票
        </Text>
        <View style={styles.voterProgress}>
          <Text style={styles.voterProgressText}>
            第 {currentVoter} 位投票者 ({currentVoter}/{voterCount})
          </Text>
          <Text style={styles.voteCountText}>
            已選 {currentVoterVotes}/{votesPerPerson} 票
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((currentVoter - 1) / voterCount) * 100}%` },
              ]}
            />
          </View>
        </View>
      </View>

      {/* Voting Options */}
      <ScrollView
        style={styles.optionsContainer}
        showsVerticalScrollIndicator={false}
      >
        {options.map((option, index) => {
          const isSelected = selectedOptions.includes(option);
          const canSelectMore = currentVoterVotes < votesPerPerson;
          const isDisabled = !isSelected && !canSelectMore;

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.voteOption,
                isSelected && {
                  backgroundColor: "#f0fdf4",
                  borderColor: "#10b981",
                },
                isDisabled && {
                  backgroundColor: "#f5f5f5",
                  borderColor: "#d1d5db",
                  opacity: 0.6,
                },
              ]}
              onPress={() => handleOptionSelect(option)}
              activeOpacity={0.7}
              disabled={isDisabled}
            >
              <Text
                style={[
                  styles.voteOptionText,
                  isSelected && {
                    color: "#059669",
                    fontWeight: "600",
                  },
                  isDisabled && {
                    color: "#9ca3af",
                  },
                ]}
              >
                {option}
              </Text>
              <Text
                style={[
                  styles.voteOptionArrow,
                  isSelected && { color: "#059669" },
                  isDisabled && { color: "#9ca3af" },
                ]}
              >
                {isSelected ? "✓" : "→"}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Action Buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={[
            styles.closeButton,
            {
              flex: 0.48,
              backgroundColor:
                selectedOptions.length > 0 ? "#3b82f6" : "#9ca3af",
              borderWidth: 1,
              borderColor: selectedOptions.length > 0 ? "#2563eb" : "#6b7280",
            },
          ]}
          onPress={handleConfirmVote}
          disabled={selectedOptions.length === 0}
        >
          <Text
            style={[
              styles.closeButtonText,
              {
                color: "#ffffff",
                fontWeight: "600",
              },
            ]}
          >
            確認
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.closeButton,
            {
              flex: 0.48,
              backgroundColor: "#f3f4f6",
              borderWidth: 1,
              borderColor: "#d1d5db",
            },
          ]}
          onPress={handleCancelSelection}
        >
          <Text
            style={[
              styles.closeButtonText,
              {
                color: "#374151",
                fontWeight: "500",
              },
            ]}
          >
            取消選擇
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderResultsStage = () => {
    const winningOptions = getWinningOptions();
    const totalVotes = Object.values(votes).reduce(
      (sum, count) => sum + count,
      0
    );

    // 調試信息
    console.log("votes:", votes);
    console.log("totalVotes:", totalVotes);
    console.log("options:", options);

    // 只顯示有票數的選項
    const votedOptions = options
      .filter((option) => votes[option] > 0)
      .sort((a, b) => votes[b] - votes[a]);

    console.log("votedOptions:", votedOptions);

    return (
      <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
        {/* Close Button */}
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 15,
            top: 15,
            zIndex: 1000,
            padding: 8,
            borderRadius: 20,
            backgroundColor: "#f3f4f6",
          }}
          onPress={handleClose}
        >
          <Text style={{ fontSize: 18, color: "#6b7280" }}>✕</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>🏆 投票結果</Text>
          <Text style={styles.topicText}>{topic}</Text>
          <Text style={styles.totalVotesText}>總票數: {totalVotes} 票</Text>
        </View>

        {/* Integrated Results */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <ScrollView
            style={{ height: 300 }}
            showsVerticalScrollIndicator={false}
          >
            {votedOptions.length > 0 ? (
              votedOptions.map((option, index) => {
                const isWinner = winningOptions.includes(option);
                const voteCount = votes[option];
                const percentage = getVotePercentage(option);

                return (
                  <View
                    key={index}
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: 12,
                      padding: 15,
                      marginBottom: 10,
                      borderWidth: 1,
                      borderColor: isWinner ? "#10b981" : "#e5e7eb",
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 2,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          flex: 1,
                        }}
                      >
                        <Text style={{ fontSize: 20, marginRight: 10 }}>
                          {isWinner
                            ? index === 0 && winningOptions.length === 1
                              ? "🥇"
                              : "🤝"
                            : `#${index + 1}`}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            flex: 1,
                            fontWeight: isWinner ? "700" : "500",
                            color: isWinner ? "#059669" : "#374151",
                          }}
                        >
                          {option}
                          {isWinner && winningOptions.length > 1 && " (平手)"}
                        </Text>
                      </View>
                      <View style={{ alignItems: "flex-end" }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: isWinner ? "700" : "600",
                            color: isWinner ? "#059669" : "#374151",
                          }}
                        >
                          {voteCount} 票
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: isWinner ? "600" : "400",
                            color: isWinner ? "#059669" : "#6b7280",
                          }}
                        >
                          ({percentage}%)
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        height: 4,
                        backgroundColor: "#f3f4f6",
                        borderRadius: 2,
                        marginTop: 10,
                        overflow: "hidden",
                      }}
                    >
                      <View
                        style={{
                          height: "100%",
                          width: `${percentage}%`,
                          backgroundColor: isWinner ? "#10b981" : "#3b82f6",
                          borderRadius: 2,
                        }}
                      />
                    </View>
                  </View>
                );
              })
            ) : (
              <View style={{ alignItems: "center", padding: 20 }}>
                <Text style={{ fontSize: 16, color: "#6b7280" }}>
                  沒有任何投票記錄
                </Text>
              </View>
            )}
          </ScrollView>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.revoteButton}
            onPress={() => {
              setCurrentVoter(1);
              setVotingStage("voting");
              const initialVotes: VoteResults = {};
              options.forEach((option) => {
                initialVotes[option] = 0;
              });
              setVotes(initialVotes);
            }}
          >
            <Text style={styles.revoteButtonText}>🔄 重新投票</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.finishButton} onPress={handleClose}>
            <Text style={styles.finishButtonText}>✅ 完成</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        {votingStage === "voting" ? renderVotingStage() : renderResultsStage()}
      </View>
    </Modal>
  );
};

export default VotingModal;
