import React, { useState } from 'react';
// import './Content.css'; // Optional: your CSS styling

const Content = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }

    // Form submission logic
    console.log('Form submitted:', formData);
    setSubmitted(true);

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>i’d love to hear from you! Reach out using the info below or the contact form.</p>

      {/* Contact Info Section */}
      <div className="contact-info">
        {/* <p><strong>Address:</strong> India </p> */}
        <p><strong>Phone:</strong> <a href="tel:+91 9607768658"> (+91) 9607768658</a></p>
        <p><strong>Email:</strong> <a href="prashantjoshi.8k@gmail.com">prashantjoshi.8k@gmail.com</a></p>
        {/* <p><strong>Hours:</strong> Mon–Fri, 9 AM – 6 PM</p> */}
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name *"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email *"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Your Message *"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>

      {submitted && <p className="thank-you">Thank you! We'll get back to you soon.</p>}

      {/* Optional: Map Embed */}
      <div className="map-section">
        <iframe
          title="Our Location"
          src="https://www.google.com/maps/embed?pb=!1m18!..." // Replace with actual map link
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Social Media Links */}
      <div className="social-links">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> | 
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </div>
  );
};

export default Content;
