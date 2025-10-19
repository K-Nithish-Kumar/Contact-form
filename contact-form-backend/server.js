const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors({
  origin: [
    'https://contact-form2713.netlify.app/',
    'http://localhost:3000'
  ],
  methods: ['POST'],
  credentials: true
}));
app.use(bodyParser.json());

// Route
app.post("/send", async (req, res) => {
  const { name, email,subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
   let transporter = nodemailer.createTransport({
    service: "gmail",
     auth: {
     user: "nithish81812@gmail.com",
     pass: "oqhd bhuc ejhv uraq",
  },
  tls: {
    rejectUnauthorized: false, 
  },
});

    let mailOptions = {
      from: email,
      to: "nithish81812@gmail.com",   
      subject: `${subject}: from ${name}(${email})`,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
