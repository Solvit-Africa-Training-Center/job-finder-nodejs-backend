# Comprehensive Notification System Testing Guide

## Overview
This guide explains how to test the complete notification system without requiring specific endpoints. The system supports **all notification types** including emails, in-app notifications, and various delivery modes.

---

## 🎯 What Gets Tested

### 1. **Immediate Email Notifications**
- ✅ Welcome emails (sent immediately)
- ✅ Verification emails (sent immediately)

### 2. **Delayed Email Notifications** (5-minute delay)
- ✅ New message notifications
- ✅ Application status updates
- ✅ Job alerts
- ✅ Job status updates

### 3. **Advanced Features**
- ✅ Email address resolution (notify by email instead of userId)
- ✅ Custom notification types
- ✅ Daily digest mode
- ✅ Email preference toggling (enable/disable)
- ✅ In-app notification creation
- ✅ Metadata enrichment with URLs

---

## 🚀 Quick Start

### Method 1: Run PowerShell Script (Easiest)
```powershell
# Make sure server is running first
npm run dev

# In a new terminal, run the test script
.\run-notification-tests.ps1
```

### Method 2: Run TypeScript Directly
```bash
# Make sure server is running first
npm run dev

# In a new terminal
npx ts-node test-all-notifications.ts
```

---

## 📋 Prerequisites

1. **Server Running**
   ```bash
   npm run dev
   ```

2. **Redis Running** (for email queue)
   - Windows: Redis should be running on port 6379
   - Check: `Test-NetConnection -ComputerName localhost -Port 6379`

3. **Database Connected**
   - PostgreSQL should be running
   - Database should be migrated

4. **Email Configuration**
   - `.env` file should have valid email credentials
   - Gmail App Password configured (if using Gmail)

---

## 🧪 Test Scenarios

### Test 1: Welcome Email (Immediate)
```typescript
await notificationService.notify(
    userId,
    'Job Finder Team',
    {
        type: 'welcome',
        metadata: {
            userName: 'Test User',
        }
    }
);
```
**Expected Result:**
- ✅ Email sent immediately
- 📧 Subject: "Welcome to Job Finder"
- ⏱️ Delivery: Within 30 seconds

---

### Test 2: Verification Email (Immediate)
```typescript
await notificationService.notify(
    userId,
    'Job Finder Security',
    {
        type: 'verification',
        metadata: {
            verificationCode: 'TEST123',
        }
    }
);
```
**Expected Result:**
- ✅ Email sent immediately
- 📧 Subject: "Verify your email address"
- 🔑 Contains verification code
- ⏱️ Delivery: Within 30 seconds

---

### Test 3: New Message Notification (Delayed)
```typescript
await notificationService.notify(
    userId,
    'John Doe',
    {
        type: 'new_message',
        metadata: {
            messageId: 'msg_123',
            messagePreview: 'Hi! I would love to connect!',
            senderName: 'John Doe',
        }
    }
);
```
**Expected Result:**
- ✅ In-app notification created immediately
- 📱 Notification stored in database
- 📧 Email sent after 5 minutes (if notification still unread)
- ⏱️ Delivery: 5 minutes after creation

---

### Test 4: Application Status Update (Delayed)
```typescript
await notificationService.notify(
    userId,
    'Solvit Africa Training Center',
    {
        type: 'application_status',
        metadata: {
            applicationId: 'app_123',
            jobTitle: 'Senior Software Engineer',
            status: 'Under Review',
            companyName: 'Solvit Africa Training Center',
        }
    }
);
```
**Expected Result:**
- ✅ In-app notification created
- 📧 Subject: "Your application status: Under Review"
- ⏱️ Email delivery: 5 minutes after creation

---

### Test 5: Job Alert (Delayed)
```typescript
await notificationService.notify(
    userId,
    'Job Finder System',
    {
        type: 'job_alert',
        metadata: {
            jobId: 'job_123',
            jobTitle: 'Full Stack Developer',
            companyName: 'Tech Innovations Ltd',
            location: 'Kigali, Rwanda',
            salaryRange: '$2500-$4000/month',
        }
    }
);
```
**Expected Result:**
- ✅ In-app notification created
- 📧 Subject: "New job matching your profile"
- ⏱️ Email delivery: 5 minutes after creation

---

### Test 6: Job Status Update (Delayed)
```typescript
await notificationService.notify(
    userId,
    'Job Finder Admin',
    {
        type: 'job_status',
        metadata: {
            jobId: 'job_123',
            jobTitle: 'Backend Developer Position',
            result: 'Approved',
        }
    }
);
```
**Expected Result:**
- ✅ In-app notification created
- 📧 Subject: "Job Approved"
- ⏱️ Email delivery: 5 minutes after creation

---

### Test 7: Notify by Email Address
```typescript
await notificationService.notify(
    'user@example.com', // Email instead of userId
    'System',
    {
        type: 'new_message',
        metadata: {
            messageId: 'msg_123',
            messagePreview: 'Testing email resolution!',
            senderName: 'System',
        }
    }
);
```
**Expected Result:**
- ✅ Email address resolved to userId
- ✅ Notification created for correct user
- 📧 Email sent to correct address

---

### Test 8: Custom Notification
```typescript
await notificationService.notify(
    userId,
    'Custom Sender',
    {
        type: 'custom',
        title: 'Custom Notification',
        message: 'This is a custom message',
        metadata: {
            customField: 'customValue',
        }
    }
);
```
**Expected Result:**
- ✅ Custom notification created
- ✅ Custom title and message used
- ✅ Metadata preserved

---

### Test 9: Daily Digest Mode
```typescript
// Enable daily digest
await NotificationPreference.update(
    { dailyDigest: true },
    { where: { userId } }
);

await notificationService.notify(
    userId,
    'Sender',
    {
        type: 'new_message',
        metadata: { /* ... */ }
    }
);
```
**Expected Result:**
- ✅ Notification created
- 📧 Email NOT sent immediately
- 📧 Email added to daily digest queue
- ⏱️ Email sent once per day (in batch)

---

### Test 10: Email Disabled
```typescript
// Disable email notifications
await NotificationPreference.update(
    { emailEnabled: false },
    { where: { userId } }
);

await notificationService.notify(
    userId,
    'Sender',
    {
        type: 'new_message',
        metadata: { /* ... */ }
    }
);
```
**Expected Result:**
- ✅ In-app notification created
- ❌ NO email sent
- ✅ User preferences respected

---

## 📊 How to Verify Results

### 1. Check Email Inbox
- **Immediate emails**: Check within 30 seconds
- **Delayed emails**: Check exactly 5 minutes after test
- **Check spam folder** if emails not in inbox

### 2. Check Database
```sql
-- View all notifications
SELECT * FROM notifications ORDER BY "createdAt" DESC LIMIT 10;

-- View user preferences
SELECT * FROM notification_preferences WHERE "userId" = 1;

-- Check unread notifications
SELECT * FROM notifications WHERE "isRead" = false;
```

### 3. Check Server Console
Look for these log messages:
```
✅ Immediate email queued for user 1: welcome
✅ In-app notification created for user 1: new_message (email will be sent in 5 minutes if unread)
Processing email job: welcome to user@example.com
Email sent successfully to user@example.com
```

### 4. Check Redis Queue (Optional)
```bash
# Connect to Redis CLI
redis-cli

# Check queue status
LLEN bull:email-queue:wait
LLEN bull:email-queue:active
LLEN bull:email-queue:completed
```

---

## 🎯 Expected Email Timeline

| Time | Event |
|------|-------|
| T+0s | Test script starts |
| T+30s | Welcome email arrives |
| T+30s | Verification email arrives |
| T+5m | New message email arrives |
| T+5m | Application status email arrives |
| T+5m | Job alert email arrives |
| T+5m | Job status email arrives |

---

## 🔧 Troubleshooting

### Problem: No emails received
**Solutions:**
1. Check `.env` file has correct email credentials
2. Verify Redis is running
3. Check server console for errors
4. Verify email preferences are enabled
5. Check spam/junk folder

### Problem: Delayed emails not arriving
**Solutions:**
1. Verify Redis is running (required for queue)
2. Check if notification was marked as read
3. Wait full 5 minutes
4. Check server console for queue processing logs

### Problem: "User not found" error
**Solutions:**
1. Verify user exists in database
2. Check userId is correct
3. If using email, verify email exists in database

### Problem: TypeScript errors
**Solutions:**
1. Run `npm install` to install dependencies
2. Verify `tsconfig.json` is configured correctly
3. Use `npx ts-node` instead of `ts-node`

---

## 📝 Test Results Interpretation

### Success Indicators
- ✅ `success: true` in result object
- ✅ `emailQueued: true` for email notifications
- ✅ `notificationId` present for in-app notifications
- ✅ Server console shows "Email sent successfully"

### Failure Indicators
- ❌ `success: false` in result object
- ❌ Error messages in console
- ❌ No email received after expected time
- ❌ Redis connection errors

---

## 🎨 Notification Types Reference

| Type | Email Timing | In-App | Subject Template |
|------|-------------|--------|------------------|
| `welcome` | Immediate | No | "Welcome to Job Finder" |
| `verification` | Immediate | No | "Verify your email address" |
| `new_message` | 5 min delay | Yes | "You have a new message from {sender}" |
| `application_status` | 5 min delay | Yes | "Your application status: {status}" |
| `job_alert` | 5 min delay | Yes | "New job matching your profile" |
| `job_status` | 5 min delay | Yes | "Job {result}" |
| `custom` | 5 min delay | Yes | Custom title |

---

## 🔐 User Preferences

### Default Preferences
```typescript
{
    emailEnabled: true,      // Send emails
    pushEnabled: true,       // Send push notifications
    smsEnabled: false,       // Send SMS (not implemented)
    dailyDigest: false,      // Batch emails daily
}
```

### Preference Behavior

| Setting | Effect |
|---------|--------|
| `emailEnabled: true` | Emails sent normally |
| `emailEnabled: false` | No emails sent (in-app only) |
| `dailyDigest: true` | Emails batched once per day |
| `dailyDigest: false` | Emails sent individually |

---

## 🚀 Integration Examples

### Example 1: Send Welcome Email After Registration
```typescript
// In auth.service.ts
async register(data: any) {
    const user = await SampleUser.create({ /* ... */ });
    
    // Send welcome email
    await notificationService.notify(
        user.id,
        'Job Finder Team',
        { type: 'welcome' }
    );
    
    return user;
}
```

### Example 2: Notify User of New Message
```typescript
// In message.controller.ts
async sendMessage(req, res) {
    const message = await Message.create({ /* ... */ });
    
    // Notify recipient
    await notificationService.notify(
        message.recipientId,
        message.senderName,
        {
            type: 'new_message',
            metadata: {
                messageId: message.id,
                messagePreview: message.content.substring(0, 100),
                senderName: message.senderName,
            }
        }
    );
    
    res.json(message);
}
```

### Example 3: Notify User of Application Status Change
```typescript
// In application.service.ts
async updateStatus(applicationId: number, status: string) {
    const application = await Application.findByPk(applicationId);
    await application.update({ status });
    
    // Notify applicant
    await notificationService.notify(
        application.userId,
        application.companyName,
        {
            type: 'application_status',
            metadata: {
                applicationId: application.id,
                jobTitle: application.jobTitle,
                status: status,
                companyName: application.companyName,
            }
        }
    );
}
```

---

## 📚 Additional Resources

### Files to Review
- `src/services/notification.service.ts` - Main notification service
- `src/services/notifications/notification-creator.ts` - Notification creation
- `src/services/notifications/notification-email.ts` - Email handling
- `src/services/notifications/notification-processor.ts` - Queue processing
- `src/services/queue.service.ts` - Email queue management

### Database Tables
- `notifications` - In-app notifications
- `notification_preferences` - User preferences
- `sample_users` - User accounts

---

## ✅ Success Criteria

Your notification system is working correctly if:

1. ✅ Welcome emails arrive within 30 seconds
2. ✅ Verification emails arrive within 30 seconds
3. ✅ Delayed emails arrive exactly 5 minutes after creation
4. ✅ In-app notifications are created in database
5. ✅ User preferences are respected
6. ✅ Email address resolution works
7. ✅ Daily digest mode works
8. ✅ Email enable/disable toggle works
9. ✅ All email templates render correctly
10. ✅ No errors in server console

---

## 🎉 Conclusion

This comprehensive test suite validates that:
- ✅ The `notify()` function works for all scenarios
- ✅ Emails are sent correctly (immediate and delayed)
- ✅ User preferences are respected
- ✅ The system can handle any notification type
- ✅ Everything works without requiring specific endpoints

**You can now confidently use the notification system anywhere in your application!**
