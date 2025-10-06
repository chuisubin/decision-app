# 🎨 決策小助手 APP ICON 設計指南

## 🎯 圖標設計理念

### 主要元素

- **核心符號**: 🎯 (目標/決策) 或 🎲 (骰子/隨機)
- **配色方案**: 藍色系 (#4299e1) 搭配白色背景
- **設計風格**: 簡潔、現代、易識別

### 推薦設計方案

#### 方案 1: 目標箭頭 🎯

- 圓形背景：漸層藍色 (#4299e1 → #63b3ed)
- 中心圖案：白色目標圈 + 箭頭
- 字體：無（純圖標）

#### 方案 2: 骰子選擇 🎲

- 圓角方形背景：藍色 (#4299e1)
- 中心圖案：白色骰子 + 問號
- 風格：3D 立體感

#### 方案 3: 決策天平 ⚖️

- 圓形背景：藍色漸層
- 中心圖案：簡化的天平圖案
- 寓意：公平決策

## 📏 圖標尺寸要求

### iOS 必需尺寸

- **App Store**: 1024 × 1024 px
- **iPhone**: 180 × 180 px (60pt @3x)
- **iPhone**: 120 × 120 px (60pt @2x)
- **iPad**: 152 × 152 px (76pt @2x)
- **iPad Pro**: 167 × 167 px (83.5pt @2x)

### Android 必需尺寸

- **Play Store**: 512 × 512 px
- **Launcher**: 192 × 192 px
- **Various**: 144, 96, 72, 48 px

## 🛠 圖標製作工具

### 線上工具（免費）

1. **Canva**: https://www.canva.com/

   - 模板豐富，易於使用
   - 支援多尺寸匯出

2. **Figma**: https://www.figma.com/

   - 專業設計工具
   - 免費版功能充足

3. **App Icon Generator**: https://appicon.co/
   - 自動生成所有需要的尺寸

### 專業工具

1. **Adobe Illustrator**: 向量圖形設計
2. **Sketch**: Mac 專用設計工具
3. **Photoshop**: 點陣圖編輯

## 📱 快速實作步驟

### 步驟 1: 設計主圖標

1. 創建 1024×1024 px 的設計
2. 使用建議的配色和元素
3. 確保在小尺寸下仍清晰可見

### 步驟 2: 生成多尺寸

使用 https://appicon.co/ 上傳您的 1024×1024 圖標：

1. 上傳主圖標
2. 選擇 iOS + Android
3. 下載完整尺寸包

### 步驟 3: 替換項目中的圖標

```bash
# 將下載的圖標放入 assets 資料夾
# 主要檔案：
assets/icon.png (1024×1024)
assets/adaptive-icon.png (Android 用)
assets/favicon.png (Web 用)
```

## 🎨 設計範例代碼

我為您創建一個簡單的 SVG 設計範例：

```svg
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4299e1"/>
      <stop offset="100%" style="stop-color:#63b3ed"/>
    </linearGradient>
  </defs>

  <!-- 背景圓形 -->
  <circle cx="512" cy="512" r="512" fill="url(#bg)"/>

  <!-- 目標圓環 -->
  <circle cx="512" cy="512" r="320" fill="none" stroke="white" stroke-width="40"/>
  <circle cx="512" cy="512" r="200" fill="none" stroke="white" stroke-width="30"/>
  <circle cx="512" cy="512" r="100" fill="white"/>

  <!-- 中心箭頭 -->
  <path d="M512 350 L512 450 L570 420 L512 480 L512 580 L450 520 L512 350" fill="#4299e1"/>
</svg>
```

## ✅ 圖標檢查清單

完成圖標設計後，請確認：

- [ ] 在各種尺寸下都清晰可見
- [ ] 背景不透明（iOS 要求）
- [ ] 圓角適中（iOS 會自動添加圓角）
- [ ] 配色與應用主題一致
- [ ] 在淺色和深色背景下都好看
- [ ] 沒有版權問題

## 🚀 下一步：上架準備

圖標準備好後，您就可以：

1. 構建正式版本：`eas build --platform ios --profile production`
2. 上傳到 App Store Connect
3. 填寫應用信息和截圖
4. 提交審核
