const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors({
  origin:"*",
  credentials : true,
}))


app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vaibsProtfolio1998@gmail.com', // Replace with your email
      pass: 'jeqw zctx vhqw wlhd' // Replace with your email password
    }
  });

  const mailOptions = {
    from: email,
    to: 'vaibsProtfolio1998@gmail.com', // Replace with the owner's email
    subject: `Message from ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: 'Error sending email.' });
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).json({ message: 'Mail sent successfully' });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
