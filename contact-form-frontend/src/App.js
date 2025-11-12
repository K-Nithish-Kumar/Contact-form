import React, { useState } from "react";
import axios from "axios";
import './style.css'

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject:"",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://contact-form-backend-1327.onrender.com/send", formData);
       setStatus(res.data.message);
    } catch (err) {
       setStatus("Failed to send message!");
    }
  };

  return (
    <div className="main-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="Heading-Container">
          <div className="Heading">
            <h2>Contact Form</h2>
          </div>
          <button type="submit" className="heading-submit-button">Send</button>
        </div>

        {/* Name Container */}
        <div className="Name-container">
          <label htmlFor="Name">Name <span>:</span></label>
          <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required/>
        </div>

        {/* Email Container */}
        <div className="Email-container">
          <label htmlFor="Email">Email <span>:</span></label>
          <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required/>
        </div>

        {/* Subject-container */}
        <div className="subject-container">
          <label htmlFor="subject">Subject <span>:</span></label>
          <input type="text" name="subject" placeholder="Subject" onChange={handleChange} required />
        </div>

        {/* Message-container */}
        <div className="Message-container">
          <label htmlFor="Message">Message <span>:</span></label>
          <textarea name="message" placeholder="Your Message" onChange={handleChange} required/>
        </div>

        <button type="submit" className="submit-btn">Send</button>
      </form>
      <p className="result">{status}</p>
    </div>
  );
}

export default App;

