const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

const contactEmail = nodemailer.createTransport({
	service: 'gmail',
	auth: {
	  user: "barnslink@gmail.com",
	  pass: "Nyit2021",
	},
  });
  
  contactEmail.verify((error) => {
	if (error) {
	  console.log(error);
	} else {
	  console.log("Ready to Send");
	}
  });

router.post("/contact", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message; 
    const mail = {
      from: name,
      to: "barnslink@gmail.com",
      subject: "Contact Form Submission",
      html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "ERROR" });
      } else {
        res.json({ status: "Message Sent" });
      }
    });
  });
  module.exports = router;
