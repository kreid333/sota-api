const nodemailer = require("nodemailer");
const router = require("express").Router();
const db = require("../models");
require("dotenv").config();

// SENDING EMAIL THROUGH CONTACT FORM
router.post("/api/sendMail", (req, res) => {
  console.log(req.body);
  const output = `
      <div class="main" style="width: 65%; margin: 0 auto; background-color: white; text-align: center; font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">
      <h1>Thank you for contacting us</h1>
      <h3>Hi ${req.body.name},</h3>
      <p>We have received your contact form submission and will be getting back to you within the next 48 hours.</p>
      <div style="background-color: rgb(245, 245, 245); padding: 20px;">
        <ul style="padding: 0px;">
          <li style="list-style: none; margin: 15px;">Name: ${req.body.name}</li>
          <li style="list-style: none; margin: 15px;">Email Address: ${req.body.email}</li>
          <li style="list-style: none; margin: 15px;">Phone Number: ${req.body.phoneNumber}</li>
          <li style="list-style: none; margin: 15px;">Message: ${req.body.message}</li>
        </ul>
      </div>
      </div>
    `;

  const maillist = [req.body.email, "sales@sotadecor.com"];

  const sendMail = async () => {
    try {
      // create reusable transporter object using the default SMTP transport
      var transporter = nodemailer.createTransport({
        host: "mail.sotadecor.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "sales@sotadecor.com", // generated ethereal user
          pass: process.env.PASSWORD, // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      // send mail with defined transport object
      var info = await transporter.sendMail({
        from: '"SOTA Window Coverings" <stephenw@sotadecor.com>', // sender address
        to: maillist, // list of receivers
        subject: "Thank you for contacting SOTA Window Coverings", // Subject line
        // text: "Hello world?", // plain text body
        html: output, // html body
      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      res.end();
    } catch (err) {
      console.log(transporter, info);
      console.log(err);
    }
  };
  sendMail();
});

// CREATING A REVIEW IN DATABASE
router.post("/api/sendReview", (req, res) => {
  console.log(req.body);
  db.Review.create(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

// GETTING ALL REVIEWS FROM DATABASE
router.get("/api/getReviews", (req, res) => {
  db.Review.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

module.exports = router;
