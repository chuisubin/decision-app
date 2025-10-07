import { useCallback } from "react";
import { WheelSpinData, WheelResult } from "../types";

// 輪盤計算 Hook
export const useWheelCalculator = () => {
  /**
   * 生成安全的最終角度（避免停在扇形邊界）
   */
  const generateSafeFinalAngle = useCallback((segmentAngle: number): number => {
    // 定義邊界安全區域（每個扇形邊界的10%範圍內視為不安全）
    const boundaryBuffer = segmentAngle * 0.1;

    let finalAngle;
    let attempts = 0;
    const maxAttempts = 50;

    do {
      // 生成隨機角度
      finalAngle = Math.random() * 360;

      // 計算在當前扇形中的位置
      const segmentIndex = Math.floor(finalAngle / segmentAngle);
      const segmentStartAngle = segmentIndex * segmentAngle;
      const positionInSegment = finalAngle - segmentStartAngle;

      // 檢查是否在安全區域內（不接近邊界）
      const isInSafeZone =
        positionInSegment >= boundaryBuffer &&
        positionInSegment <= segmentAngle - boundaryBuffer;

      if (isInSafeZone) {
        break;
      }

      attempts++;
    } while (attempts < maxAttempts);

    // 如果多次嘗試後仍未找到安全角度，強制調整到扇形中心附近
    if (attempts >= maxAttempts) {
      const segmentIndex = Math.floor(Math.random() * (360 / segmentAngle));
      finalAngle = segmentIndex * segmentAngle + segmentAngle * 0.5; // 扇形中心
    }

    return finalAngle;
  }, []);

  /**
   * 計算輪盤旋轉參數
   */
  const calculateSpin = useCallback(
    (options: string[], currentRotation: number = 0): WheelSpinData => {
      if (!options || options.length === 0) {
        throw new Error("選項數組不能為空");
      }

      // 1. 隨機圈數（3-8圈，增加隨機性）
      const randomSpins = 3 + Math.random() * 5;

      // 2. 計算每個扇形的角度
      const segmentAngle = 360 / options.length;

      // 3. 生成安全的最終角度（避免邊界問題）
      const randomFinalAngle = generateSafeFinalAngle(segmentAngle);

      // 4. 計算相對旋轉角度（從當前位置開始）
      const relativeRotation = randomSpins * 360 + randomFinalAngle;

      // 5. 總旋轉角度 = 當前位置 + 相對旋轉
      const totalRotation = currentRotation + relativeRotation;

      return {
        totalRotation,
        relativeRotation,
        currentRotation,
        segmentAngle,
        randomSpins,
        randomFinalAngle,
        isSafeAngle: true,
      };
    },
    [generateSafeFinalAngle]
  );

  /**
   * 根據最終角度計算結果（0度指針位置決定）
   */
  const calculateResult = useCallback(
    (finalRotation: number, options: string[]): WheelResult => {
      const segmentAngle = 360 / options.length;

      // 將旋轉角度標準化到0-360度範圍
      let normalizedAngle = ((finalRotation % 360) + 360) % 360;

      // 指針在頂部0度位置，計算指向哪個選項
      // 指針角度從輪盤角度轉換：pointer angle = 360 - wheel angle
      let pointerAngle = (360 - normalizedAngle + 360) % 360;

      // 計算指針指向的扇形索引
      let selectedIndex = Math.floor(pointerAngle / segmentAngle);

      // 處理邊界情況：當正好在360度時，應該指向第0個選項
      if (selectedIndex >= options.length) {
        selectedIndex = 0;
      }

      // 確保索引在有效範圍內
      selectedIndex = Math.max(0, Math.min(selectedIndex, options.length - 1));

      // 計算指針在當前扇形中的相對位置
      const segmentStartAngle = selectedIndex * segmentAngle;
      const segmentEndAngle = (selectedIndex + 1) * segmentAngle;
      let relativePosition = (pointerAngle - segmentStartAngle) / segmentAngle;

      // 邊界檢查和微調：避免停在邊界處
      const boundaryThreshold = 0.05; // 5%的邊界閾值
      let wasAdjusted = false;
      let adjustmentAmount = 0;

      if (relativePosition < boundaryThreshold) {
        // 太接近左邊界，微調向右（向扇形中心）
        adjustmentAmount =
          (boundaryThreshold - relativePosition + 0.02) * segmentAngle;
        pointerAngle = (pointerAngle + adjustmentAmount) % 360;
        wasAdjusted = true;
      } else if (relativePosition > 1 - boundaryThreshold) {
        // 太接近右邊界，微調向左（向扇形中心）
        adjustmentAmount =
          -(relativePosition - (1 - boundaryThreshold) + 0.02) * segmentAngle;
        pointerAngle = (pointerAngle + adjustmentAmount + 360) % 360;
        wasAdjusted = true;
      }

      // 如果有微調，重新計算所有相關值
      if (wasAdjusted) {
        selectedIndex = Math.floor(pointerAngle / segmentAngle);
        if (selectedIndex >= options.length) {
          selectedIndex = 0;
        }
        selectedIndex = Math.max(
          0,
          Math.min(selectedIndex, options.length - 1)
        );
        relativePosition =
          (pointerAngle - selectedIndex * segmentAngle) / segmentAngle;
        normalizedAngle = (360 - pointerAngle + 360) % 360;
      }

      return {
        selectedIndex,
        result: options[selectedIndex],
        normalizedAngle,
        pointerAngle,
        segmentAngle,
        segmentStartAngle: selectedIndex * segmentAngle,
        segmentEndAngle: (selectedIndex + 1) * segmentAngle,
        relativePosition,
        isNearBoundary: relativePosition < 0.1 || relativePosition > 0.9,
        wasAdjusted,
        adjustmentAmount: Math.round(adjustmentAmount * 100) / 100,
      };
    },
    []
  );

  /**
   * 獲取調試信息
   */
  const getDebugInfo = useCallback(
    (spinData: WheelSpinData, result: WheelResult, options: string[]): any => {
      return {
        旋轉參數: {
          隨機圈數: Math.round(spinData.randomSpins * 100) / 100,
          隨機最終角度: Math.round(spinData.randomFinalAngle * 100) / 100,
          當前起始位置: Math.round(spinData.currentRotation * 100) / 100 + "度",
          相對旋轉角度:
            Math.round(spinData.relativeRotation * 100) / 100 + "度",
          總旋轉角度: Math.round(spinData.totalRotation * 100) / 100 + "度",
          扇形角度: Math.round(spinData.segmentAngle * 100) / 100 + "度",
          使用安全角度: spinData.isSafeAngle ? "✅ 是" : "❌ 否",
        },
        最終結果: {
          輪盤標準化角度: Math.round(result.normalizedAngle * 100) / 100,
          指針角度: Math.round(result.pointerAngle * 100) / 100,
          選中索引: result.selectedIndex,
          選中選項: result.result,
        },
        扇形詳情: {
          扇形起始角度: Math.round(result.segmentStartAngle * 100) / 100,
          扇形結束角度: Math.round(result.segmentEndAngle * 100) / 100,
          在扇形中的相對位置:
            Math.round(result.relativePosition * 100) / 100 + "%",
          是否接近邊界: result.isNearBoundary ? "⚠️ 是" : "✅ 否",
        },
        邊界處理: {
          是否進行微調: result.wasAdjusted ? "🔧 是" : "✅ 否",
          微調角度: result.adjustmentAmount + "度",
          微調原因: result.wasAdjusted ? "避免停在邊界處" : "無需調整",
        },
        選項列表: options,
        選項數量: options.length,
      };
    },
    []
  );

  return {
    calculateSpin,
    calculateResult,
    getDebugInfo,
    generateSafeFinalAngle,
  };
};
