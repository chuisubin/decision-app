#!/bin/bash

# 決策助手 - EAS Build 腳本
echo "🎯 決策助手 - iOS 構建腳本"
echo "================================="

# 檢查是否已登入 EAS
echo "檢查 EAS 登入狀態..."
if ! eas whoami > /dev/null 2>&1; then
    echo "請先登入 EAS:"
    echo "eas login"
    exit 1
fi

echo "當前已登入用戶: $(eas whoami)"

# 選擇構建類型
echo ""
echo "請選擇構建類型:"
echo "1) Preview (測試版本)"
echo "2) Production (正式版本)"
read -p "請輸入選項 (1 或 2): " choice

case $choice in
    1)
        echo "開始構建 Preview 版本..."
        eas build --platform ios --profile preview
        ;;
    2)
        echo "開始構建 Production 版本..."
        eas build --platform ios --profile production
        ;;
    *)
        echo "無效選項，退出"
        exit 1
        ;;
esac

echo ""
echo "✅ 構建完成！"
echo "📱 您可以在 https://expo.dev/ 查看構建狀態"
echo "🚀 構建成功後，可以使用以下命令提交到 App Store:"
echo "   eas submit --platform ios"