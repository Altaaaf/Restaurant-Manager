import React, { useState } from "react";
<<<<<<< HEAD
import "./Contact.css";

=======
import './Contact.css';
>>>>>>> cc6811e (contactbackend)

const ContactForm = () => {
  const [status, setStatus] = useState("Submit");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { name, email,subject, message } = e.target.elements;
    let details = {
      name: name.value,
      email: email.value,
      subject: subject.value,
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
<<<<<<< HEAD
    <section class="contact-page-section">
    
    <div class="container"> 
    
        <div class="row clearfix">
        <h2>Send us a message</h2>
            <div class="column col-lg-8 col-md-12 col-sm-12">
                
                <div class="contact-form">
              
                    <form onSubmit={handleSubmit} >
                        <div class="row clearfix">
                            <div htmlFor="name" class="col-lg-6 col-md-12 col-sm-12 form-group">
                                <input type="text" name="name" id="name" placeholder="Name" required />
                            </div>
                            
                            <div htmlFor="email" class="col-lg-6 col-md-12 col-sm-12 form-group">
                                <input type="email" name="email" id="email" placeholder="Email" required />
                            </div>

                            
                            <div htmlFor="subject" class="col-lg-6 col-md-12 col-sm-12 form-group">
                                <input type="text" name="subject" id="subject" placeholder="Subject" required />
                            </div>
                            
                            <div htmlFor="message" class="col-lg-12 col-md-12 col-sm-12 form-group">
                                <input type="text" id="message" placeholder="Massage" required />
                            </div>
                            
                            <div class="col-lg-12 col-md-12 col-sm-12 form-group">
                                <button class="btn btn-warning btn-lg text-white" type="submit" ><span class="btn-title">{status}</span></button>
                            </div>
                            
                        </div>
                    </form>
                        
                </div>
               
            </div>
           
            <div class="column col-lg-4 col-md-12 col-sm-12">
                <div class="text">You can also reach us at: </div>

                <ul class="contact-info">
                    <li>
                        <span class="icon fa fa-globe"></span> 
                        <strong>Location </strong>
                        1855 Broadway, New York, NY 10023
                    </li>

                    <li>
                        <span class="icon fa fa-phone"></span>
                        <strong>Phone</strong>
                        <a >212-222-2222</a>
                    </li>

                    <li>
                        <span class="icon fa fa-envelope-open"></span>
                        <strong>Email Us</strong> 
                        <a href="#">Barnslink@hotmail.com</a>
                    </li>
                </ul>
                
            </div>
        </div>
    </div>
</section>
    
=======
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
>>>>>>> cc6811e (contactbackend)
  );
};


<<<<<<< HEAD
export default ContactForm;




=======
export default ContactForm;
>>>>>>> cc6811e (contactbackend)
