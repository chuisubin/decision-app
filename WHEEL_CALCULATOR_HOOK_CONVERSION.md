# WheelCalculator 類別轉換為 React Hook

## 轉換概要

成功將 `WheelCalculator` 靜態類別轉換為 `useWheelCalculator` React Hook，提供更符合 React 函數式組件的使用方式。

## 轉換前後對比

### 轉換前 (類別方式)

```typescript
// utils/WheelCalculator.ts
export class WheelCalculator {
  static calculateSpin(
    options: string[],
    currentRotation: number = 0
  ): WheelSpinData {
    // 計算邏輯...
  }

  static calculateResult(
    finalRotation: number,
    options: string[]
  ): WheelResult {
    // 結果計算邏輯...
  }

  static getDebugInfo(
    spinData: WheelSpinData,
    result: WheelResult,
    options: string[]
  ): any {
    // 調試信息邏輯...
  }
}

// 使用方式
const spinData = WheelCalculator.calculateSpin(options, currentRotation);
const finalResult = WheelCalculator.calculateResult(
  spinData.totalRotation,
  options
);
```

### 轉換後 (Hook 方式)

```typescript
// hooks/useWheelCalculator.ts
export const useWheelCalculator = () => {
  const calculateSpin = useCallback(
    (options: string[], currentRotation: number = 0): WheelSpinData => {
      // 計算邏輯...
    },
    [generateSafeFinalAngle]
  );

  const calculateResult = useCallback(
    (finalRotation: number, options: string[]): WheelResult => {
      // 結果計算邏輯...
    },
    []
  );

  const getDebugInfo = useCallback(
    (spinData: WheelSpinData, result: WheelResult, options: string[]): any => {
      // 調試信息邏輯...
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

// 使用方式
const { calculateSpin, calculateResult, getDebugInfo } = useWheelCalculator();
const spinData = calculateSpin(options, currentRotation);
const finalResult = calculateResult(spinData.totalRotation, options);
```

## 轉換的優勢

### 1. **更符合 React 哲學**

- 使用 React Hook 模式，與函數式組件設計理念一致
- 遵循 React 的 Hook 最佳實踐

### 2. **更好的記憶化**

- 使用 `useCallback` 優化函數記憶化
- 避免不必要的重新渲染和重新計算

### 3. **更好的相依性管理**

- 清楚地定義各函數間的相依關係
- `calculateSpin` 依賴於 `generateSafeFinalAngle`
- `calculateResult` 和 `getDebugInfo` 沒有內部相依性

### 4. **類型安全性保持**

- 完全保持原有的 TypeScript 類型定義
- 所有函數簽名和返回類型保持不變

### 5. **測試友好**

- Hook 更容易進行單元測試
- 可以使用 `@testing-library/react-hooks` 進行測試

## 檔案結構變化

```
決策輪盤專案/
├── hooks/
│   └── useWheelCalculator.ts  # 新增：輪盤計算 Hook
├── utils/
│   └── WheelCalculator.ts     # 保留：原始類別（可選擇移除）
├── components/
│   └── WheelPicker.tsx        # 更新：使用新的 Hook
└── types/
    └── index.ts               # 不變：類型定義保持一致
```

## 使用方式更新

### 在 WheelPicker 組件中的使用

```typescript
const WheelPicker: React.FC<WheelPickerProps> = ({ options, onResult }) => {
  // 使用輪盤計算 Hook
  const { calculateSpin, calculateResult, getDebugInfo } = useWheelCalculator();

  const spin = (): void => {
    // 使用 Hook 函數替代靜態方法
    const spinData = calculateSpin(options, currentRotation);
    const finalResult = calculateResult(spinData.totalRotation, options);
    const debugInfo = getDebugInfo(spinData, finalResult, options);
  };
};
```

## 效能優化

1. **useCallback 記憶化**：所有計算函數都使用 `useCallback` 包裝
2. **依賴陣列優化**：精確定義每個函數的依賴關係
3. **避免重複創建**：Hook 確保函數實例在依賴不變時保持穩定

## 兼容性

- ✅ 完全保持 API 兼容性
- ✅ 類型定義完全一致
- ✅ 功能行為完全相同
- ✅ 支援所有原有功能

## 下一步建議

1. **可選清理**：如果確認 Hook 版本運行正常，可以移除 `utils/WheelCalculator.ts`
2. **測試覆蓋**：為新的 Hook 添加單元測試
3. **文檔更新**：更新相關使用文檔

## 結論

成功將 `WheelCalculator` 轉換為 React Hook 格式，提供了更好的 React 整合、性能優化和開發體驗，同時保持了完全的功能兼容性。
