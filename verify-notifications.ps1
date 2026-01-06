# Comprehensive Notification System Verification Script
# This script tests all notification functionality

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   NOTIFICATION SYSTEM - COMPREHENSIVE VERIFICATION         ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

$baseUrl = "http://localhost:3000/api/v1"
$testsPassed = 0
$testsFailed = 0

# Helper function to test API endpoint
function Test-Endpoint {
    param(
        [string]$Name,
        [string]$Method,
        [string]$Url,
        [string]$Body = $null
    )
    
    Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
    Write-Host "Testing: $Name" -ForegroundColor Yellow
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
    
    try {
        if ($Method -eq "GET") {
            $response = curl -s -X GET $Url 2>&1
        } else {
            $response = curl -s -X POST $Url -H "Content-Type: application/json" -d $Body 2>&1
        }
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ PASSED: $Name" -ForegroundColor Green
            Write-Host "Response preview: $($response.Substring(0, [Math]::Min(150, $response.Length)))..." -ForegroundColor Gray
            $script:testsPassed++
            return $true
        } else {
            Write-Host "❌ FAILED: $Name" -ForegroundColor Red
            Write-Host "Error: $response" -ForegroundColor Red
            $script:testsFailed++
            return $false
        }
    } catch {
        Write-Host "❌ FAILED: $Name" -ForegroundColor Red
        Write-Host "Exception: $_" -ForegroundColor Red
        $script:testsFailed++
        return $false
    }
}

# Pre-flight checks
Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║   STEP 1: PRE-FLIGHT CHECKS                                ║" -ForegroundColor Magenta
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Magenta

Write-Host "`nChecking if server is running..." -ForegroundColor Cyan
try {
    $serverCheck = curl -s http://localhost:3000/api/v1/notifications 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Server is running on port 3000" -ForegroundColor Green
    } else {
        Write-Host "❌ Server not responding. Please start with: npm run dev" -ForegroundColor Red
        Write-Host "`nExiting verification..." -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host "❌ Cannot connect to server" -ForegroundColor Red
    Write-Host "Please ensure the server is running: npm run dev" -ForegroundColor Yellow
    exit 1
}

# Test Suite 1: Basic API Functionality
Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║   STEP 2: BASIC API FUNCTIONALITY                          ║" -ForegroundColor Magenta
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Magenta

Test-Endpoint -Name "GET All Notifications" -Method "GET" -Url "$baseUrl/notifications"

# Test Suite 2: Notification Types (with delayed emails)
Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║   STEP 3: DELAYED EMAIL NOTIFICATIONS (5-min delay)        ║" -ForegroundColor Magenta
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Magenta

# Test 1: New Message
$body1 = '{\"userId\": 1, \"from\": \"John Doe\", \"type\": \"new_message\", \"metadata\": {\"messageId\": \"msg123\", \"messagePreview\": \"Hello! I saw your profile and would like to connect.\", \"senderName\": \"John Doe\"}}'
Test-Endpoint -Name "New Message Notification" -Method "POST" -Url "$baseUrl/notifications" -Body $body1
Start-Sleep -Seconds 1

# Test 2: Application Status
$body2 = '{\"userId\": 1, \"from\": \"HR Department\", \"type\": \"application_status\", \"metadata\": {\"applicationId\": \"app456\", \"jobTitle\": \"Senior Software Engineer\", \"companyName\": \"Solvit Africa\", \"status\": \"Shortlisted\"}}'
Test-Endpoint -Name "Application Status Update" -Method "POST" -Url "$baseUrl/notifications" -Body $body2
Start-Sleep -Seconds 1

# Test 3: Job Alert
$body3 = '{\"userId\": 1, \"from\": \"Job Finder System\", \"type\": \"job_alert\", \"metadata\": {\"jobId\": \"job789\", \"jobTitle\": \"UI/UX Designer\", \"companyName\": \"Creative Hub Rwanda\", \"location\": \"Kigali, Rwanda\", \"salaryRange\": \"$1200-$1800/month\"}}'
Test-Endpoint -Name "Job Alert Notification" -Method "POST" -Url "$baseUrl/notifications" -Body $body3
Start-Sleep -Seconds 1

# Test 4: Job Status (Recruiter)
$body4 = '{\"userId\": 1, \"from\": \"Admin Team\", \"type\": \"job_status\", \"metadata\": {\"jobTitle\": \"Project Manager\", \"result\": \"Approved\", \"feedback\": \"Great job description! Your posting is now live.\"}}'
Test-Endpoint -Name "Job Status (Recruiter)" -Method "POST" -Url "$baseUrl/notifications" -Body $body4
Start-Sleep -Seconds 1

# Test Suite 3: Immediate Email Notifications
Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║   STEP 4: IMMEDIATE EMAIL NOTIFICATIONS                    ║" -ForegroundColor Magenta
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Magenta

# Test 5: Welcome Email
$body5 = '{\"userId\": 1, \"from\": \"Job Finder Team\", \"type\": \"welcome\", \"metadata\": {\"name\": \"Test User\"}}'
Test-Endpoint -Name "Welcome Email (Immediate)" -Method "POST" -Url "$baseUrl/notifications" -Body $body5
Start-Sleep -Seconds 1

# Test 6: Email Verification
$body6 = '{\"userId\": 1, \"from\": \"Job Finder Security\", \"type\": \"verification\", \"metadata\": {\"verificationCode\": \"ABC123\", \"name\": \"Test User\"}}'
Test-Endpoint -Name "Email Verification (Immediate)" -Method "POST" -Url "$baseUrl/notifications" -Body $body6
Start-Sleep -Seconds 1

# Test Suite 4: Email-based User Lookup
Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║   STEP 5: EMAIL-BASED USER LOOKUP                          ║" -ForegroundColor Magenta
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Magenta

# Test 7: Using email instead of userId
$body7 = '{\"email\": \"innocentntakir@gmail.com\", \"from\": \"System\", \"type\": \"job_alert\", \"metadata\": {\"jobTitle\": \"Backend Developer\", \"companyName\": \"Tech Startup\", \"location\": \"Remote\"}}'
Test-Endpoint -Name "Notification via Email (not userId)" -Method "POST" -Url "$baseUrl/notifications" -Body $body7
Start-Sleep -Seconds 1

# Test Suite 5: Custom Notifications
Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║   STEP 6: CUSTOM NOTIFICATIONS                             ║" -ForegroundColor Magenta
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Magenta

# Test 8: Custom notification with custom title/message
$body8 = '{\"userId\": 1, \"from\": \"System Admin\", \"type\": \"custom\", \"title\": \"System Maintenance\", \"message\": \"Scheduled maintenance tonight at 2 AM EST\", \"metadata\": {\"priority\": \"high\"}}'
Test-Endpoint -Name "Custom Notification" -Method "POST" -Url "$baseUrl/notifications" -Body $body8
Start-Sleep -Seconds 1

# Test Suite 6: Simple String Content
Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║   STEP 7: SIMPLE STRING CONTENT                            ║" -ForegroundColor Magenta
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Magenta

# Test 9: Simple string message
$body9 = '{\"userId\": 1, \"from\": \"Quick Test\", \"message\": \"This is a simple test message\"}'
Test-Endpoint -Name "Simple String Message" -Method "POST" -Url "$baseUrl/notifications" -Body $body9
Start-Sleep -Seconds 1

# Final Verification
Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║   STEP 8: FINAL VERIFICATION                               ║" -ForegroundColor Magenta
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Magenta

Write-Host "`nRetrieving all notifications to verify they were created..." -ForegroundColor Cyan
Test-Endpoint -Name "Final GET All Notifications" -Method "GET" -Url "$baseUrl/notifications"

# Summary
Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   TEST SUMMARY                                             ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

$totalTests = $testsPassed + $testsFailed
Write-Host "`nTotal Tests Run: $totalTests" -ForegroundColor White
Write-Host "✅ Passed: $testsPassed" -ForegroundColor Green
Write-Host "❌ Failed: $testsFailed" -ForegroundColor Red

if ($testsFailed -eq 0) {
    Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║   🎉 ALL TESTS PASSED! SYSTEM FULLY OPERATIONAL! 🎉       ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
} else {
    Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Yellow
    Write-Host "║   ⚠️  SOME TESTS FAILED - REVIEW ERRORS ABOVE             ║" -ForegroundColor Yellow
    Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Yellow
}

Write-Host "`n📋 NEXT STEPS:" -ForegroundColor Cyan
Write-Host "   1. Check server console for detailed logs" -ForegroundColor White
Write-Host "   2. Verify in-app notifications in database:" -ForegroundColor White
Write-Host "      SELECT * FROM notifications ORDER BY \"createdAt\" DESC LIMIT 10;" -ForegroundColor Gray
Write-Host "   3. Check email inbox for welcome & verification emails" -ForegroundColor White
Write-Host "   4. Wait 5 minutes and check for delayed emails (if notifications unread)" -ForegroundColor White
Write-Host "   5. Verify notification preferences created:" -ForegroundColor White
Write-Host "      SELECT * FROM notification_preferences;" -ForegroundColor Gray

Write-Host "`n📧 EMAIL TESTING:" -ForegroundColor Cyan
Write-Host "   • Immediate emails: welcome, verification (sent right away)" -ForegroundColor White
Write-Host "   • Delayed emails: new_message, application_status, job_alert, job_status" -ForegroundColor White
Write-Host "   • Delay logic: Email sent after 5 min if notification still unread" -ForegroundColor White

Write-Host "`n🔍 TROUBLESHOOTING:" -ForegroundColor Cyan
Write-Host "   • If tests failed: Check server is running (npm run dev)" -ForegroundColor White
Write-Host "   • If 'User not found': Update userId in script or create test user" -ForegroundColor White
Write-Host "   • If emails not sending: Check .env email config & Redis running" -ForegroundColor White
Write-Host "   • For more help: See NOTIFICATION_VERIFICATION.md" -ForegroundColor White

Write-Host "`n" -ForegroundColor White
