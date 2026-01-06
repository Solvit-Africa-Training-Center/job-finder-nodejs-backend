/**
 * Comprehensive Notification System Test
 * Tests ALL notification types using the notify() function directly
 * No endpoints required - works standalone
 */

import { NotificationService } from './src/services/notification.service';
import { SampleUser } from './src/database/models/sampleuser';
import { NotificationPreference } from './src/database/models/notificationPreference.model';
import { Notification } from './src/database/models/notification.model';
import { sequelize } from './src/database';

const notificationService = new NotificationService();

// Test configuration
const TEST_EMAIL = 'innocentntakir@gmail.com';
let testUserId: number;

// Color codes for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    red: '\x1b[31m',
};

function log(message: string, color: string = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
}

function header(message: string) {
    log(`\n${'='.repeat(60)}`, colors.cyan);
    log(message, colors.bright + colors.cyan);
    log('='.repeat(60), colors.cyan);
}

function section(message: string) {
    log(`\n${message}`, colors.magenta);
    log('-'.repeat(60), colors.magenta);
}

async function setupTestUser() {
    header('SETUP: Creating Test User');

    // Find or create test user
    let user = await SampleUser.findOne({ where: { email: TEST_EMAIL } });

    if (!user) {
        user = await SampleUser.create({
            email: TEST_EMAIL,
            password: 'test123',
        });
        log(`✅ Created new test user: ${TEST_EMAIL}`, colors.green);
    } else {
        log(`✅ Using existing test user: ${TEST_EMAIL}`, colors.green);
    }

    testUserId = user.id;

    // Setup notification preferences
    let prefs = await NotificationPreference.findOne({ where: { userId: testUserId } });

    if (!prefs) {
        prefs = await NotificationPreference.create({
            userId: testUserId,
            emailEnabled: true,
            pushEnabled: true,
            smsEnabled: false,
            dailyDigest: false,
        });
        log('✅ Created notification preferences (emails enabled)', colors.green);
    } else {
        // Update to ensure emails are enabled
        await prefs.update({
            emailEnabled: true,
            dailyDigest: false,
        });
        log('✅ Updated notification preferences (emails enabled)', colors.green);
    }

    log(`\nTest User ID: ${testUserId}`, colors.yellow);
}

async function testWelcomeNotification() {
    section('TEST 1: Welcome Email (Immediate)');

    const result = await notificationService.notify(
        testUserId,
        'Job Finder Team',
        {
            type: 'welcome',
            metadata: {
                userName: 'Test User',
            }
        }
    );

    log(`Result: ${JSON.stringify(result, null, 2)}`, colors.blue);

    if (result.success && result.emailQueued) {
        log('✅ PASS: Welcome email queued successfully', colors.green);
        log('📧 Check your inbox for: "Welcome to Job Finder"', colors.yellow);
    } else {
        log('❌ FAIL: Welcome email not queued', colors.red);
    }
}

async function testVerificationNotification() {
    section('TEST 2: Verification Email (Immediate)');

    const verificationCode = 'TEST' + Math.floor(Math.random() * 10000);

    const result = await notificationService.notify(
        testUserId,
        'Job Finder Security',
        {
            type: 'verification',
            metadata: {
                verificationCode,
            }
        }
    );

    log(`Result: ${JSON.stringify(result, null, 2)}`, colors.blue);

    if (result.success && result.emailQueued) {
        log('✅ PASS: Verification email queued successfully', colors.green);
        log(`📧 Check your inbox for verification code: ${verificationCode}`, colors.yellow);
    } else {
        log('❌ FAIL: Verification email not queued', colors.red);
    }
}

async function testNewMessageNotification() {
    section('TEST 3: New Message Notification (Delayed 5 min)');

    const result = await notificationService.notify(
        testUserId,
        'John Doe',
        {
            type: 'new_message',
            metadata: {
                messageId: 'msg_' + Date.now(),
                messagePreview: 'Hi! I saw your profile and would love to connect!',
                senderName: 'John Doe',
            }
        }
    );

    log(`Result: ${JSON.stringify(result, null, 2)}`, colors.blue);

    if (result.success && result.notificationId) {
        log('✅ PASS: In-app notification created', colors.green);
        log(`📱 Notification ID: ${result.notificationId}`, colors.yellow);

        if (result.emailQueued) {
            log('📧 Email will be sent in 5 minutes if notification remains unread', colors.yellow);
        }
    } else {
        log('❌ FAIL: Notification creation failed', colors.red);
    }
}

async function testApplicationStatusNotification() {
    section('TEST 4: Application Status Update (Delayed 5 min)');

    const result = await notificationService.notify(
        testUserId,
        'Solvit Africa Training Center',
        {
            type: 'application_status',
            metadata: {
                applicationId: 'app_' + Date.now(),
                jobTitle: 'Senior Software Engineer',
                status: 'Under Review',
                companyName: 'Solvit Africa Training Center',
            }
        }
    );

    log(`Result: ${JSON.stringify(result, null, 2)}`, colors.blue);

    if (result.success && result.notificationId) {
        log('✅ PASS: Application status notification created', colors.green);
        log(`📱 Notification ID: ${result.notificationId}`, colors.yellow);

        if (result.emailQueued) {
            log('📧 Email will be sent in 5 minutes if notification remains unread', colors.yellow);
        }
    } else {
        log('❌ FAIL: Notification creation failed', colors.red);
    }
}

async function testJobAlertNotification() {
    section('TEST 5: Job Alert Notification (Delayed 5 min)');

    const result = await notificationService.notify(
        testUserId,
        'Job Finder System',
        {
            type: 'job_alert',
            metadata: {
                jobId: 'job_' + Date.now(),
                jobTitle: 'Full Stack Developer',
                companyName: 'Tech Innovations Ltd',
                location: 'Kigali, Rwanda',
                salaryRange: '$2500-$4000/month',
            }
        }
    );

    log(`Result: ${JSON.stringify(result, null, 2)}`, colors.blue);

    if (result.success && result.notificationId) {
        log('✅ PASS: Job alert notification created', colors.green);
        log(`📱 Notification ID: ${result.notificationId}`, colors.yellow);

        if (result.emailQueued) {
            log('📧 Email will be sent in 5 minutes if notification remains unread', colors.yellow);
        }
    } else {
        log('❌ FAIL: Notification creation failed', colors.red);
    }
}

async function testJobStatusNotification() {
    section('TEST 6: Job Status Update (Delayed 5 min)');

    const result = await notificationService.notify(
        testUserId,
        'Job Finder Admin',
        {
            type: 'job_status',
            metadata: {
                jobId: 'job_' + Date.now(),
                jobTitle: 'Backend Developer Position',
                result: 'Approved',
            }
        }
    );

    log(`Result: ${JSON.stringify(result, null, 2)}`, colors.blue);

    if (result.success && result.notificationId) {
        log('✅ PASS: Job status notification created', colors.green);
        log(`📱 Notification ID: ${result.notificationId}`, colors.yellow);

        if (result.emailQueued) {
            log('📧 Email will be sent in 5 minutes if notification remains unread', colors.yellow);
        }
    } else {
        log('❌ FAIL: Notification creation failed', colors.red);
    }
}

async function testEmailByAddress() {
    section('TEST 7: Notify by Email Address (instead of userId)');

    const result = await notificationService.notify(
        TEST_EMAIL, // Using email instead of userId
        'System Test',
        {
            type: 'new_message',
            metadata: {
                messageId: 'msg_email_test',
                messagePreview: 'Testing notification by email address!',
                senderName: 'System Test',
            }
        }
    );

    log(`Result: ${JSON.stringify(result, null, 2)}`, colors.blue);

    if (result.success && result.userId === testUserId) {
        log('✅ PASS: Email address correctly resolved to userId', colors.green);
        log(`📱 Resolved to User ID: ${result.userId}`, colors.yellow);
    } else {
        log('❌ FAIL: Email address resolution failed', colors.red);
    }
}

async function testCustomNotification() {
    section('TEST 8: Custom Notification Type');

    const result = await notificationService.notify(
        testUserId,
        'Custom Sender',
        {
            type: 'custom',
            title: 'Custom Test Notification',
            message: 'This is a custom notification message for testing',
            metadata: {
                customField1: 'value1',
                customField2: 'value2',
            }
        }
    );

    log(`Result: ${JSON.stringify(result, null, 2)}`, colors.blue);

    if (result.success) {
        log('✅ PASS: Custom notification created', colors.green);
    } else {
        log('❌ FAIL: Custom notification failed', colors.red);
    }
}

async function testDailyDigestMode() {
    section('TEST 9: Daily Digest Mode');

    // Enable daily digest
    await NotificationPreference.update(
        { dailyDigest: true },
        { where: { userId: testUserId } }
    );

    log('📋 Enabled daily digest mode', colors.yellow);

    const result = await notificationService.notify(
        testUserId,
        'Digest Test',
        {
            type: 'new_message',
            metadata: {
                messageId: 'msg_digest_test',
                messagePreview: 'This should go to daily digest',
                senderName: 'Digest Test',
            }
        }
    );

    log(`Result: ${JSON.stringify(result, null, 2)}`, colors.blue);

    if (result.success && result.preferences.dailyDigest) {
        log('✅ PASS: Notification added to daily digest queue', colors.green);
        log('📧 Email will be sent in daily digest (not immediately)', colors.yellow);
    } else {
        log('❌ FAIL: Daily digest mode not working', colors.red);
    }

    // Restore normal mode
    await NotificationPreference.update(
        { dailyDigest: false },
        { where: { userId: testUserId } }
    );

    log('📋 Restored normal notification mode', colors.yellow);
}

async function testEmailDisabled() {
    section('TEST 10: Email Notifications Disabled');

    // Disable email notifications
    await NotificationPreference.update(
        { emailEnabled: false },
        { where: { userId: testUserId } }
    );

    log('📋 Disabled email notifications', colors.yellow);

    const result = await notificationService.notify(
        testUserId,
        'No Email Test',
        {
            type: 'new_message',
            metadata: {
                messageId: 'msg_no_email',
                messagePreview: 'This should NOT trigger an email',
                senderName: 'No Email Test',
            }
        }
    );

    log(`Result: ${JSON.stringify(result, null, 2)}`, colors.blue);

    if (result.success && !result.emailQueued) {
        log('✅ PASS: In-app notification created without email', colors.green);
        log('📧 No email will be sent (as expected)', colors.yellow);
    } else {
        log('❌ FAIL: Email was queued despite being disabled', colors.red);
    }

    // Re-enable email notifications
    await NotificationPreference.update(
        { emailEnabled: true },
        { where: { userId: testUserId } }
    );

    log('📋 Re-enabled email notifications', colors.yellow);
}

async function displaySummary() {
    header('TEST SUMMARY');

    // Get all notifications for test user
    const notifications = await Notification.findAll({
        where: { userId: testUserId },
        order: [['createdAt', 'DESC']],
        limit: 10,
    });

    log(`\nTotal notifications created: ${notifications.length}`, colors.yellow);

    log('\nRecent notifications:', colors.cyan);
    notifications.forEach((notif, index) => {
        log(`  ${index + 1}. [${notif.type}] ${notif.title}`, colors.blue);
        log(`     Created: ${notif.createdAt}`, colors.blue);
        log(`     Read: ${notif.isRead ? 'Yes' : 'No'}`, colors.blue);
    });

    header('WHAT TO CHECK');

    log('\n📧 IMMEDIATE EMAILS (check inbox now):', colors.green);
    log('   1. Welcome to Job Finder', colors.white);
    log('   2. Verify your email address', colors.white);

    log('\n⏰ DELAYED EMAILS (check inbox in 5 minutes):', colors.cyan);
    log('   3. New message from John Doe', colors.white);
    log('   4. Application status update', colors.white);
    log('   5. New job alert', colors.white);
    log('   6. Job status update', colors.white);
    log('   7. New message (email address test)', colors.white);

    log('\n💡 TIPS:', colors.yellow);
    log('   • Check spam/junk folder if emails not in inbox', colors.white);
    log('   • Immediate emails arrive within 30 seconds', colors.white);
    log('   • Delayed emails arrive exactly after 5 minutes', colors.white);
    log('   • Watch server console for "Email sent" confirmations', colors.white);

    const delayedTime = new Date(Date.now() + 5 * 60 * 1000);
    log(`\n⏰ Delayed emails will arrive at: ${delayedTime.toLocaleTimeString()}`, colors.magenta);

    log(`\n📊 Database Query to Check Notifications:`, colors.yellow);
    log(`   SELECT * FROM notifications WHERE "userId" = ${testUserId} ORDER BY "createdAt" DESC;`, colors.white);
}

async function runAllTests() {
    try {
        // Connect to database
        await sequelize.authenticate();
        log('✅ Database connected', colors.green);

        // Setup
        await setupTestUser();

        // Run all tests
        await testWelcomeNotification();
        await new Promise(resolve => setTimeout(resolve, 1000));

        await testVerificationNotification();
        await new Promise(resolve => setTimeout(resolve, 1000));

        await testNewMessageNotification();
        await new Promise(resolve => setTimeout(resolve, 1000));

        await testApplicationStatusNotification();
        await new Promise(resolve => setTimeout(resolve, 1000));

        await testJobAlertNotification();
        await new Promise(resolve => setTimeout(resolve, 1000));

        await testJobStatusNotification();
        await new Promise(resolve => setTimeout(resolve, 1000));

        await testEmailByAddress();
        await new Promise(resolve => setTimeout(resolve, 1000));

        await testCustomNotification();
        await new Promise(resolve => setTimeout(resolve, 1000));

        await testDailyDigestMode();
        await new Promise(resolve => setTimeout(resolve, 1000));

        await testEmailDisabled();
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Display summary
        await displaySummary();

        header('ALL TESTS COMPLETED! ✅');

    } catch (error: any) {
        log(`\n❌ ERROR: ${error.message}`, colors.red);
        console.error(error);
    } finally {
        // Keep process alive for a bit to see results
        setTimeout(() => {
            log('\n👋 Test script completed. Press Ctrl+C to exit.', colors.cyan);
        }, 2000);
    }
}

// Run tests
runAllTests();
