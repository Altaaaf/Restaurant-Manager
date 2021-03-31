import React, { useState } from "react";
import './Contact.css';

const ContactForm = () => {
  const [status, setStatus] = useState("Submit");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { name, email, message } = e.target.elements;
    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    setStatus("Submit");
    let result = await response.json();
    alert(result.status);
  };
  return (
    <div className='customer-contact-container'>
    <div className='customer-contact-content'>
    <h2>Send us a message</h2>
    <form onSubmit={handleSubmit}>
      <div className="inputbox">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" required />
      </div>
      <div className="inputbox">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" required />
      </div>
      <div className="inputbox">
        <label htmlFor="message">Message:</label>
        <textarea type="message" id="message" required />
      </div>
      <button className="button" type="submit">{status}</button>
    </form>
    </div>
</div>
  );
};


export default ContactForm;