# Quick Notification Test
# Simple test to verify notification system works

Write-Host ""
Write-Host "QUICK NOTIFICATION TEST" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan
Write-Host ""

# Check server
Write-Host "Checking server..." -ForegroundColor Yellow
try {
    $null = Invoke-WebRequest -Uri "http://localhost:3000/api/v1/notifications" -Method GET -UseBasicParsing -ErrorAction Stop -TimeoutSec 5
    Write-Host "[OK] Server is running" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Server not running. Start with: npm run dev" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Running tests..." -ForegroundColor Yellow
Write-Host ""

# Run tests
npx ts-node test-all-notifications.ts

Write-Host ""
Write-Host "DONE!" -ForegroundColor Green
Write-Host ""
Write-Host "Check your email inbox for:" -ForegroundColor Yellow
Write-Host "  - Welcome email (immediate)" -ForegroundColor White
Write-Host "  - Verification email (immediate)" -ForegroundColor White
Write-Host "  - Other emails (in 5 minutes)" -ForegroundColor White
Write-Host ""
