# 🔔 Notification System Testing Guide

This guide explains how to test the notification system using the generated testing endpoints.

## 📋 Prerequisites

1.  **Server Running**: Ensure your backend server is running.
    ```bash
    npm run dev
    ```
2.  **API Prefix**: Confirm your `PREFIX` in `.env` (default is usually `/api/v1`).
3.  **User ID**: You need a valid User ID from your database to receive notifications.

---

## 🚀 Testing with Endpoints

We have generated specific endpoints for testing notifications without needing real system events.

### 1. Send specific Test Notification
**Endpoint**: `POST /api/v1/notifications/test`

**Body Parameters**:
- `userId` (number) or `email` (string): Recipient
- `type` (string): Notification type (e.g., `new_message`, `job_alert`, `welcome`, `verification`, `application_status`)
- `...content`: Any other data specific to the notification type.

#### Examples (cURL)

**Test "New Message" Notification:**
```bash
curl -X POST http://localhost:3000/api/v1/notifications/test \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "type": "new_message",
    "metadata": {
        "senderName": "Alice Recruiter",
        "messageId": 101,
        "messagePreview": "Hi, are you clear for an interview?"
    }
  }'
```

**Test "Job Alert" Notification:**
```bash
curl -X POST http://localhost:3000/api/v1/notifications/test \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "type": "job_alert",
    "metadata": {
        "jobTitle": "Senior Backend Developer",
        "jobId": 55
    }
  }'
```

**Test "Welcome" Email:**
```bash
curl -X POST http://localhost:3000/api/v1/notifications/test \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "type": "welcome"
  }'
```

---

### 2. Verify Notifications
**Endpoint**: `GET /api/v1/notifications/list`

Use this to see if the notification was persisted in the database.

```bash
curl http://localhost:3000/api/v1/notifications/list
```

---

## 🔍 Checking Results

1.  **Console Logs**: Check your server terminal. You should see logs like:
    *   `✅ Immediate email queued for user 1: welcome`
    *   `✅ In-app created: new_message (email delayed)`
2.  **Database**: The `list` endpoint queries the `Notification` table.
3.  **Email**: If configured, check the email inbox (or Mailtrap/Ethereal if in dev mode).

## 🛠️ Code Structure

The notification system has been refactored for modularity:
*   `src/services/notification.service.ts`: Main entry point (orchestrator).
*   `src/services/notifications/`: Contains helper modules (creator, handler, email, text-generators).
*   `src/routes/notification.routes.ts`: Defines the test endpoints.

This structure allows "everyone or everything" events to be handled by extending the `type` logic in `notification-handler.ts`.
