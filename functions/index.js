const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Konfigurasi email (gunakan Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_EMAIL, // Akan diatur melalui environment variables
        pass: process.env.GMAIL_PASSWORD // Akan diatur melalui environment variables
    }
});

exports.sendFeedbackEmail = functions.firestore
    .document('feedback/{feedbackId}')
    .onCreate(async (snap, context) => {
        try {
            const feedbackData = snap.data();
            
            // Template email
            const mailOptions = {
                from: process.env.GMAIL_EMAIL,
                to: feedbackData.to, // Email tujuan dari data feedback
                subject: `[Feedback Baru] ${feedbackData.type} dari ${feedbackData.name}`,
                html: `
                    <h2>Feedback Baru Diterima</h2>
                    <p><strong>Dari:</strong> ${feedbackData.name}</p>
                    <p><strong>Email:</strong> ${feedbackData.email}</p>
                    <p><strong>Jenis Feedback:</strong> ${feedbackData.type}</p>
                    <p><strong>Waktu:</strong> ${new Date(feedbackData.timestamp).toLocaleString('id-ID')}</p>
                    <p><strong>Pesan:</strong></p>
                    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
                        ${feedbackData.message}
                    </div>
                    <hr>
                    <p style="color: #666; font-size: 12px;">
                        Email ini dikirim secara otomatis dari Aplikasi Analisis Gaya Belajar.
                    </p>
                `
            };

            // Kirim email
            await transporter.sendMail(mailOptions);
            
            // Update status di dokumen feedback
            await snap.ref.update({
                emailSent: true,
                emailSentAt: admin.firestore.FieldValue.serverTimestamp()
            });

            return null;
        } catch (error) {
            console.error('Error sending email:', error);
            
            // Update status error di dokumen feedback
            await snap.ref.update({
                emailError: error.message,
                emailSent: false
            });
            
            return null;
        }
    }); 