import nodemailer from 'nodemailer';

console.log("GMAIL_USER:", process.env.GMAIL_USER);
console.log("GMAIL_PASS existe:", Boolean(process.env.GMAIL_PASS));

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  pool: true, 
  maxConnections: 2,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});