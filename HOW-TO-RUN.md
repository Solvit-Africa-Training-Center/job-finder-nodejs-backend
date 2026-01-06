# 🚀 How to Run Notification Commands

Here is your quick reference for running notification commands in the terminal vs. using them in your code.

## 1️⃣ Terminal Commands (Run these in PowerShell)

### ✅ Run All Automated Tests
Use this to verify the entire system is working (emails, database, queues).
```powershell
.\quick-test.ps1
```

### 🛠️ Send Manual Notification (CLI)
Use this to send a single test notification to a specific user.
**Format:** `npx ts-node send-notification.ts <UserId> <Type> [Message]`

```powershell
# Example: Send Welcome Email to User ID 1
npx ts-node send-notification.ts 1 welcome

# Example: Send Message Notification
npx ts-node send-notification.ts 1 new_message "Testing from terminal"
```

---

## 2️⃣ Code Snippets (Paste these in your .ts files)

Use these snippets inside your backend code (`src/controllers/...` or `src/services/...`), NOT in the terminal.

### 📩 Send a Welcome Email
```typescript
await notificationService.notify(
    userId,             // Recipient ID
    'Job Finder Team',  // Sender Name
    { type: 'welcome' } // Content
);
```

### 💬 Send a New Message Notification
```typescript
await notificationService.notify(
    recipientId,
    senderName,
    {
        type: 'new_message',
        metadata: {
            messageId: message.id,
            messagePreview: 'Hello there!',
            senderName: senderName
        }
    }
);
```
