# 決策小助手 - EAS Build PowerShell 腳本
Write-Host "🎯 決策小助手 - iOS 構建腳本" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan

# 檢查是否已登入 EAS
Write-Host "檢查 EAS 登入狀態..." -ForegroundColor Yellow
try {
    $user = eas whoami 2>$null
    if ($LASTEXITCODE -ne 0) {
        throw "未登入"
    }
    Write-Host "當前已登入用戶: $user" -ForegroundColor Green
} catch {
    Write-Host "請先登入 EAS:" -ForegroundColor Red
    Write-Host "eas login" -ForegroundColor White
    exit 1
}

# 選擇構建類型
Write-Host ""
Write-Host "請選擇構建類型:" -ForegroundColor Yellow
Write-Host "1) Preview (測試版本)" -ForegroundColor White
Write-Host "2) Production (正式版本)" -ForegroundColor White
$choice = Read-Host "請輸入選項 (1 或 2)"

switch ($choice) {
    "1" {
        Write-Host "開始構建 Preview 版本..." -ForegroundColor Green
        eas build --platform ios --profile preview
    }
    "2" {
        Write-Host "開始構建 Production 版本..." -ForegroundColor Green
        eas build --platform ios --profile production
    }
    default {
        Write-Host "無效選項，退出" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "✅ 構建完成！" -ForegroundColor Green
Write-Host "📱 您可以在 https://expo.dev/ 查看構建狀態" -ForegroundColor Cyan
Write-Host "🚀 構建成功後，可以使用以下命令提交到 App Store:" -ForegroundColor Cyan
Write-Host "   eas submit --platform ios" -ForegroundColor White