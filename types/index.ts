// 預設選項類型
export interface PresetOptions {
  [key: string]: string[];
}

// 主題輸入組件 Props
export interface TopicInputProps {
  topic: string;
  onTopicChange: (text: string) => void;
  onCategoryMatch: (category: string | null) => void;
}

// 收納組件 Props
export interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  isInitiallyCollapsed?: boolean;
  titleStyle?: any;
  containerStyle?: any;
  contentStyle?: any;
  icon?: string;
  rightElement?: React.ReactNode;
}

// 輪盤組件 Props
export interface WheelPickerProps {
  options: string[];
  onResult: (result: string) => void;
}

// 輪盤計算結果類型
export interface WheelSpinData {
  totalRotation: number;
  relativeRotation: number;
  currentRotation: number;
  segmentAngle: number;
  randomSpins: number;
  randomFinalAngle: number;
  isSafeAngle: boolean;
}

export interface WheelResult {
  selectedIndex: number;
  result: string;
  normalizedAngle: number;
  pointerAngle: number;
  segmentAngle: number;
  segmentStartAngle: number;
  segmentEndAngle: number;
  relativePosition: number;
  isNearBoundary: boolean;
  wasAdjusted: boolean;
  adjustmentAmount: number;
}
