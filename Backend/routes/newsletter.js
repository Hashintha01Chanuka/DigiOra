const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

// Simple in-memory storage (replace with database in production)
const subscribers = new Set();

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail", // You can use other services like SendGrid, Mailgun, etc.
    auth: {
      user: process.env.EMAIL_USER || "your-email@gmail.com",
      pass: process.env.EMAIL_PASS || "your-app-password",
    },
  });
};

// Send thank you email
const sendThankYouEmail = async (email) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER || "hello@digioramedia.com",
      to: email,
      subject: "🎉 Welcome to DigiOra Media Newsletter!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
          <div style="background: linear-gradient(135deg, #dc2626, #b91c1c); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to DigiOra Media!</h1>
            <p style="color: #f8f9fa; margin: 10px 0 0 0; font-size: 16px;">Thank you for subscribing to our newsletter</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">🎉 You're All Set!</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Thank you for joining our community! You'll now receive:
            </p>
            
            <ul style="color: #666; line-height: 1.8; margin-bottom: 25px;">
              <li>📊 Latest digital marketing insights and trends</li>
              <li>🎯 Exclusive tips to grow your business</li>
              <li>🚀 Special offers and early access to our services</li>
              <li>📈 Case studies and success stories</li>
            </ul>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <h3 style="color: #dc2626; margin: 0 0 10px 0;">What's Next?</h3>
              <p style="color: #666; margin: 0; line-height: 1.6;">
                Keep an eye on your inbox for our weekly newsletter packed with actionable insights. 
                In the meantime, feel free to explore our website or reach out if you have any questions!
              </p>
            </div>
            
            <div style="text-align: center; margin-bottom: 25px;">
              <a href="http://localhost:5173" style="background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                Visit Our Website
              </a>
            </div>
            
            <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
              <p style="color: #999; font-size: 14px; margin: 0;">
                Have questions? Reply to this email or contact us at 
                <a href="mailto:hello@digioramedia.com" style="color: #dc2626;">hello@digioramedia.com</a>
              </p>
              <p style="color: #999; font-size: 12px; margin: 15px 0 0 0;">
                You can unsubscribe at any time by clicking 
                <a href="#" style="color: #dc2626;">here</a>
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <p style="color: #999; font-size: 12px;">
              © ${new Date().getFullYear()} DigiOra Media. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Thank you email sent to: ${email}`);
    return true;
  } catch (error) {
    console.error("❌ Error sending thank you email:", error);
    return false;
  }
};

// Subscribe to newsletter
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Valid email address is required",
      });
    }

    if (subscribers.has(email)) {
      return res.status(400).json({
        success: false,
        message: "Email is already subscribed",
      });
    }

    // Add email to subscribers
    subscribers.add(email);

    // Send thank you email
    const emailSent = await sendThankYouEmail(email);

    console.log(`📧 New newsletter subscription: ${email}`);
    console.log(`📊 Total subscribers: ${subscribers.size}`);
    console.log(`📬 Thank you email sent: ${emailSent ? "Yes" : "No"}`);

    res.json({
      success: true,
      message: "Successfully subscribed to newsletter",
      data: {
        email,
        emailSent,
      },
    });
      
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to subscribe to newsletter",
    });
  }
});
     
// Get all subscribers (admin only)
router.get("/", (req, res) => {
  try {
    res.json({
      success: true,
      data: Array.from(subscribers),
      count: subscribers.size,
    });
  } catch (error) {
    console.error("Get subscribers error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get subscribers",
    });
  }
});

module.exports = router;
