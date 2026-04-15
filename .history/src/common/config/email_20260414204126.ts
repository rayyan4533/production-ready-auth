import nodemailer from "nodemailer";

// The transporter is your "email sending machine"
// It connects to an SMTP server (like Mailtrap for dev, Gmail for prod)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// This is the private base function. It sends any email.
// to      → recipient's email address
// subject → email subject line
// html    → the email body as HTML
const sendEmail = async (to: string, subject: string, html: string): Promise<void> => {
  await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    to,
    subject,
    html,
  });
};

// This wraps sendEmail for verification specifically.
// token → this is the RAW token we generate in authService, NOT the hashed one!
export const sendVerificationEmail = async (email: string, token: string): Promise<void> => {
  const url = `${process.env.CLIENT_URL}/verify-email/${token}`;
  await sendEmail(
    email,
    "Verify your email",
    `<h2>Welcome!</h2><p>Click <a href="${url}">here</a> to verify your email.</p>`
  );
};

// This wraps sendEmail for password reset specifically.
// token → again the RAW token. The user clicks the link which sends it to our API, 
// and then the API hashes it to compare against the DB.
export const sendResetPasswordEmail = async (email: string, token: string): Promise<void> => {
  const url = `${process.env.CLIENT_URL}/reset-password/${token}`;
  await sendEmail(
    email,
    "Reset your password",
    `<h2>Password Reset</h2><p>Click <a href="${url}">here</a> to reset your password. This link expires in 15 minutes.</p>`
  );
};
