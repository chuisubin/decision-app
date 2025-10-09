// 預設選項分類配置
interface PresetCategory {
  displayName: string;
  options: string[];
}

export interface PresetOptionsConfig {
  [key: string]: PresetCategory;
}

// 符合香港人的習慣,白話化一些選項名稱
// 例如: 放題,打冷,打遊戲,行街,睇影
export const presetOptions: PresetOptionsConfig = {
  breakfast: {
    displayName: "早餐",
    options: [
      "飲粥",
      "食麵包",
      "叫蛋撻",
      "常餐",
      "三文治",
      "叫腸粉",
      "食粉麵",
      "麥皮",
      "點心",
      "烚蛋",
    ],
  },
  lunch: {
    displayName: "午餐",
    options: [
      "泰菜",
      "車仔麵",
      "食粉麵",
      "去茶記",
      "漢堡包",
      "炸雞",
      "越南菜",
      "韓燒",
      "西餐",
      "日本嘢",
    ],
  },
  dinner: {
    displayName: "晚餐",
    options: [
      "打邊爐",
      "燒烤",
      "放題",
      "雞煲",
      "打冷",
      "日本菜",
      "韓國菜",
      "泰菜",
      "西餐",
      "自助餐",
    ],
  },
  beverage: {
    displayName: "飲料",
    options: [
      "咖啡",
      "奶茶",
      "果汁",
      "汽水",
      "白開水",
      "檸茶",
      "檸水",
      "朱古力",
      "酒",
      "珍奶",
    ],
  },
  entertainment: {
    displayName: "娛樂",
    options: [
      "睇戲",
      "行街",
      "唱K",
      "打機",
      "做運動",
      "睇書",
      "聽歌",
      "畫畫",
      "行下",
      "傾偈",
    ],
  },
  transport: {
    displayName: "交通",
    options: [
      "行路",
      "踩單車",
      "揸車",
      "搭巴士",
      "搭鐵",
      "飛的",
      "搭火車",
      "騎電單車",
      "Uber",
      "跑步",
    ],
  },
  clothing: {
    displayName: "穿搭風格",
    options: [
      "韓系",
      "日系",
      "歐美",
      "復古",
      "街頭",
      "文青",
      "甜美",
      "簡約",
      "運動",
      "正式商務",
    ],
  },
  travel: {
    displayName: "旅遊地方",
    options: [
      "台灣",
      "日本",
      "韓國",
      "泰國",
      "新加坡",
      "馬來西亞",
      "澳洲",
      "英國",
      "歐洲",
      "美國",
    ],
  },
  sports: {
    displayName: "運動",
    options: [
      "跑步",
      "游水",
      "踩單車",
      "行山",
      "健身",
      "瑜伽",
      "打波",
      "踢波",
      "打羽毛球",
      "打網球",
    ],
  },
  gift: {
    displayName: "送禮",
    options: [
      "花束",
      "朱古力",
      "手錶",
      "香水",
      "首飾",
      "書籍",
      "電子產品",
      "護膚品",
      "衣服",
      "美食券",
    ],
  },
  weekend: {
    displayName: "週末活動",
    options: [
      "休息",
      "約朋友",
      "去商場",
      "睇戲",
      "做運動",
      "去公園",
      "整理屋企",
      "煮飯",
      "學新嘢",
      "做興趣",
    ],
  },
  study: {
    displayName: "學習",
    options: [
      "學語言",
      "學程式",
      "學音樂",
      "學畫畫",
      "學煮飯",
      "學攝影",
      "學投資",
      "學手工藝",
      "讀書",
      "上網課",
    ],
  },
  date: {
    displayName: "約會",
    options: [
      "睇戲",
      "食飯",
      "行街",
      "去咖啡店",
      "去公園",
      "做運動",
      "去博物館",
      "去海邊",
      "唱K",
      "玩遊戲",
    ],
  },
  mood: {
    displayName: "心情調節",
    options: [
      "聽歌",
      "睇劇",
      "運動",
      "食嘢",
      "瞓覺",
      "傾偈",
      "寫嘢",
      "畫畫",
      "散步",
      "冥想",
    ],
  },
};

// 輔助函數：獲取所有分類的顯示名稱
export const getCategoryDisplayNames = (): string[] => {
  return Object.values(presetOptions).map((category) => category.displayName);
};

// 輔助函數：根據中文名稱找到對應的 key
export const getCategoryKeyByDisplayName = (
  displayName: string
): string | null => {
  const entry = Object.entries(presetOptions).find(
    ([key, category]) => category.displayName === displayName
  );
  return entry ? entry[0] : null;
};

// 輔助函數：根據 key 獲取選項
export const getOptionsByKey = (key: string): string[] => {
  return presetOptions[key]?.options || [];
};
