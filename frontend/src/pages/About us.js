import React from "react";
import "./About us.css"; // CSS file for styling
import missionImg from "../assets/mision.png"; // Example image
import visionImg from "../assets/vision.png"; // Example image
import teamImg from "../assets/Team.png"; // Example image
import Navbar from "./NavBar";
function About() {
  return (
    
    <div className="about-page">
        {/* Navbar at top */}
      <Navbar />
      {/* Header Section */}
      <section className="about-hero">
        <h1>About RTS Techsol</h1>
       <p>We are driven by values and passion that defines our operating guidelines
         and principles. Our team has a collective experience of more than 30 years
          in the fields of Talent Acquisition, Development, Coaching, and advisory 
          services.RTS Techsol offers Talent Acquisition, Cloud Labs, Advisory, and
           Learning & Development practices (Technology, Behavioural, and Leadership 
           Development).</p>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision">
        <div className="mission">
          <img src={missionImg} alt="Our Mission" />
          <h2>Our Mission</h2>
          <p>
            To provide world-class online education and skill development to students across India, enabling them to achieve career success and personal growth.
          </p>
        </div>
        <div className="vision">
          <img src={visionImg} alt="Our Vision" />
          <h2>Our Vision</h2>
          <p>Our vision is to be India's best hub for Talent 
            in all three spheres of influence - Acquisition,
             Management & Development</p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose">
        <h2>Why Choose RTS Techsol?</h2>
        <ul>
          <li>Experienced instructors with real-world expertise.</li>
          <li>Interactive learning with live sessions and projects.</li>
          <li>Affordable courses for students from all backgrounds.</li>
          <li>Personalized guidance and mentorship.</li>
          <li>Access from any device: desktop, tablet, or mobile.</li>
        </ul>
      </section>

      {/* Team Section */}
      <section className="our-team">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          <div className="member">
            <img src={teamImg} alt="Team Member" />
            <h3>Gopi Venkat</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="member">
            <img src={teamImg} alt="Team Member" />
            <h3>Priya Sharma</h3>
            <p>Head of Education</p>
          </div>
          <div className="member">
            <img src={teamImg} alt="Team Member" />
            <h3>Ramesh Kumar</h3>
            <p>Lead Developer</p>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="about-footer">
        <p>
          RTS Techsol – Empowering Students for a Better Tomorrow.  
          <br />
          Join us today and start your learning journey!
        </p>
      </section>
    </div>
  );
}

export default About;
