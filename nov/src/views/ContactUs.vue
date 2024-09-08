<template>
  <body>
  <div class="contact-page">
    <section class="contact-header">
      <h1>Get In Touch</h1>
      <p>We’d love to hear from you! Whether you have a question or need support, our team is here to help.</p>
    </section>

    <section class="contact-info">
      <div class="info-card">
        <h3>Milko Dimoski</h3>
        <p>Email: <a href="mailto:milko.dimoski@example.com">milko.dimoski@example.com</a></p>
        <p>Phone: +389 70 123 456</p>
      </div>
      <div class="info-card">
        <h3>Darko Dimitrov</h3>
        <p>Email: <a href="mailto:darko.dimitrov@example.com">darko.dimitrov@example.com</a></p>
        <p>Phone: +389 70 654 321</p>
      </div>
    </section>

    <section class="contact-form">
      <h2>Drop Us a Message</h2>
      <form>
        <div class="form-group">
          <label for="name">Your Name</label>
          <input type="text" id="name" placeholder="Enter your name" required />
        </div>
        <div class="form-group">
          <label for="email">Your Email</label>
          <input type="email" id="email" placeholder="Enter your email" required />
        </div>
        <div class="form-group">
          <label for="message">Your Message</label>
          <textarea id="message" rows="5" placeholder="Enter your message" required></textarea>
        </div>
        <button type="submit" class="submit-btn">Send Message</button>
      </form>
    </section>
  </div>
  </body>
</template>

<style scoped>
/* Full page setup */
html, body {
  height: 100vh;
  width: 100vw;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #E9CCCE;
  font-size: 2.5rem;
  color: #333;
  font-family: 'Poppins', sans-serif; /* Change font for modern look */
  font-weight: 700;
}

/* General Styles */
.contact-page {
  width: 100%;
  max-width: 1200px;
  padding-top: 240px;
  background: #fff;
  color: #333;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.contact-header {
  text-align: center;
  margin-bottom: 40px;

}

.contact-header h1 {
  font-size: 3rem;
  color: #333;
}

.contact-header p {
  font-size: 1.2rem;
  color: #666;
}

/* Info Cards Section */
.contact-info {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 50px;
}

.info-card {
  background: linear-gradient(135deg, #dda6c1, #d4aadd);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  color: white;
  text-align: center;
  transition: transform 0.3s ease;
}

.info-card:hover {
  transform: scale(1.05);
}

.info-card h3 {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.info-card a {
  color: #fff;
  text-decoration: underline;
}

.info-card p {
  margin: 10px 0;
  font-size: 1rem;
}

/* Contact Form Section */
.contact-form {
  background: white;
  padding: -140px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.contact-form h2 {
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 1.1rem;
  color: #333;
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 1rem;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease;
}

.form-group input:focus, .form-group textarea:focus {
  border-color: #ff6b6b;
  outline: none;
}

.submit-btn {
  background: linear-gradient(135deg, #ff6b6b, #f06595);
  color: #fff;
  padding: 12px 24px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background 0.3s ease;
}

.submit-btn:hover {
  background: linear-gradient(135deg, #ff4757, #ff6b81);
}

/* Media Queries */
@media (max-width: 768px) {
  .contact-info {
    flex-direction: column;
    align-items: center;
  }
}
</style>

<script setup lang="ts"></script>
