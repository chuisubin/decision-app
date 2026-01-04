// 輪盤顏色配色方案
export interface ColorPalette {
  name: string;
  description: string;
  colors: string[];
}

export const colorPalettes: ColorPalette[] = [

  {
    name: "彩虹炫彩",
    description: "鮮艷多彩彩虹系",
    colors: [
      "#ff1744", // 鮮紅色
      "#ff6d00", // 橙色
      "#ffea00", // 鮮黃色
      "#76ff03", // 酸橙綠
      "#00e676", // 翠綠色
      "#1de9b6", // 青綠色
      "#00e5ff", // 青色
      "#2979ff", // 藍色
      "#3d5afe", // 靛藍色
      "#d500f9", // 紫色
      "#e91e63", // 粉紅色
      "#ff5722", // 深橙色
      "#4caf50", // 綠色
      "#2196f3", // 天藍色
      "#9c27b0", // 紫羅蘭
      "#ff9800", // 琥珀色
    ],
  },
    {
    name: "紫色夢幻",
    description: "優雅紫色系漸變",
    colors: [
      "#9c27b0", // 深紫色
      "#8e24aa", // 紫羅蘭
      "#7b1fa2", // 皇家紫
      "#673ab7", // 深紫羅蘭
      "#5e35b1", // 靛紫色
      "#512da8", // 深靛紫
      "#4527a0", // 極深紫
      "#311b92", // 午夜紫
      "#6a1b9a", // 梅紫色
      "#ad85c6", // 淡紫色
      "#ba68c8", // 中紫色
      "#ce93d8", // 淺紫粉
      "#e1bee7", // 薰衣草紫
      "#f3e5f5", // 極淺紫
      "#9575cd", // 紫丁香
      "#7986cb", // 藍紫色
    ],
  },
  {
    name: "夕陽暖色",
    description: "溫暖夕陽橙紅系",
    colors: [
      "#bf360c", // 深紅橙
      "#d84315", // 紅橙色
      "#e64100", // 橙紅色
      "#f57c00", // 深橙色
      "#ff8f00", // 琥珀橙
      "#ff9800", // 標準橙
      "#ffb74d", // 淺橙色
      "#ffcc02", // 金黃色
      "#ffd54f", // 淺黃色
      "#fff176", // 明黃色
      "#c62828", // 深紅色
      "#d32f2f", // 紅色
      "#f44336", // 標準紅
      "#e57373", // 淺紅色
      "#ffab91", // 桃色
      "#ffccbc", // 極淺桃
    ],
  },
  {
    name: "森林綠意",
    description: "自然森林綠色系",
    colors: [
      "#1b5e20", // 深森林綠
      "#2e7d32", // 森林綠
      "#388e3c", // 深綠色
      "#43a047", // 標準綠
      "#4caf50", // 翠綠色
      "#66bb6a", // 淺綠色
      "#81c784", // 明綠色
      "#a5d6a7", // 極淺綠
      "#004d40", // 深青綠
      "#00695c", // 青綠色
      "#00796b", // 藍綠色
      "#00897b", // 淺藍綠
      "#26a69a", // 明藍綠
      "#4db6ac", // 薄荷綠
      "#80cbc4", // 淺薄荷
      "#b2dfdb", // 極淺薄荷
    ],
  },
  {
    name: "粉色系",
    description: "粉色系",
    colors: [
      "#f48fb1", // 淺粉色
      "#f06292", // 粉紅色
      "#ec407a", // 玫瑰紅
      "#e91e63", // 標準粉紅
      "#d81b60", // 深粉紅
      "#c2185b", // 酒紅色
      "#ad1457", // 葡萄紅
      "#880e4f", // 極深粉紅
      "#f8bbd0", // 極淺粉
      "#fce4ec", // 超淺粉
      "#ff80ab", // 珊瑚粉
      "#ff4081", // 珊瑚紅
      "#f50057", // 桃紅色
      "#c51162", // 深桃紅
    ],
  },
  {
    name: "賽博霓虹",
    description: "未來科技霓虹色",
    colors: [
      "#00ffff", // 霓虹青
      "#00e5ff", // 亮青色
      "#2979ff", // 霓虹藍
      "#3d5afe", // 亮藍色
      "#d500f9", // 霓虹紫
      "#e040fb", // 亮紫色
      "#ff1744", // 霓虹紅
      "#ff5252", // 亮紅色
      "#ff6d00", // 霓虹橙
      "#ff9100", // 亮橙色
      "#ffea00", // 霓虹黃
      "#ffff00", // 亮黃色
      "#76ff03", // 霓虹綠
    ],
  },
  {
    name: "復古經典",
    description: "復古懷舊經典色",
    colors: [
      "#8d6e63", // 復古棕
      "#a1887f", // 淺棕色
      "#6d4c41", // 咖啡色
      "#795548", // 標準棕
      "#8bc34a", // 復古綠
      "#689f38", // 橄欖綠
      "#827717", // 深橄欖
      "#9e9d24", // 復古黃綠
      "#afb42b", // 檸檬草色
      "#cddc39", // 復古黃
      "#607d8b", // 復古藍灰
      "#78909c", // 淺藍灰
    ],
  },
  {
    name: "紅黑",
    description: "經典紅黑配色",
    colors: [
      "#ff0000", // 紅色
      "#000000", // 黑色
    ],
  },
  {
    name: "紅藍",
    description: "經典紅藍配色",
    colors: [
      "#ff0000", // 紅色
      "#0000ff", // 藍色
    ],
  },
  {
    name: "藍橙",
    description: "深藍宇宙橙配色",
    colors: [
      "#0d47a1", // 深藍色
      "#ff6f00", // 橙色
    ],
  },
  {
    name: "綠紫",
    description: "森林綠與紫羅蘭配色",
    colors: [
      "#1b5e20", // 深森林綠
      "#7b1fa2", // 皇家紫
    ],
  },
  {
    name: "三原色",
    description: "紅藍綠三原色配色",
    colors: [
      "#ff0000", // 紅色
      "#0000ff", // 藍色
      "#00ff00", // 綠色
    ],
  },
  {
    name: "彩虹五色",
    description: "紅橙黃綠藍五色配色",
    colors: [
      "#ff0000", // 紅色
      "#ff8000", // 橙色
      "#ffff00", // 黃色
      "#00ff00", // 綠色
      "#0000ff", // 藍色
    ],
  },
];

// 根據選項數量過濾適用的配色方案
export const getAvailablePalettes = (optionCount: number): ColorPalette[] => {
  return colorPalettes.filter((palette) => {
    // 如果是僅適用於偶數的配色方案，且選項數為奇數，則排除
    if (palette.colors.length % 2 === 0 && optionCount % 2 !== 0) {
      return false;
    }
    // 如果是僅適用於奇數的配色方案，且選項數為偶數，則排除
    if (palette.colors.length % 2 !== 0 && optionCount % 2 === 0) {
      return false;
    }
    return true;
  });
};

// 獲取指定配色方案（智能選擇）
export const getColorPalette = (
  index: number,
  optionCount?: number
): ColorPalette => {
  if (optionCount !== undefined) {
    const availablePalettes = getAvailablePalettes(optionCount);
    return availablePalettes[index % availablePalettes.length];
  }
  return colorPalettes[index % colorPalettes.length];
};

// 獲取下一個配色方案的索引（智能選擇）
export const getNextPaletteIndex = (
  currentIndex: number,
  optionCount?: number
): number => {
  if (optionCount !== undefined) {
    const availablePalettes = getAvailablePalettes(optionCount);
    return (currentIndex + 1) % availablePalettes.length;
  }
  return (currentIndex + 1) % colorPalettes.length;
};

// 獲取配色方案總數
export const getPaletteCount = (): number => {
  return colorPalettes.length;
};
