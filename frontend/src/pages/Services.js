import React from "react";
import "./Services.css";
import Leadership from "../assets/Leadership.jpg"; // replace with your image path
import Navbar from "./NavBar";
import CloudLabs from "../assets/cloud-labs.jpg"
import Talent from "../assets/talent.jpg"
import TechTrain from "../assets/Techtrain.jpg"
const Services = () => {
  return (
    <div className="services-section">
        {/* Navbar at top */}
      <Navbar />
      <div> <h1 className="services">Our Services</h1> </div>
      <div className="services-container">
        {/* Text Side */}
        <div className="services-text">
          <h2>Technology Training</h2>
          <p>
            Rapid advancements in the technology space is forcing business and work 
            force to adopt changes to stay competitive in the market place.
          </p>
          <p>RTS Techsol takes pride in staying ahead of the learning curve on the latest 
            technology stacks. We Design, Develop and Deliver trainings in latest technology
             languages, applications, products or services. Our global network of seasoned
              trainers have trained employees of various corporates and are most sought.</p>
        </div>

        {/* Image Side */}
        <div className="services-image">
          <img src={TechTrain} alt="Services" />
        </div>
      </div>


       <div className="services-container">
        {/* Image Side */}
        <div className="services-image">
          <img src={Leadership} alt="Services" />
        </div>
        {/* Text Side */}
        <div className="services-text">
          <h2>Leadership Training</h2>
          <p>
            Unlock your potential and become the leader your organization needs with our comprehensive Leadership Training programs.
          </p>
          <p>Our Leadership Training is designed to develop effective leaders who can inspire, motivate, and drive organizational success. Whether you are an emerging leader or a senior executive, our program provides practical tools, actionable strategies, and real-world insights to help you thrive in today’s dynamic business environment.</p>
        </div>
      </div>
       <div className="services-container">
                {/* Text Side */}
        <div className="services-text">
          <h2>Cloud Labs</h2>
          <p>
            We provide a remote technology labs. Participants or Learners can access these labs from any part of the world. These labs provide real-time development environment and virtualized resources to learn and practice in a safe mode. These virtual resources do not have any impact on our clients production networks as there is no exchange of information between the nodes and learners are permitted to do all kinds of research without any fear of failure.
          </p>
          <p>A Cloud Lab is a marketplace and a SaaS-platform through which one can rapidly configure and access a real-life sandbox environment with a technology stack, compute power and on a cloud of your choice.</p>
        </div>
          {/* Image Side */}
        <div className="services-image"> <img src={CloudLabs} alt="Cloudlabs" /> </div>
      </div>
       <div className="services-container">
          {/* Image Side */}
        <div className="services-image"> <img src={Talent} alt="Talent" /> </div>
                {/* Text Side */}
        <div className="services-text">
          <h2>Cloud Labs</h2>
          <p>
            Our expertise lies in identifying the best from across the industry based on the job descriptions of our clients. We begin the journey by understanding the client, culture, and talent landscaping. Our skilled recruiter’s source profiles through crowdsourcing, internal databases, social media platforms, tech forums, personal networks. Thorough screening to make sure the candidates have good technical, functional, and behavioral skills before proposing to our esteemed clients. This helps in getting to the nerve of the requirement in the first go itself.
          </p>
        </div>
      </div>
      <div class="contact-section">
  <div class="contact-container">
    
    <div class="contact-text">
      <h2>Reach Us</h2>
      <p>Email: <a href="mailto:info@rtstechsol.com">info@rtstechsol.com</a></p>
    </div>

    
    <div class="contact-button">
      <button onclick="window.location.href='mailto:info@rtstechsol.com?subject=Request a Quote'">
        Get a Quote Online
      </button>
    </div>
  </div>
</div>

<div class="contact-info-section">
  <div class="contact-info-container">

    
    <div class="contact-box">
      <h3>For More Details</h3>
      <p>Reach out to us anytime for inquiries or support.</p>
    </div>

    
    <div class="contact-box">
      <h3>CALL US</h3>
      <p><a href="tel:+916301540477">+91 6301540477</a></p>
    </div>

    
    <div class="contact-box">
      <h3>DROP US A LINE</h3>
      <p><a href="mailto:info@rtstechsol.com">info@rtstechsol.com</a></p>
    </div>

  </div>
</div>


    </div>
  );
};

export default Services;
