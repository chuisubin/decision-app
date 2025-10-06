import React, { useRef, useState } from "react";
import {
  View,
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import Svg, { Path, Text as SvgText, G } from "react-native-svg";
import { WheelCalculator } from "../utils/WheelCalculator";

const { width: screenWidth } = Dimensions.get("window");
const wheelSize = Math.min(screenWidth * 0.85, 320);
const radius = wheelSize / 2 - 10;

const WheelPicker = ({ options = [], onResult }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;
  const [currentRotation, setCurrentRotation] = useState(0); // 保持當前輪盤位置

  // 紫色調色板
  const colors = [
    "#9e35e5",
    "#7c3aed",
    "#8b5cf6",
    "#a855f7",
    "#c084fc",
    "#d8b4fe",
    "#6366f1",
    "#8b5cf6",
    "#9333ea",
    "#a78bfa",
    "#c4b5fd",
    "#e9d5ff",
  ];

  if (options.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>請先輸入選項</Text>
      </View>
    );
  }

  // 計算每個扇形的角度
  const segmentAngle = 360 / options.length;

  // 生成 SVG 扇形路徑
  const createPath = (startAngle, endAngle) => {
    const start = polarToCartesian(0, 0, radius, endAngle);
    const end = polarToCartesian(0, 0, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M",
      0,
      0,
      "L",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      "Z",
    ].join(" ");
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  // 計算文字位置和旋轉角度
  const getTextPosition = (index) => {
    const angle = ((index * segmentAngle + segmentAngle / 2) * Math.PI) / 180;
    const textRadius = radius * 0.7;
    return {
      x: Math.cos(angle - Math.PI / 2) * textRadius,
      y: Math.sin(angle - Math.PI / 2) * textRadius,
    };
  };

  // 計算文字旋轉角度（讓文字朝向中心）
  const getTextRotation = (index) => {
    const angle = index * segmentAngle + segmentAngle / 2;
    // 讓文字朝向中心
    return angle;
  };

  // 重置輪盤位置
  const resetWheel = () => {
    if (isSpinning) return;

    Animated.timing(spinValue, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setCurrentRotation(0);
    });
  };

  // 旋轉動畫
  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    try {
      // 使用 WheelCalculator 計算隨機旋轉參數（從當前位置開始）
      const spinData = WheelCalculator.calculateSpin(options, currentRotation);

      console.log("開始旋轉:", {
        當前位置: currentRotation,
        相對旋轉: spinData.relativeRotation,
        總旋轉角度: spinData.totalRotation,
        隨機圈數: spinData.randomSpins,
        最終角度: spinData.randomFinalAngle,
      });

      // 設置動畫起始值為當前位置
      spinValue.setValue(currentRotation);

      Animated.timing(spinValue, {
        toValue: spinData.totalRotation,
        duration: 3000,
        useNativeDriver: true,
      }).start(() => {
        // 根據最終停止位置計算結果（0度指針位置決定）
        const finalResult = WheelCalculator.calculateResult(
          spinData.totalRotation,
          options
        );

        // 獲取調試信息
        const debugInfo = WheelCalculator.getDebugInfo(
          spinData,
          finalResult,
          options
        );
        console.log("輪盤結果:", debugInfo);

        setTimeout(() => {
          setIsSpinning(false);
          // 更新當前輪盤位置，作為下次旋轉的起始位置
          setCurrentRotation(spinData.totalRotation);
          // 根據0度指針位置的真實結果
          onResult && onResult(finalResult.result);
        }, 500);
      });
    } catch (error) {
      console.error("輪盤計算錯誤:", error);
      setIsSpinning(false);
    }
  };

  const rotateInterpolate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "1deg"],
  });

  return (
    <View style={styles.container}>
      {/* 指針 */}
      <View style={styles.pointer}>
        <Text style={styles.pointerText}>▼</Text>
      </View>

      {/* 輪盤 */}
      <View style={styles.wheelContainer}>
        <Animated.View
          style={[
            styles.wheel,
            {
              transform: [{ rotate: rotateInterpolate }],
            },
          ]}
        >
          <Svg
            width={wheelSize}
            height={wheelSize}
            viewBox={`${-radius - 10} ${
              -radius - 10
            } ${wheelSize} ${wheelSize}`}
          >
            {options.map((option, index) => {
              const startAngle = index * segmentAngle;
              const endAngle = (index + 1) * segmentAngle;
              const textPos = getTextPosition(index);
              const color = colors[index % colors.length];

              return (
                <G key={index}>
                  <Path
                    d={createPath(startAngle, endAngle)}
                    fill={color}
                    stroke="#ffffff"
                    strokeWidth="3"
                  />
                  <SvgText
                    x={textPos.x}
                    y={textPos.y}
                    fill="#ffffff"
                    fontSize={options.length > 8 ? "12" : "14"}
                    fontWeight="bold"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    transform={`rotate(${getTextRotation(index)} ${textPos.x} ${
                      textPos.y
                    })`}
                  >
                    {option.length > 6 ? option.substring(0, 6) + ".." : option}
                  </SvgText>
                </G>
              );
            })}
          </Svg>
        </Animated.View>

        {/* 中心圓 */}
        <View style={styles.centerCircle}>
          <Text style={styles.centerText}>🎯</Text>
        </View>
      </View>

      {/* 按鈕區域 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.spinButton, isSpinning && styles.spinButtonDisabled]}
          onPress={spin}
          disabled={isSpinning}
        >
          <Text style={styles.spinButtonText}>
            {isSpinning ? "🎡 旋轉中..." : "🎲 旋轉輪盤"}
          </Text>
        </TouchableOpacity>

        {currentRotation > 0 && !isSpinning && (
          <TouchableOpacity style={styles.resetButton} onPress={resetWheel}>
            <Text style={styles.resetButtonText}>🔄 重置位置</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = {
  container: {
    alignItems: "center",
    paddingVertical: 20,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    color: "#9e35e5",
    fontSize: 16,
    fontStyle: "italic",
  },
  wheelContainer: {
    width: wheelSize,
    height: wheelSize,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  pointer: {
    position: "absolute",
    top: 5,
    zIndex: 10,
    backgroundColor: "#9e35e5",
    borderRadius: 15,
    padding: 8,
    shadowColor: "#9e35e5",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  pointerText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  wheel: {
    width: wheelSize,
    height: wheelSize,
    alignItems: "center",
    justifyContent: "center",
  },
  centerCircle: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#9e35e5",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#ffffff",
    shadowColor: "#9e35e5",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  centerText: {
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    gap: 10,
  },
  spinButton: {
    backgroundColor: "#9e35e5",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#9e35e5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  spinButtonDisabled: {
    backgroundColor: "#c4b5fd",
    opacity: 0.6,
  },
  spinButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  resetButton: {
    backgroundColor: "#6b7280",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: "#6b7280",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  resetButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
};

export default WheelPicker;
