# iOS 上架快速指南

## 🎯 決策助手 - iOS 上架完整流程

### 📋 準備清單

#### 1. 帳號準備

- [x] Expo 開發者帳號：已註冊並登入 (gglababy)
- [ ] Apple 開發者帳號：需要註冊 ($99/年)

#### 2. 項目配置

- [x] EAS Build 已配置
- [x] 項目 ID：b2359850-c722-415b-8397-704077b49fb5
- [x] Bundle ID：com.gglababy.decisionapp

### 🚀 上架步驟

#### 步驟 1: 註冊 Apple 開發者帳號

1. 前往 [Apple Developer](https://developer.apple.com/)
2. 註冊並支付 $99 年費
3. 等待帳號審核通過（通常 1-2 天）

#### 步驟 2: 構建應用

```bash
# 方法 1: 使用 npm 腳本
npm run build:ios

# 方法 2: 直接使用 EAS CLI
eas build --platform ios --profile production

# 方法 3: 使用 PowerShell 腳本 (Windows)
.\build-ios.ps1
```

#### 步驟 3: 提交到 App Store

```bash
# EAS 會自動處理證書和上傳
eas submit --platform ios
```

### 📱 測試版本

在正式上架前，建議先構建測試版本：

```bash
# 構建 Preview 版本
npm run build:ios:preview

# 或使用完整命令
eas build --platform ios --profile preview
```

### 🔧 故障排除

#### 常見問題

1. **證書問題**：EAS 會自動處理，無需手動配置
2. **Bundle ID 衝突**：確保 Bundle ID 唯一
3. **版本號**：EAS 會自動遞增

#### 檢查構建狀態

- 訪問：https://expo.dev/accounts/gglababy/projects/decision-app
- 查看構建日誌和下載 IPA 文件

### 📋 App Store 信息準備

準備以下 App Store 上架信息：

#### 基本信息

- **應用名稱**：決策助手
- **副標題**：簡單易用的日常決策工具
- **描述**：見下方建議文案
- **關鍵字**：決策,選擇,隨機,工具,生活
- **類別**：生產力工具 (Productivity)

#### 建議 App Store 描述

```
🎯 決策助手 - 讓選擇變得簡單

還在為日常選擇而煩惱嗎？「決策助手」是您的完美解決方案！

✨ 主要功能：
• 智能主題識別 - 自動匹配常見場景
• 豐富預設選項 - 涵蓋飲食、娛樂、交通等
• 自定義選項 - 輕鬆添加個人化選擇
• 隨機決策 - 公平快速的選擇機制
• 美觀界面 - 現代化設計，操作流暢

🎮 使用場景：
• 不知道午餐吃什麼？
• 今天穿什麼衣服？
• 週末做什麼娛樂？
• 選擇交通方式？

🌟 特色：
• 完全免費，無廣告
• 無需網絡，保護隱私
• 支持多種預設主題
• 界面簡潔，操作直觀

讓「決策助手」幫您快速做出選擇，告別選擇困難症！
```

#### 螢幕截圖要求

- iPhone: 6.7", 6.5", 5.5" 尺寸
- iPad: 12.9", 11" 尺寸 (如支持)
- 建議準備 3-5 張展示主要功能的截圖

### 📞 聯繫支援

如遇問題，可參考：

- [EAS Build 文檔](https://docs.expo.dev/build/introduction)
- [App Store 上架指南](https://developer.apple.com/app-store/submissions/)
- [Expo 社區論壇](https://forums.expo.dev/)
