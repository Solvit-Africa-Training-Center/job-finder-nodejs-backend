# Quick Email Flow Test
# Tests all notification types and tells you what to check in your email

Write-Host "=== EMAIL NOTIFICATION TEST - CHECK YOUR INBOX! ===" -ForegroundColor Cyan

Write-Host "`nYour email: innocentntakir@gmail.com" -ForegroundColor Yellow
Write-Host ""

# Check server is running
Write-Host "[Pre-check] Verifying server is running..." -ForegroundColor Cyan
try {
    $check = Invoke-WebRequest -Uri "http://localhost:3000/api/v1/notifications" -Method GET -UseBasicParsing -ErrorAction Stop
    Write-Host "Server is running!" -ForegroundColor Green
} catch {
    Write-Host "Server not running! Please start with: npm run dev" -ForegroundColor Red
    exit 1
}

Write-Host "`n=== IMMEDIATE EMAILS (Check inbox in 30 seconds) ===" -ForegroundColor Magenta

# Test 1: Welcome Email (Immediate)
Write-Host "`n[1/4] Sending Welcome Email..." -ForegroundColor Yellow
$body1 = @{
    userId = 1
    from = "Job Finder Team"
    type = "welcome"
} | ConvertTo-Json

try {
    Invoke-WebRequest -Uri "http://localhost:3000/api/v1/notifications" -Method POST -ContentType "application/json" -Body $body1 -UseBasicParsing | Out-Null
    Write-Host "Welcome email sent!" -ForegroundColor Green
    Write-Host "   Check your inbox for: 'Welcome to Job Finder'" -ForegroundColor Gray
} catch {
    Write-Host "Failed to send welcome email" -ForegroundColor Red
}

Start-Sleep -Seconds 2

# Test 2: Verification Email (Immediate)
Write-Host "`n[2/4] Sending Verification Email..." -ForegroundColor Yellow
$body2 = @{
    userId = 1
    from = "Job Finder Security"
    type = "verification"
    metadata = @{ verificationCode = "TEST123" }
} | ConvertTo-Json

try {
    Invoke-WebRequest -Uri "http://localhost:3000/api/v1/notifications" -Method POST -ContentType "application/json" -Body $body2 -UseBasicParsing | Out-Null
    Write-Host "Verification email sent!" -ForegroundColor Green
    Write-Host "   Check your inbox for: 'Verify your email address'" -ForegroundColor Gray
    Write-Host "   Code: TEST123" -ForegroundColor Gray
} catch {
    Write-Host "Failed to send verification email" -ForegroundColor Red
}

Write-Host "`n=== DELAYED EMAILS (Check inbox in 5 minutes) ===" -ForegroundColor Magenta

Start-Sleep -Seconds 2

# Test 3: New Message (Delayed)
Write-Host "`n[3/4] Sending New Message Notification..." -ForegroundColor Yellow
$body3 = @{
    userId = 1
    from = "John Doe"
    type = "new_message"
    metadata = @{
        messageId = "msg123"
        messagePreview = "Hi! I'm interested in your profile. Let's connect!"
        senderName = "John Doe"
    }
} | ConvertTo-Json

try {
    Invoke-WebRequest -Uri "http://localhost:3000/api/v1/notifications" -Method POST -ContentType "application/json" -Body $body3 -UseBasicParsing | Out-Null
    Write-Host "New message notification created!" -ForegroundColor Green
    Write-Host "   Email will arrive in 5 minutes" -ForegroundColor Gray
    Write-Host "   Subject: 'You have a new message from John Doe'" -ForegroundColor Gray
} catch {
    Write-Host "Failed to create notification" -ForegroundColor Red
}

Start-Sleep -Seconds 2

# Test 4: Job Alert (Delayed)
Write-Host "`n[4/4] Sending Job Alert Notification..." -ForegroundColor Yellow
$body4 = @{
    userId = 1
    from = "Job Finder System"
    type = "job_alert"
    metadata = @{
        jobId = "job789"
        jobTitle = "Senior Software Engineer"
        companyName = "Solvit Africa Training Center"
        location = "Kigali, Rwanda"
        salaryRange = "`$2000-`$3000/month"
    }
} | ConvertTo-Json

try {
    Invoke-WebRequest -Uri "http://localhost:3000/api/v1/notifications" -Method POST -ContentType "application/json" -Body $body4 -UseBasicParsing | Out-Null
    Write-Host "Job alert notification created!" -ForegroundColor Green
    Write-Host "   Email will arrive in 5 minutes" -ForegroundColor Gray
    Write-Host "   Subject: 'New job matching your profile'" -ForegroundColor Gray
} catch {
    Write-Host "Failed to create notification" -ForegroundColor Red
}

# Summary
Write-Host "`n=== TESTS COMPLETE! ===" -ForegroundColor Cyan

Write-Host "`nCHECK YOUR EMAIL: innocentntakir@gmail.com" -ForegroundColor Yellow

Write-Host "`nIMMEDIATE EMAILS (check now):" -ForegroundColor Green
Write-Host "   1. Welcome to Job Finder" -ForegroundColor White
Write-Host "   2. Verify your email address (Code: TEST123)" -ForegroundColor White

Write-Host "`nDELAYED EMAILS (check in 5 minutes):" -ForegroundColor Cyan
Write-Host "   3. You have a new message from John Doe" -ForegroundColor White
Write-Host "   4. New job matching your profile" -ForegroundColor White

Write-Host "`nTIPS:" -ForegroundColor Yellow
Write-Host "   - Check spam/junk folder if emails not in inbox" -ForegroundColor Gray
Write-Host "   - Immediate emails arrive within 30 seconds" -ForegroundColor Gray
Write-Host "   - Delayed emails arrive exactly after 5 minutes" -ForegroundColor Gray
Write-Host "   - Check server console for 'Email sent' confirmations" -ForegroundColor Gray

Write-Host "`nVERIFY IN DATABASE:" -ForegroundColor Yellow
Write-Host '   SELECT * FROM notifications ORDER BY "createdAt" DESC LIMIT 5;' -ForegroundColor Gray

Write-Host "`nSET A 5-MINUTE TIMER NOW!" -ForegroundColor Cyan

# Calculate time when delayed emails should arrive
$delayedEmailTime = (Get-Date).AddMinutes(5).ToString("HH:mm:ss")
Write-Host "`nDelayed emails will arrive at approximately: $delayedEmailTime" -ForegroundColor Magenta
Write-Host ""
