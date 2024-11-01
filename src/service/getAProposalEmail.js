const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');

const sendProposalEmail = async (recipientEmail) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `Softmark Solutions <${process.env.SALES_EMAIL}>`, 
            to: recipientEmail,
            subject: "Your Customized Proposal is Ready",
            html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; color: #333; border: 1px solid #ddd; border-radius: 8px; max-width: 600px; margin: auto;">
                
                <!-- Company Logo -->
                <div style="text-align: center; margin-bottom: 20px;">
                    <img src="https://s.rozee.pk/company_logos/00/34362578003607.png" alt="Company Logo" style="max-width: 150px; height: auto;">
                </div>
                
                <!-- Greeting and Introduction -->
                <h2 style="color: #333;">Hello,</h2>
                <p style="line-height: 1.6;">
                    Thank you for considering Softmark Solutions for your project. We’re excited about the opportunity to collaborate with you and are pleased to present a proposal that addresses your unique needs and goals.
                </p>
                <p style="line-height: 1.6;">
                    Our proposal includes tailored solutions designed to ensure your success. Please review the details, and let us know if there’s anything you’d like to discuss further.
                </p>

                <!-- Proposal Link Button -->
                <div style="text-align: center; margin: 30px 0;">
                    <a href="https://drive.google.com/your-proposal-link" 
                       style="background-color: #1080a1; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                       View Your Proposal
                    </a>
                </div>

                <!-- Additional Info and Contact -->
                <p style="line-height: 1.6;">
                    If you have any questions or need further assistance, please don’t hesitate to reach out. We’re here to provide the support you need and are looking forward to helping you bring your vision to life.
                </p>
                
                <!-- Closing and Signature -->
                <p style="margin-top: 30px; font-size: 1.1em; color: #555;">Warm Regards,</p>
                <p style="font-weight: bold; color: #333;">The Softmark Solutions Team</p>

                <!-- Contact Information -->
                <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                <div style="text-align: center; font-size: 0.9em; color: #777;">
                    <p>SoftMark Solutions | 30 N Gould St R, Sheridan, WY 82801 | +1 (646) 535-6323 | admin@softmarksolutions.com</p>
                    <p><a href="https://softmarksolutions.com" style="color: #4CAF50; text-decoration: none;">Visit Our Website</a></p>
                </div>
            </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.info("Proposal email sent to:", recipientEmail);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

module.exports = sendProposalEmail;
