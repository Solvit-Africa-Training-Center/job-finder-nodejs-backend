/**
 * CLI Tool to send notifications manually from the terminal
 * Usage: npx ts-node send-notification.ts <userId> <type> [message]
 */

import { NotificationService } from './src/services/notification.service';
import { SampleUser } from './src/database/models/sampleuser';
import { connectToDb } from './src/database';

const notificationService = new NotificationService();

async function main() {
    // Initialize Database Connection
    try {
        await connectToDb();
        console.log('✅ Database initialized for CLI tool');
    } catch (err) {
        console.error('❌ Failed to connect to database:', err);
        process.exit(1);
    }

    const args = process.argv.slice(2);

    if (args.length < 2) {
        console.log('\n❌ Usage: npx ts-node send-notification.ts <userId> <type> [message]');
        console.log('\nExamples:');
        console.log('  npx ts-node send-notification.ts 1 welcome');
        console.log('  npx ts-node send-notification.ts 1 verification');
        console.log('  npx ts-node send-notification.ts 1 new_message "Hello there!"');
        console.log('  npx ts-node send-notification.ts 1 job_alert "New Job Found"');
        process.exit(1);
    }

    const recipientArg = args[0];
    const type = args[1];
    const message = args[2] || 'Manual test notification from terminal';

    console.log(`\n🚀 Sending '${type}' notification to Recipient: ${recipientArg}...`);

    try {
        // Resolve Recipient (ID or Email)
        let user;
        let userId: any;

        if (recipientArg.includes('@')) {
            // It's an email
            user = await SampleUser.findOne({ where: { email: recipientArg } });
            if (!user) {
                console.log(`⚠️ User with email '${recipientArg}' not found. Creating new user...`);
                user = await SampleUser.create({
                    email: recipientArg,
                    password: 'test_password_123', // Default password for test users
                });
                console.log(`✅ Created new user with ID: ${user.id}`);
            }
            userId = user.id;
        } else {
            // It's an ID
            userId = parseInt(recipientArg);
            if (isNaN(userId)) {
                console.error(`❌ Invalid ID or Email: ${recipientArg}`);
                process.exit(1);
            }
            user = await SampleUser.findByPk(userId);
            if (!user) {
                console.error(`❌ User with ID ${userId} not found!`);
                process.exit(1);
            }
        }

        console.log(`   ✅ Found User: ${user.email} (ID: ${user.id})`);

        // Prepare metadata based on type
        const metadata: any = {
            manual: true,
            senderName: 'Terminal CLI',
        };

        if (type === 'new_message') {
            metadata.messageId = 'cli_' + Date.now();
            metadata.messagePreview = message;
        } else if (type === 'job_alert') {
            metadata.jobId = 'cli_' + Date.now();
            metadata.jobTitle = message;
            metadata.companyName = 'CLI Test Company';
        }

        const result = await notificationService.notify(
            userId,
            'Terminal CLI',
            {
                type: type,
                message: message, // Used if type is custom
                metadata: metadata
            }
        );

        if (result.success) {
            console.log('✅ Notification Sent Successfully!');
            console.log('-----------------------------------');
            console.log(`📱 In-App:   ${result.notificationId ? 'Created' : 'Skipped'}`);
            console.log(`📧 Email:    ${result.emailQueued ? 'Queued (Check Inbox)' : 'Skipped/Disabled'}`);
            console.log('-----------------------------------');
        } else {
            console.error('❌ Failed:', result.error);
        }

    } catch (error: any) {
        console.error('❌ Error:', error.message);
    } finally {
        // Force exit after a moment to allow logs to flush
        setTimeout(() => process.exit(0), 1000);
    }
}

main();
