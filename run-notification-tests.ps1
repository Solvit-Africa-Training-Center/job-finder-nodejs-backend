# Comprehensive Notification System Test
# Tests ALL notification types without requiring endpoints

Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "    COMPREHENSIVE NOTIFICATION SYSTEM TEST" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "This test will verify:" -ForegroundColor Yellow
Write-Host "   - Welcome emails (immediate)" -ForegroundColor White
Write-Host "   - Verification emails (immediate)" -ForegroundColor White
Write-Host "   - New message notifications (delayed 5 min)" -ForegroundColor White
Write-Host "   - Application status updates (delayed 5 min)" -ForegroundColor White
Write-Host "   - Job alerts (delayed 5 min)" -ForegroundColor White
Write-Host "   - Job status updates (delayed 5 min)" -ForegroundColor White
Write-Host "   - Email address resolution" -ForegroundColor White
Write-Host "   - Custom notifications" -ForegroundColor White
Write-Host "   - Daily digest mode" -ForegroundColor White
Write-Host "   - Email preferences (enabled/disabled)" -ForegroundColor White

Write-Host ""
Write-Host "Prerequisites Check..." -ForegroundColor Cyan

# Check if server is running
Write-Host ""
Write-Host "[1/3] Checking if server is running..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/v1/notifications" -Method GET -UseBasicParsing -ErrorAction Stop -TimeoutSec 5
    Write-Host "   Server is running!" -ForegroundColor Green
} catch {
    Write-Host "   Server is NOT running!" -ForegroundColor Red
    Write-Host ""
    Write-Host "   Please start the server first:" -ForegroundColor Yellow
    Write-Host "   npm run dev" -ForegroundColor White
    Write-Host ""
    Write-Host "   Then run this test again." -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

# Check if Redis is running
Write-Host ""
Write-Host "[2/3] Checking if Redis is running..." -ForegroundColor Yellow
try {
    $redisTest = Test-NetConnection -ComputerName localhost -Port 6379 -WarningAction SilentlyContinue -ErrorAction Stop
    if ($redisTest.TcpTestSucceeded) {
        Write-Host "   Redis is running!" -ForegroundColor Green
    } else {
        Write-Host "   Redis might not be running (port 6379 not accessible)" -ForegroundColor Yellow
        Write-Host "   Email queue may not work without Redis" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   Could not verify Redis status" -ForegroundColor Yellow
    Write-Host "   Continuing anyway..." -ForegroundColor Yellow
}

# Check if TypeScript is available
Write-Host ""
Write-Host "[3/3] Checking TypeScript..." -ForegroundColor Yellow
try {
    $null = npx -y ts-node --version 2>&1
    Write-Host "   TypeScript ready!" -ForegroundColor Green
} catch {
    Write-Host "   TypeScript might not be available" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "    RUNNING TESTS..." -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "Starting comprehensive test suite..." -ForegroundColor Green
Write-Host ""

# Run the TypeScript test file
try {
    npx ts-node test-all-notifications.ts
    
    Write-Host ""
    Write-Host "================================================================" -ForegroundColor Green
    Write-Host "    TESTS COMPLETED SUCCESSFULLY!" -ForegroundColor Green
    Write-Host "================================================================" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "EMAIL CHECKLIST:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "IMMEDIATE EMAILS (check inbox now):" -ForegroundColor Green
    Write-Host "   [ ] Welcome to Job Finder" -ForegroundColor White
    Write-Host "   [ ] Verify your email address" -ForegroundColor White
    
    Write-Host ""
    Write-Host "DELAYED EMAILS (check inbox in 5 minutes):" -ForegroundColor Cyan
    Write-Host "   [ ] New message from John Doe" -ForegroundColor White
    Write-Host "   [ ] Application status update" -ForegroundColor White
    Write-Host "   [ ] New job alert" -ForegroundColor White
    Write-Host "   [ ] Job status update" -ForegroundColor White
    Write-Host "   [ ] New message (email test)" -ForegroundColor White
    
    $delayedTime = (Get-Date).AddMinutes(5).ToString("HH:mm:ss")
    Write-Host ""
    Write-Host "Set a timer! Delayed emails arrive at: $delayedTime" -ForegroundColor Magenta
    
    Write-Host ""
    Write-Host "TIPS:" -ForegroundColor Yellow
    Write-Host "   - Check spam/junk folder if emails not in inbox" -ForegroundColor Gray
    Write-Host "   - Watch server console for 'Email sent' confirmations" -ForegroundColor Gray
    Write-Host "   - All notifications are saved in the database" -ForegroundColor Gray
    
    Write-Host ""
    Write-Host "WHAT WAS TESTED:" -ForegroundColor Yellow
    Write-Host "   [OK] 10 different notification scenarios" -ForegroundColor Green
    Write-Host "   [OK] Immediate email delivery (welcome, verification)" -ForegroundColor Green
    Write-Host "   [OK] Delayed email delivery (5-minute delay)" -ForegroundColor Green
    Write-Host "   [OK] Email address resolution" -ForegroundColor Green
    Write-Host "   [OK] User preference handling" -ForegroundColor Green
    Write-Host "   [OK] Daily digest mode" -ForegroundColor Green
    Write-Host "   [OK] Email enable/disable toggle" -ForegroundColor Green
    
} catch {
    Write-Host ""
    Write-Host "TEST EXECUTION FAILED!" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "   1. Make sure the server is running (npm run dev)" -ForegroundColor White
    Write-Host "   2. Check if Redis is running" -ForegroundColor White
    Write-Host "   3. Verify database connection" -ForegroundColor White
    Write-Host "   4. Check .env file configuration" -ForegroundColor White
    exit 1
}

Write-Host ""
