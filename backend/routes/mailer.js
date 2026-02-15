const nodemailer = require("nodemailer");
require("dotenv").config();

const { Client, Lawyer, Judge } = require("./users");

// ---------------------- TRANSPORTER ----------------------

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify transporter on startup
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Email transporter error:", error);
  } else {
    console.log("✅ Email server ready to send messages");
  }
});

// ---------------------- SEND OTP ----------------------

const sendverificationcode = async (email, otp) => {
  try {
    console.log("📨 Sending OTP to:", email);

    await transporter.sendMail({
      from: `"Judgemental Verification" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Verification Code",
      html: `
        <h2>OTP Verification</h2>
        <p>Your verification code is:</p>
        <h1>${otp}</h1>
        <p>This code will expire soon.</p>
      `
    });

    console.log("✅ OTP sent successfully");
  } catch (error) {
    console.error("❌ Error sending OTP:", error);
  }
};

// ---------------------- WELCOME EMAIL ----------------------

const sendWelcomeEmail = async (email, name) => {
  try {
    await transporter.sendMail({
      from: `"Judgemental Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Judgemental",
      html: `
        <h2>Welcome, ${name} 👋</h2>
        <p>Your account has been successfully verified.</p>
      `
    });

    console.log("✅ Welcome email sent");
  } catch (error) {
    console.error("❌ Error sending welcome email:", error);
  }
};

// ---------------------- VERIFY CLIENT ----------------------

const verifyemailclient = async (email, otp) => {
  try {
    const user = await Client.findOne({ email });

    if (!user) return { success: false, message: "Email not registered" };

    if (user.otp !== otp)
      return { success: false, message: "OTP does not match" };

    user.isverified = true;
    user.otp = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal server error" };
  }
};

// ---------------------- VERIFY LAWYER ----------------------

const verifyemaillawyer = async (email, otp) => {
  try {
    const user = await Lawyer.findOne({ email });

    if (!user) return { success: false, message: "Email not registered" };

    if (user.otp !== otp)
      return { success: false, message: "OTP does not match" };

    user.isverified = true;
    user.otp = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal server error" };
  }
};

// ---------------------- VERIFY JUDGE ----------------------

const verifyemailjudge = async (email, otp) => {
  try {
    const user = await Judge.findOne({ email });

    if (!user) return { success: false, message: "Email not registered" };

    if (user.otp !== otp)
      return { success: false, message: "OTP does not match" };

    user.isverified = true;
    user.otp = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal server error" };
  }
};

module.exports = {
  sendverificationcode,
  verifyemailclient,
  verifyemaillawyer,
  verifyemailjudge
};
