# Simple Notification Test Script
# Tests basic notification functionality

Write-Host "=== Notification System Test ===" -ForegroundColor Cyan
Write-Host ""

# Check if server is running
Write-Host "Checking server status..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/v1/notifications" -Method GET -UseBasicParsing -ErrorAction Stop
    Write-Host "✅ Server is running!" -ForegroundColor Green
} catch {
    Write-Host "❌ Server is not running!" -ForegroundColor Red
    Write-Host "Please start the server with: npm run dev" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Running notification tests..." -ForegroundColor Yellow
Write-Host ""

# Test 1: New Message
Write-Host "[1/4] Testing New Message..." -ForegroundColor Cyan
$body1 = @{
    userId = 1
    from = "John Doe"
    type = "new_message"
    metadata = @{
        messagePreview = "Hello! Testing notifications."
    }
} | ConvertTo-Json

try {
    $result1 = Invoke-WebRequest -Uri "http://localhost:3000/api/v1/notifications" -Method POST -ContentType "application/json" -Body $body1 -UseBasicParsing
    Write-Host "✅ New Message notification sent" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed: $_" -ForegroundColor Red
}

Start-Sleep -Seconds 1

# Test 2: Job Alert
Write-Host "[2/4] Testing Job Alert..." -ForegroundColor Cyan
$body2 = @{
    userId = 1
    from = "Job Finder"
    type = "job_alert"
    metadata = @{
        jobTitle = "Software Engineer"
        companyName = "Tech Corp"
        location = "Kigali"
    }
} | ConvertTo-Json

try {
    $result2 = Invoke-WebRequest -Uri "http://localhost:3000/api/v1/notifications" -Method POST -ContentType "application/json" -Body $body2 -UseBasicParsing
    Write-Host "✅ Job Alert notification sent" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed: $_" -ForegroundColor Red
}

Start-Sleep -Seconds 1

# Test 3: Welcome Email
Write-Host "[3/4] Testing Welcome Email..." -ForegroundColor Cyan
$body3 = @{
    userId = 1
    from = "Job Finder Team"
    type = "welcome"
} | ConvertTo-Json

try {
    $result3 = Invoke-WebRequest -Uri "http://localhost:3000/api/v1/notifications" -Method POST -ContentType "application/json" -Body $body3 -UseBasicParsing
    Write-Host "✅ Welcome email sent" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed: $_" -ForegroundColor Red
}

Start-Sleep -Seconds 1

# Test 4: Get All Notifications
Write-Host "[4/4] Getting all notifications..." -ForegroundColor Cyan
try {
    $result4 = Invoke-WebRequest -Uri "http://localhost:3000/api/v1/notifications" -Method GET -UseBasicParsing
    Write-Host "✅ Retrieved all notifications" -ForegroundColor Green
    Write-Host ""
    Write-Host "Response preview:" -ForegroundColor Gray
    $preview = $result4.Content.Substring(0, [Math]::Min(200, $result4.Content.Length))
    Write-Host $preview -ForegroundColor Gray
} catch {
    Write-Host "❌ Failed: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Tests Complete! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Check server console for detailed logs" -ForegroundColor White
Write-Host "2. Check email inbox for welcome email" -ForegroundColor White
Write-Host "3. Wait 5 minutes for delayed emails (if notifications unread)" -ForegroundColor White
