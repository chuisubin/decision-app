import React, { useRef, useState } from "react";
import {
  View,
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet,
  Easing,
} from "react-native";
import Svg, { Path, Text as SvgText, G } from "react-native-svg";
import { useWheelCalculator } from "../../hooks/useWheelCalculator";
import { WheelPickerProps } from "../../types";
import { getColorPalette, getNextPaletteIndex } from "../../data/colorPalettes";

const { width: screenWidth } = Dimensions.get("window");
const wheelSize = Math.min(screenWidth * 0.95, 420); // 進一步增大輪盤尺寸
const radius = wheelSize / 2 - 15; // 相應調整半徑

const WheelPicker: React.FC<WheelPickerProps> = ({
  options = [],
  onResult,
}) => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const spinValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(1)).current; // 脈動動畫值
  const flashValue = useRef(new Animated.Value(0)).current; // 閃爍動畫值
  const [currentRotation, setCurrentRotation] = useState<number>(0); // 保持當前輪盤位置
  const [paletteIndex, setPaletteIndex] = useState<number>(0); // 當前配色方案索引

  // 使用 useWheelCalculator Hook
  const { calculateSpin, calculateResult, getDebugInfo } = useWheelCalculator();

  // 脈動動畫和閃爍動畫
  React.useEffect(() => {
    if (!isSpinning) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseValue, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();
      flashValue.setValue(0);
      return () => pulseAnimation.stop();
    } else {
      pulseValue.setValue(1);
      // 開始閃爍動畫
      const flashAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(flashValue, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(flashValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ])
      );
      flashAnimation.start();
      return () => flashAnimation.stop();
    }
  }, [isSpinning, pulseValue, flashValue]);

  // 獲取當前配色方案（根據選項數量智能選擇）
  const currentPalette = getColorPalette(paletteIndex, options.length);
  const colors = currentPalette.colors;

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
  const createPath = (startAngle: number, endAngle: number): string => {
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

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ): { x: number; y: number } => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  // 計算文字位置和旋轉角度
  const getTextPosition = (index: number): { x: number; y: number } => {
    const angle = ((index * segmentAngle + segmentAngle / 2) * Math.PI) / 180;
    const textRadius = radius * 0.7;
    return {
      x: Math.cos(angle - Math.PI / 2) * textRadius,
      y: Math.sin(angle - Math.PI / 2) * textRadius,
    };
  };

  // 計算文字旋轉角度（讓文字朝向中心）
  const getTextRotation = (index: number): number => {
    const angle = index * segmentAngle + segmentAngle / 2;
    // 讓文字朝向中心
    return angle;
  };

  // 切換配色方案
  const switchColorPalette = () => {
    if (isSpinning) return; // 旋轉中不允許切換
    const nextIndex = getNextPaletteIndex(paletteIndex, options.length);
    setPaletteIndex(nextIndex);
  };

  // 旋轉動畫
  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    try {
      // 使用 useWheelCalculator 計算隨機旋轉參數（從當前位置開始）
      const spinData = calculateSpin(options, currentRotation);

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
        duration: 12000, // 延長到 12 秒
        easing: Easing.bezier(0.15, 0.7, 0.4, 0.95), // 更平滑的減速曲線
        useNativeDriver: true,
      }).start(() => {
        // 根據最終停止位置計算結果（0度指針位置決定）
        const finalResult = calculateResult(spinData.totalRotation, options);

        // 獲取調試信息
        const debugInfo = getDebugInfo(spinData, finalResult, options);
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
      {/* 指針 - 可點擊切換配色 */}
      <TouchableOpacity
        style={styles.pointer}
        onPress={switchColorPalette}
        disabled={isSpinning}
        activeOpacity={0.8}
      >
        <Text style={styles.pointerText}>▼</Text>
      </TouchableOpacity>

      {/* 配色切換提示 */}
      <View style={styles.colorHint}>
        <Text style={styles.colorHintText}>點擊指針換色</Text>
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
            viewBox={`${-radius - 10} ${-radius - 10} ${(radius + 10) * 2} ${
              (radius + 10) * 2
            }`}
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
                    strokeWidth={0}
                  />
                  <SvgText
                    x={textPos.x}
                    y={textPos.y}
                    fill="#ffffff"
                    fontSize={options.length > 8 ? "16" : "18"} // 進一步增大文字尺寸
                    fontWeight="bold"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    transform={`rotate(${getTextRotation(index)} ${textPos.x} ${
                      textPos.y
                    })`}
                  >
                    {option.length > 8 ? option.substring(0, 8) + ".." : option}
                  </SvgText>
                </G>
              );
            })}
          </Svg>
        </Animated.View>

        {/* 中心按鈕 */}
        <Animated.View
          style={{
            transform: [{ scale: isSpinning ? 1 : pulseValue }],
            position: "absolute",
            top: wheelSize / 2 - 50, // 回到圓形中心位置
            left: wheelSize / 2 - 50, // 回到圓形中心位置
          }}
        >
          <TouchableOpacity
            style={[
              styles.centerCircle,
              isSpinning && styles.centerCircleSpinning,
            ]}
            onPress={spin}
            disabled={isSpinning}
            activeOpacity={0.8}
          >
            <Animated.View
              style={[
                styles.centerCircleInner,
                isSpinning && {
                  backgroundColor: flashValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["#f06292", "#ec407a"], // 閃爍在粉紅色系之間
                  }),
                },
              ]}
            >
              <Text style={styles.centerButtonText}>
                {isSpinning ? "旋轉中" : "開始"}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* 重置按鈕 */}
      {/* {currentRotation > 0 && !isSpinning && (
        <View style={styles.resetButtonContainer}>
          <TouchableOpacity style={styles.resetButton} onPress={resetWheel}>
            <Text style={styles.resetButtonText}>🔄 重置位置</Text>
          </TouchableOpacity>
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: "#e91e63", // 改為鮮艷的粉紅色
    borderRadius: 22, // 進一步增大指針圓角
    padding: 10, // 增大指針內邊距
    shadowColor: "#e91e63", // 陰影色也改為粉紅色
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  pointerText: {
    color: "#ffffff",
    fontSize: 28, // 進一步增大指針文字
    fontWeight: "bold",
  },
  wheel: {
    width: wheelSize,
    height: wheelSize,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  centerCircle: {
    width: 100, // 圓形按鈕
    height: 100, // 圓形按鈕
    borderRadius: 50, // 完全圓形
    backgroundColor: "#e91e63", // 深灰色，與任何顏色都搭配
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#ffffff", // 白色邊框
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
    overflow: "hidden",
  },
  centerCircleSpinning: {
    backgroundColor: "#f06292", // 旋轉時更亮的粉紅色
    borderColor: "#ffffff", // 旋轉時白色邊框
    borderWidth: 4,
  },
  centerCircleInner: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  centerText: {
    fontSize: 26, // 進一步增大表情符號大小
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  centerButtonText: {
    color: "#ffffff",
    fontSize: 16, // 增大按鈕文字
    fontWeight: "bold", // 使用粗體
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    letterSpacing: 1, // 增加字母間距
  },
  resetButtonContainer: {
    alignItems: "center",
    marginTop: 20,
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
  colorHint: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    zIndex: 9,
  },
  colorHintText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default WheelPicker;
