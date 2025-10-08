# 🎯 決策小助手 - Decision App

一個簡單易用的 React Native Expo 應用，幫助用戶在日常生活中做出決定。

## 📱 功能特色

- **不同的決策方案** : 有多種方法協助用戶進行決策,轉輪盤,投票,擲硬幣
- **智能主題識別**：自動識別常見主題（午餐、晚餐、飲料、娛樂等）並提供相應選項
- **自定義選項**：用戶可以輸入自己的選項列表
- **美觀界面**：現代化設計，使用體驗流暢
- **動畫效果**：結果顯示帶有淡入動畫

## 🚀 快速開始

### 安裝依賴

```bash
npm install
```

### 啟動開發服務器

```bash
npm start
```

### 在手機上運行

1. 在手機上安裝 **Expo Go** 應用
2. 掃描終端中顯示的 QR 碼
3. 應用將在 Expo Go 中啟動

### 在模擬器中運行

```bash
# Android 模擬器
npm run android

# iOS 模擬器 (需要 macOS)
npm run ios

# Web 瀏覽器
npm run web
```

## 🎮 使用方法

1. **輸入主題**：在「你正在糾結什麼？」欄位中輸入你的困擾

   - 例如：「午餐吃什麼」、「今天穿什麼」

2. **自定義選項**（可選）：

   - 如果有特定選項，可以在第二個欄位中輸入
   - 用逗號分隔不同選項
   - 例如：「炸雞, 漢堡, 披薩, 麵條」

3. **獲得決策**：點擊「🎲 幫我決定」按鈕

4. **查看結果**：應用會隨機選擇一個選項並顯示結果

## 📋 支援的預設主題

應用內建以下主題的預設選項：

- **午餐**：炒飯、麵條、便當、披薩、漢堡等
- **晚餐**：火鍋、燒烤、義大利麵、牛排等
- **飲料**：咖啡、奶茶、果汁、汽水等
- **娛樂**：看電影、逛街、打遊戲、運動等
- **交通**：走路、騎車、開車、搭公車等
- **穿搭**：休閒服、正式服裝、運動服等

## 🛠 技術架構

- **React Native**: 跨平台移動應用框架
- **Expo**: 開發和部署工具
- **React Hooks**: 狀態管理
- **Animated API**: 動畫效果
- **純前端**: 無需後端或 API

## 🎨 設計理念

- **簡潔直觀**：介面簡單易懂，操作流程清晰
- **智能識別**：自動匹配常見主題，減少用戶輸入
- **靈活自定義**：支援用戶自定義選項
- **視覺反饋**：提供載入動畫和結果動畫

## 📝 開發筆記

這個應用完全在前端運行，不需要任何後端服務或 API。所有的決策邏輯都在客戶端執行，確保了隱私性和快速響應。

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request 來改善這個應用！

## � 應用發布 (EAS Build)

本項目已配置 EAS Build，可在沒有 macOS 的情況下構建 iOS 應用。

### 前置需求

1. 註冊 [Expo 開發者帳號](https://expo.dev/)
2. 註冊 [Apple 開發者帳號](https://developer.apple.com/) (iOS 發布需要)
3. 安裝 EAS CLI: `npm install -g eas-cli`

### 構建步驟

#### 1. 登入 EAS

```bash
eas login
```

#### 2. 構建 iOS 應用 (Preview)

```bash
# 構建預覽版本，可分享給測試用戶
eas build --platform ios --profile preview
```

#### 3. 構建生產版本

```bash
# 構建可上架的生產版本
eas build --platform ios --profile production
```

#### 4. 提交到 App Store

```bash
# 自動提交到 App Store Connect
eas submit --platform ios
```

### EAS Build 優勢

- ✅ **雲端構建**: 無需 macOS 即可構建 iOS 應用
- ✅ **自動化**: 自動處理證書和配置文件
- ✅ **版本管理**: 自動遞增版本號
- ✅ **多平台**: 同時支援 iOS 和 Android
- ✅ **CI/CD**: 支援持續集成和部署

### 構建配置文件 (eas.json)

- `development`: 開發構建，用於測試
- `preview`: 預覽構建，可分享給測試用戶
- `production`: 生產構建，用於 App Store 發布

### iOS 上架步驟

1. **準備 Apple 開發者帳號**：需要每年支付 $99 USD
2. **構建應用**：使用 `eas build --platform ios --profile production`
3. **提交審核**：使用 `eas submit --platform ios`
4. **等待審核**：Apple 通常需要 1-7 天審核時間

## �📄 授權

MIT License
