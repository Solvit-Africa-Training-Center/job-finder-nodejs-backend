# Test notify() Function - Comprehensive Test Suite

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   TESTING notify() FUNCTION                                ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

$baseUrl = "http://localhost:3000/api/v1/notifications"
$testsPassed = 0
$testsFailed = 0

# Helper function to test notify
function Test-Notify {
    param(
        [string]$TestName,
        [hashtable]$Body
    )
    
    Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
    Write-Host "Testing: $TestName" -ForegroundColor Yellow
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
    
    try {
        $json = $Body | ConvertTo-Json -Depth 10
        $response = Invoke-WebRequest -Uri $baseUrl `
            -Method POST `
            -ContentType "application/json" `
            -Body $json `
            -UseBasicParsing
        
        $result = $response.Content | ConvertFrom-Json
        
        if ($result.success) {
            Write-Host "✅ PASSED: $TestName" -ForegroundColor Green
            Write-Host "   User ID: $($result.userId)" -ForegroundColor Gray
            Write-Host "   Type: $($result.type)" -ForegroundColor Gray
            Write-Host "   Email Queued: $($result.emailQueued)" -ForegroundColor Gray
            $script:testsPassed++
        } else {
            Write-Host "❌ FAILED: $TestName" -ForegroundColor Red
            Write-Host "   Error: $($result.error)" -ForegroundColor Red
            $script:testsFailed++
        }
    } catch {
        Write-Host "❌ FAILED: $TestName" -ForegroundColor Red
        Write-Host "   Exception: $_" -ForegroundColor Red
        $script:testsFailed++
    }
    
    Start-Sleep -Milliseconds 500
}

# Pre-flight check
Write-Host "`n[Pre-flight] Checking server status..." -ForegroundColor Cyan
try {
    $health = Invoke-WebRequest -Uri "http://localhost:3000/api/v1/notifications" -Method GET -UseBasicParsing
    Write-Host "✅ Server is running!" -ForegroundColor Green
} catch {
    Write-Host "❌ Server not running! Please start with: npm run dev" -ForegroundColor Red
    exit 1
}

Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║   TEST SUITE 1: DELAYED EMAIL NOTIFICATIONS                ║" -ForegroundColor Magenta
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Magenta

# Test 1: New Message
Test-Notify "New Message Notification" @{
    userId = 1
    from = "John Doe"
    type = "new_message"
    metadata = @{
        messageId = "msg123"
        messagePreview = "Hello! I saw your profile and would like to connect."
        senderName = "John Doe"
    }
}

# Test 2: Application Status
Test-Notify "Application Status Update" @{
    userId = 1
    from = "HR Department"
    type = "application_status"
    metadata = @{
        applicationId = "app456"
        jobTitle = "Senior Software Engineer"
        companyName = "Solvit Africa"
        status = "Shortlisted"
    }
}

# Test 3: Job Alert
Test-Notify "Job Alert Notification" @{
    userId = 1
    from = "Job Finder System"
    type = "job_alert"
    metadata = @{
        jobId = "job789"
        jobTitle = "UI/UX Designer"
        companyName = "Creative Hub Rwanda"
        location = "Kigali, Rwanda"
        salaryRange = "$1200-$1800/month"
    }
}

# Test 4: Job Status (Recruiter)
Test-Notify "Job Status for Recruiter" @{
    userId = 1
    from = "Admin Team"
    type = "job_status"
    metadata = @{
        jobTitle = "Project Manager"
        result = "Approved"
        feedback = "Great job description!"
    }
}

Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║   TEST SUITE 2: IMMEDIATE EMAIL NOTIFICATIONS              ║" -ForegroundColor Magenta
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Magenta

# Test 5: Welcome Email
Test-Notify "Welcome Email (Immediate)" @{
    userId = 1
    from = "Job Finder Team"
    type = "welcome"
    metadata = @{
        name = "Test User"
    }
}

# Test 6: Email Verification
Test-Notify "Email Verification (Immediate)" @{
    userId = 1
    from = "Job Finder Security"
    type = "verification"
    metadata = @{
        verificationCode = "ABC123"
        name = "Test User"
    }
}

Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║   TEST SUITE 3: ALTERNATIVE INPUT METHODS                  ║" -ForegroundColor Magenta
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Magenta

# Test 7: Using Email Instead of UserId
Test-Notify "Notification via Email Lookup" @{
    email = "innocentntakir@gmail.com"
    from = "System"
    type = "job_alert"
    metadata = @{
        jobTitle = "Backend Developer"
        companyName = "Tech Startup"
        location = "Remote"
    }
}

# Test 8: Simple String Message
Test-Notify "Simple String Message" @{
    userId = 1
    from = "Quick Test"
    message = "This is a simple test message"
}

Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║   TEST SUITE 4: CUSTOM NOTIFICATIONS                       ║" -ForegroundColor Magenta
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Magenta

# Test 9: Custom Notification with Custom Title
Test-Notify "Custom Notification" @{
    userId = 1
    from = "System Admin"
    type = "custom"
    title = "System Maintenance"
    message = "Scheduled maintenance tonight at 2 AM EST"
    metadata = @{
        priority = "high"
        scheduledTime = "2026-01-06T02:00:00Z"
    }
}

Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║   TEST SUITE 5: ERROR HANDLING                             ║" -ForegroundColor Magenta
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Magenta

# Test 10: Invalid User (should fail gracefully)
Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "Testing: Invalid User (Error Handling)" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

try {
    $json = @{
        userId = 99999
        from = "Test"
        type = "new_message"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri $baseUrl `
        -Method POST `
        -ContentType "application/json" `
        -Body $json `
        -UseBasicParsing
    
    $result = $response.Content | ConvertFrom-Json
    
    if (-not $result.success -and $result.error -eq "User not found") {
        Write-Host "✅ PASSED: Error handling works correctly" -ForegroundColor Green
        Write-Host "   Error message: $($result.error)" -ForegroundColor Gray
        $testsPassed++
    } else {
        Write-Host "❌ FAILED: Should have returned error for invalid user" -ForegroundColor Red
        $testsFailed++
    }
} catch {
    Write-Host "❌ FAILED: Error handling test - $_" -ForegroundColor Red
    $testsFailed++
}

# Summary
Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   TEST SUMMARY                                             ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

$totalTests = $testsPassed + $testsFailed
Write-Host "`nTotal Tests: $totalTests" -ForegroundColor White
Write-Host "✅ Passed: $testsPassed" -ForegroundColor Green
Write-Host "❌ Failed: $testsFailed" -ForegroundColor Red

if ($testsFailed -eq 0) {
    Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║   🎉 ALL TESTS PASSED! notify() IS WORKING PERFECTLY! 🎉 ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
} else {
    Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Yellow
    Write-Host "║   ⚠️  SOME TESTS FAILED - REVIEW ERRORS ABOVE             ║" -ForegroundColor Yellow
    Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Yellow
}

Write-Host "`n📋 NEXT STEPS:" -ForegroundColor Cyan
Write-Host "   1. Check server console for detailed logs" -ForegroundColor White
Write-Host "   2. Verify notifications in database:" -ForegroundColor White
Write-Host "      SELECT * FROM notifications ORDER BY \"createdAt\" DESC LIMIT 10;" -ForegroundColor Gray
Write-Host "   3. Check email inbox for welcome & verification emails" -ForegroundColor White
Write-Host "   4. Wait 5 minutes for delayed emails (if notifications unread)" -ForegroundColor White
Write-Host "   5. Check notification preferences:" -ForegroundColor White
Write-Host "      SELECT * FROM notification_preferences;" -ForegroundColor Gray

Write-Host "`n📧 EMAIL BEHAVIOR:" -ForegroundColor Cyan
Write-Host "   • Immediate: welcome, verification (sent right away)" -ForegroundColor White
Write-Host "   • Delayed: new_message, application_status, job_alert, job_status" -ForegroundColor White
Write-Host "   • Delay logic: Email sent after 5 min if notification still unread" -ForegroundColor White

Write-Host "`n"
