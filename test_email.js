require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
    console.log('Using SMTP Host:', process.env.SMTP_HOST);
    console.log('Using SMTP User:', process.env.SMTP_USER);

    let transporter;
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    } else {
        console.log('No SMTP config found in .env, creating test Ethereal account...');
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });
    }

    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM || '"MOG Test" <noreply@mensofgod.com>',
            to: 'kevanbtc@gmail.com, kevan@unykorn.org, buckvaughan3636@gmail.com',
            subject: 'Test Email Routing',
            text: 'This is a test to verify SMTP routing works correctly.',
            html: '<b>This is a test to verify SMTP routing works correctly.</b>'
        });

        console.log('Message sent: %s', info.messageId);
        const previewUrl = nodemailer.getTestMessageUrl(info);
        if (previewUrl) {
            console.log('Preview URL (Ethereal): %s', previewUrl);
        } else {
            console.log('Email sent directly to SMTP server (real inbox).');
        }
    } catch (err) {
        console.error('Failed to send email:', err);
    }
}

testEmail();
