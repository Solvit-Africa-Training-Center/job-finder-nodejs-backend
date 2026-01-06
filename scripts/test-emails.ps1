# PowerShell script to test all email notification types via the backend API
# Ensure the server is running on http://localhost:3000 before running this.

$baseUrl = "http://localhost:3000/api/v1/notifications/direct-test"
$testEmail = "innocentntakir@gmail.com" # Change this if needed

function Send-TestEmail($typeName, $metadata) {
    Write-Host "Testing email type: $typeName..." -ForegroundColor Cyan
    $body = @{
        email = $testEmail
        type = $typeName
        metadata = $metadata
    } | ConvertTo-Json

    try {
        $response = Invoke-RestMethod -Uri $baseUrl -Method Post -ContentType "application/json" -Body $body
        Write-Host "Success: $($response.message)" -ForegroundColor Green
    }
    catch {
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    }
    Write-Host "-----------------------------------"
}

# 1. New Message
Send-TestEmail "new-message" @{
    senderName = "John Doe"
    messagePreview = "I am interested in your profile and would like to schedule an interview."
}

# 2. Application Status Changed
Send-TestEmail "application-status" @{
    jobTitle = "Software Engineer"
    companyName = "Solvit Africa"
    status = "Shortlisted"
}

# 3. New Job Alert
Send-TestEmail "job-alert" @{
    jobTitle = "Full Stack Developer"
    companyName = "Creative Hub"
    location = "Kigali"
    salaryRange = "$1200 - $1800"
}

# 4. Job Approved/Rejected
Send-TestEmail "job-status" @{
    jobTitle = "Project Manager"
    result = "Approved"
    feedback = "Your job posting has been reviewed and is now live."
}

# 5. Welcome Email
Send-TestEmail "welcome" @{}

# 6. Email Verification
Send-TestEmail "verification" @{
    verificationCode = "554422"
}
