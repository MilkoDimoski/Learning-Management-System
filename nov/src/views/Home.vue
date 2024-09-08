<template>
  <body>
  <div class="full-width">
    <div class="home">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <div class="container11 demo animated">
            <h1>Welcome to the Learning Management System</h1>
            <p>Your gateway to a world of knowledge and opportunities.</p>
            <router-link to="/allCourses" class="cta-button">Explore Courses</router-link>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <!-- Features Section -->
      <section class="features">
        <div class="container">
          <h2>Why Choose Us?</h2>
          <div class="features-grid">
            <div class="feature">
              <img src="/src/images/interactive.jpg" alt="Interactive Learning"/>
              <h3>Interactive Learning</h3>
              <p>Engage with interactive lessons and resources that make learning fun and effective.</p>
            </div>
            <div class="feature">
              <img src="/src/images/Instructors.png" alt="Expert Instructors"/>
              <h3>Expert Instructors</h3>
              <p>Learn from experienced professionals who are leaders in their fields.</p>
            </div>
            <div class="feature">
              <img src="/src/images/schedule1.png" alt="Flexible Schedule" class="feature-image"/>
              <h3>Flexible Schedule</h3>
              <p>Access course materials anytime, anywhere to fit your busy schedule.</p>
            </div>
          </div>
        </div>
      </section>


      <!-- Testimonials Section -->
      <section class="testimonials">
        <div class="container">
          <h2>What Our Students Say</h2>
          <div class="testimonial-slider">
            <div class="testimonial">
              <p>"The LMS platform is amazing! The courses are well-structured and engaging."</p>
              <h4>- Alex Johnson</h4>
            </div>
            <div class="testimonial">
              <p>"A fantastic experience with top-notch instructors and a user-friendly interface."</p>
              <h4>- Jamie Smith</h4>
            </div>
            <div class="testimonial">
              <p>"The flexibility of the LMS allowed me to learn at my own pace. Highly recommend!"</p>
              <h4>- Taylor Brown</h4>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="contact">
        <div class="container">
          <h2>Get In Touch</h2>
          <p>Have questions or need support? Reach out to us and we’ll be happy to assist you!</p>
          <router-link to="/contact" class="cta-button">Contact Us</router-link>
        </div>
      </section>
    </div>
  </div>
  </body>
</template>

<script setup>
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  background: #E9CCCE;

}
.feature-image {
  width: 820px;
  height: 260px;
  object-fit: cover; /* This ensures the image doesn't stretch and maintains aspect ratio */
}

.container11 {
  margin: auto;
  width: 40vw;
  height: 70vh;
  border: 5px solid transparent;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.demo {
  background-image:
      linear-gradient(white, white),
      linear-gradient(270deg, #00D7B9, #B95DD7 50%, #FFB367 100%);
  background-repeat: no-repeat;
  background-origin: padding-box, border-box;
  text-align: center;
  display: flex; /* Make the container a flexbox */
  flex-direction: column; /* Stack children vertically */
  justify-content: center; /* Center items vertically */
  align-items: center; /* Center items horizontally */
}

.animated {
  background-image:
      linear-gradient(white, white),
      linear-gradient(180deg, #a786da, #8a258a 50%, #a36ea6);
  background-repeat: no-repeat;
  background-size: 100% 100%, 100% 200%;
  background-position: 0 0, 0 100%;
  background-origin: padding-box, border-box;
  animation: highlight 1s infinite alternate;
}

@keyframes highlight {
  100% {
    background-position: 0 0, 0 0;
  }
}

.full-width {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;

  background-size: cover;
}

.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  text-align: center;
  margin-bottom: 50px;
  font-size: 2.5rem;
  color: #333;
  font-family: 'Poppins', sans-serif; /* Change font for modern look */
  font-weight: 700;
  background: linear-gradient(to bottom, #f0f0f0, #ffffff);
}

/* Hero Section */
.hero {
  //background-image: url('https://source.unsplash.com/random/1920x1080?education');
  background-size: cover;
  background-position: center;
  color: #000000;
  padding: 100px 20px; /* Add padding to prevent content cutoff */
  text-align: center;
  min-height: 100vh; /* Ensure it covers the full height of the viewport */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.hero-content {
  max-width: 800px;
  background: #ffffff;
  padding: 40px;
  border-radius: 15px;
  animation: fadeIn 10s ease-out;
}

.hero h1 {
  text-align: center;
  margin-bottom: 50px;
  font-size: 2.5rem;
  color: #333;
  font-family: 'Poppins', sans-serif; /* Change font for modern look */
  font-weight: 700;;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5); /* Darker shadow for better contrast */
}


.hero p {
  text-align: center;
  margin-bottom: 50px;
  font-size: 1.5rem;
  color: #333;
  font-family: 'Poppins', sans-serif; /* Change font for modern look */
  font-weight: 700;
}

/* Glowing Button Style */

.cta-button {
  color: #fff;
  padding: 12px 24px;
  border-radius: 10px;
  text-decoration: none;
  font-size: 1.1rem;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border: none;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  background: linear-gradient(135deg, #ff6b6b, #f06595);
}

.cta-button::after {
  content: "";
  z-index: -1;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  left: 0;
  top: 0;
  border-radius: 10px;
}

.cta-button::before {
  content: "";
  background: linear-gradient(45deg, #ff8da1, #493667, #77346f, #ff84b6);
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 600%;
  z-index: -1;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  filter: blur(8px);
  animation: glowing 20s linear infinite;
  transition: opacity .3s ease-in-out;
  border-radius: 10px;
  opacity: 0;
}

.cta-button:hover::before {
  opacity: 1;
}

.cta-button:active:after {
  background: transparent;
}

.cta-button:active {
  color: #ff84b6;
  font-weight: bold;
}

@keyframes glowing {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

/* Features Section */
/* Features Section */
.features {
  background-color: #f5f5f5; /* Light gray background for a modern look */
  padding: 80px 20px; /* Adjust padding for responsiveness */
  border-top: 2px solid #e0e0e0;
}

.features h2 {
  text-align: center;
  margin-bottom: 50px;
  font-size: 2.5rem;
  color: #333;
  font-family: 'Poppins', sans-serif; /* Change font for modern look */
  font-weight: 700;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); /* Slightly larger shadow for depth */
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #ddd; /* Light border for better separation */
}

.feature:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.feature img {
  max-width: 100%; /* Ensure image scales well with container */
  height: auto; /* Maintain aspect ratio */
  border-radius: 10px; /* Rounded corners for images */
  margin-bottom: 15px;
}

.feature h3 {
  margin: 15px 0;
  font-size: 1.8rem;
  color: #007bff; /* Use a primary color for headings */
}

.feature p {
  font-size: 1.1rem;
  color: #555;
}


/* Testimonials Section */
.testimonials {
  background-color: #e9ecef;
  padding: 80px 0;
  border-top: 2px solid #d0d0d0;
}

.testimonials h2 {
  text-align: center;
  margin-bottom: 50px;
  font-size: 2.5rem;
  color: #333;
}

.testimonial-slider {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.testimonial {
  background-color: #fff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.testimonial:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.testimonial p {
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: #555;
}

.testimonial h4 {
  font-size: 1rem;
  color: #6c757d;
}

/* Contact Section */
.contact {
  background-color: #fff;
  padding: 80px 0;
  border-top: 2px solid #e0e0e0;
}

.contact h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5rem;
  color: #333;
}

.contact p {
  text-align: center;
  margin-bottom: 40px;
  font-size: 1.2rem;
  color: #666;
}
</style>
