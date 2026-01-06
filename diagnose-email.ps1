# Quick Email Fix Script
# This script checks what's wrong and tells you how to fix it

Write-Host "=== EMAIL SYSTEM DIAGNOSTIC ===" -ForegroundColor Cyan
Write-Host ""

$issues = @()
$fixes = @()

# Check 1: Redis
Write-Host "[1/3] Checking Redis..." -ForegroundColor Yellow
try {
    $redisCheck = redis-cli ping 2>&1
    if ($redisCheck -match "PONG") {
        Write-Host "  Redis is running" -ForegroundColor Green
    } else {
        Write-Host "  Redis is NOT running" -ForegroundColor Red
        $issues += "Redis not running"
        $fixes += "Start Redis: redis-server (in a new terminal)"
    }
} catch {
    Write-Host "  Redis is NOT installed or not running" -ForegroundColor Red
    $issues += "Redis not installed/running"
    $fixes += @"
Install Redis:
  Option 1: choco install redis-64 -y
  Option 2: Use WSL: sudo apt-get install redis-server
Then start it: redis-server
"@
}

# Check 2: Email Configuration
Write-Host "`n[2/3] Checking Email Configuration..." -ForegroundColor Yellow
$envContent = Get-Content .env -ErrorAction SilentlyContinue

if ($envContent) {
    $mailHost = $envContent | Select-String "MAIL_HOST=" | Select-Object -First 1
    $mailUser = $envContent | Select-String "MAIL_USERNAME=" | Select-Object -First 1
    $mailPass = $envContent | Select-String "MAIL_PASSWORD=" | Select-Object -First 1
    
    if ($mailHost -and $mailUser -and $mailPass) {
        Write-Host "  Email settings found in .env" -ForegroundColor Green
        
        # Check if using default/placeholder values
        if ($mailUser -match "your_|username" -or $mailPass -match "your_|password") {
            Write-Host "  WARNING: Using placeholder email credentials" -ForegroundColor Yellow
            $issues += "Email credentials not configured"
            $fixes += @"
Update .env with real email credentials:
  MAIL_HOST=smtp.gmail.com
  MAIL_PORT=587
  MAIL_USERNAME=innocentntakir@gmail.com
  MAIL_PASSWORD=your_gmail_app_password
  MAIL_FROM_ADDRESS=innocentntakir@gmail.com
  
Get Gmail App Password: https://myaccount.google.com/apppasswords
"@
        }
    } else {
        Write-Host "  Email settings missing in .env" -ForegroundColor Red
        $issues += "Email settings missing"
        $fixes += "Add email settings to .env file (see EMAIL_TROUBLESHOOTING.md)"
    }
} else {
    Write-Host "  .env file not found" -ForegroundColor Red
    $issues += ".env file missing"
    $fixes += "Create .env file from .env.example"
}

# Check 3: Server Running
Write-Host "`n[3/3] Checking Server..." -ForegroundColor Yellow
try {
    $serverCheck = Invoke-WebRequest -Uri "http://localhost:3000/api/v1/notifications" -Method GET -UseBasicParsing -ErrorAction Stop
    Write-Host "  Server is running on port 3000" -ForegroundColor Green
} catch {
    Write-Host "  Server is NOT running" -ForegroundColor Red
    $issues += "Server not running"
    $fixes += "Start server: npm run dev"
}

# Summary
Write-Host "`n=== DIAGNOSTIC RESULTS ===" -ForegroundColor Cyan

if ($issues.Count -eq 0) {
    Write-Host "`nNo issues found!" -ForegroundColor Green
    Write-Host "Your email system should be working." -ForegroundColor Green
    Write-Host "`nIf emails still not arriving:" -ForegroundColor Yellow
    Write-Host "  1. Check spam/junk folder" -ForegroundColor Gray
    Write-Host "  2. Verify Gmail App Password is correct" -ForegroundColor Gray
    Write-Host "  3. Check server console for email errors" -ForegroundColor Gray
} else {
    Write-Host "`nFound $($issues.Count) issue(s):" -ForegroundColor Red
    for ($i = 0; $i -lt $issues.Count; $i++) {
        Write-Host "`n  Issue $($i+1): $($issues[$i])" -ForegroundColor Yellow
        Write-Host "  Fix:" -ForegroundColor Cyan
        Write-Host "  $($fixes[$i])" -ForegroundColor White
    }
}

Write-Host "`n=== NEXT STEPS ===" -ForegroundColor Cyan
Write-Host "1. Fix the issues listed above" -ForegroundColor White
Write-Host "2. Restart your server: npm run dev" -ForegroundColor White
Write-Host "3. Run the test again: powershell -ExecutionPolicy Bypass -File test-email-flow.ps1" -ForegroundColor White
Write-Host "4. Check your email inbox" -ForegroundColor White

Write-Host "`nFor detailed help, see: EMAIL_TROUBLESHOOTING.md" -ForegroundColor Gray
Write-Host ""
