import React, { useState,useEffect  } from "react";
import logo from "./assets/logo_id.png";
import teamImage from "./assets/team.jpg";
import img1 from "./assets/leader.jpg";
import img2 from "./assets/teamper.jpg";
import img3 from "./assets/strategy.jpg";
import img4 from "./assets/change.jpg";
import img5 from "./assets/multi.jpg";
import phs from "./assets/phs.jpg";
import dairy from "./assets/dairy.jpg";
import secure from "./assets/secure.jpg";
import pod from "./assets/pod.svg";
import card from "./assets/card.jpg";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
   // Testimonials array
  const testimonials = [ { text: "Conversant helped us transform our leadership culture — invaluable.", author: "Sarah Johnson", }, { text: "Their approach brought measurable change to our organization.", author: "Mark Lee", }, { text: "Our leaders are more connected and confident thanks to Conversant.", author: "Priya Sharma", }, { text: "We learned how to make every conversation meaningful.", author: "John Miller", }, { text: "Authentic connection and clarity in leadership — Conversant made it possible.", author: "Aisha Patel", }, ];
  const [openDropdown, setOpenDropdown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // mobile hamburger
  const [searchOpen, setSearchOpen] = useState(false);
   const [activeTab, setActiveTab] = useState("podcast");
   const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email address");
      return;
    }

    // Mail sending logic example (actual ga backend or EmailJS use cheyyali)
    console.log("Mail sent to:", email);
    alert(`Subscription successful! Confirmation mail sent to ${email}`);
    setEmail("");
  };
  const toggleDropdown = (menu) => { setOpenDropdown(openDropdown === menu ? null : menu); };
    // State for current testimonial
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <header className="navbar">
        {/* Logo */}
          <div className="logo"> <Link to="/"> <img src={logo} alt="Logo" style={{ width: "100px" }} /> </Link> </div>

        {/* Hamburger for mobile */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)} >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        {/* Navigation Links */}
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <ul className="menu">
            <li className="dropdown-item">
              <a href="#!" className="nav-link" onClick={() => toggleDropdown("why")} >
                Why RTS{" "}
                <span className="arrow"> {" "} {openDropdown === "why" ? "▴" : "▾"}{" "} </span>
              </a>
              {openDropdown === "why" && (
                <ul className="dropdown-menu">
                  <li> <Link to="/about" className="nav-link"> About Us </Link> </li>
                  <li> {" "} <a href="#!">Our Values</a>{" "} </li>
                </ul>
              )}
            </li>

            <li className="dropdown-item">
              <a href="#!" className="nav-link" onClick={() => toggleDropdown("solutions")} >
                Services{" "}
                <span className="arrow"> {" "} {openDropdown === "solutions" ? "▴" : "▾"}{" "} </span>
              </a>
              {openDropdown === "solutions" && (
                <ul className="dropdown-menu">
                  <li> {" "} <a href="#!">Rise To Scale</a>{" "} </li>
                  
                </ul>
              )}
            </li>
            <li> {" "} <a href="#!" className="nav-link" > {" "} Success Stories{" "} </a>{" "} </li>

            <li className="dropdown-item">
              <a href="#!" className="nav-link" onClick={() => toggleDropdown("resources")} >
                Resources Our Team{" "}
                <span className="arrow"> {" "} {openDropdown === "resources" ? "▴" : "▾"}{" "} </span>
              </a>
              {openDropdown === "resources" && (
                <ul className="dropdown-menu">
                   {" "} <li> <a href="#!">Our Team</a>{" "} </li>
                {" "} <li> <a href="#!">Guides</a> </li> 
                </ul>
              )}
            </li>
              {/* --- LOGIN BUTTON --- */}
                  <li> <Link to="/login" className="login-btn"> Login </Link> </li>
          </ul>
          
        </nav>

        {/* <div className="actions"> <button className="search-btn" onClick={() => setSearchOpen(!searchOpen)} > {" "} </button> <a href="#!" className="connect-btn" > {" "} Connect →{" "} </a> </div> */}
      </header>

      {searchOpen && (
        <div id="search-bar"> {" "} <input type="text" placeholder="Search..." />{" "} </div>
      )}

      <div>
        <h1 className="maintext"> {" "} Conversations are <br></br>the Work.{" "} </h1>
        <button className="btn_1">Our journey With You</button>
      </div>

      <div className="video-container">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" // 🔁 Replace with your video URL
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="vision-section">
        <div className="vision-left"> {" "} <h1>Our Vision in Action</h1>{" "} </div>
        <div className="vision-right">
          <p>
            We awaken the world to the power and joy of authentic human
            connection, setting a new standard for leadership that produces
            meaningful, enduring impact.
          </p>
        </div>
      </div>
      <div className="stats-section">
        <div className="stat-card">
          <h1>30+</h1>
          <h2>Talent Acquisition</h2>
          <p>
            Our expertise lies in identifying the best from across the 
            industry based on the job descriptions of our clients. We 
            begin the journey by understanding the client, culture and
             talent landscaping. Our skilled recruiters source profiles
              through crowd sourcing, internal
          </p>
        </div>

        <div className="stat-card">
          <h1>100+</h1>
          <h2>Cloud Labs</h2>
          <p>
            We provide a remote technology labs. Participants or Learners
             can access these labs from any part of the world. These labs
              provide real-time development environment and virtualized resources 
          </p>
          <p></p>
        </div>

        <div className="stat-card">
          <h1>450+</h1>
          <h2>Talent development</h2>
          <p>
            Rapid advancements in the technology space is forcing business and
             work force to adopt changes to stay competitive in the market place.
          </p>
        </div>
      </div>

      <div className="who-section">
        <h1 className="section-title">Who We Are</h1>

        <div className="who-container">
          <div className="who-image">
            <img src={teamImage} alt="Our Team" />
          </div>

          <div className="who-content">
            <h2>We make a difference, together.</h2>
            <p>
              RTS Techsol is an established provider of IT Trainings 
              to enterprises across country. We have been assisting our
               clients and executing various trainings across Technology,
                Behavioural and Leadership areas.  In addition we are also
                 helping them in their talent acquisition activities.
            </p>

            <h2>Why RTS?</h2>
            <p>
              We bring you the expertise of working with over 100+ clients 
              across the country.  We have an experienced team to serve your
               talent needs flexibly. Curabitur et mattis ante. Maecenas sit
                amet commodo tellus. Phasellus fermentum pretium eros, ut 
                faucibus velit auctor eget dolor sit amet! Lorem dolor sit
                 glavrida amet.
            </p>
            <button className="know-btn">Get Know Us</button>
          </div>
        </div>
      </div>

     <div className="solutions-section">
      <div className="solutions-header">
        <h2>SOLUTIONS</h2>
        <h1>Designed For You, With You.</h1>
      </div>

      <div className="solution-card">
        <div className="solution-image">
          <img src={img1} alt="Leadership Development" />
        </div>
        <div className="solution-content">
          <h1>Leadership Development & Coaching</h1>
          <p>
            Development and coaching for leaders at every level. More than
            typical leadership training, our approach incorporates your
            organizational values and builds unique, experiential solutions that
            grow untapped talent.
          </p>
          <p>
            Our solutions can be fully customized to meet your needs, or you can
            join leaders from other organizations in ongoing programs we offer
            throughout the year.
          </p>
          <a href="#">Know More</a>
        </div>
      </div>

      <div className="solution-card reverse">
        <div className="solution-image">
          <img src={img2} alt="Team Performance" />
        </div>
        <div className="solution-content">
          <h1>Team Performance</h1>
          <p>
            Custom solutions designed to uplevel team performance, refine
            cross-functional collaboration, and overcome challenges for
            organizational success.
          </p>
          <a href="#">Know More</a>
        </div>
      </div>

      <div className="solution-card">
        <div className="solution-image">
          <img src={img3} alt="Strategy Implementation" />
        </div>
        <div className="solution-content">
          <h1>Strategy Implementation</h1>
          <p>
            Taking a human-centric approach to strategy implementation and
            engagement, we create meaningful journeys your employees want to be
            a part of.
          </p>
          <a href="#">Know More</a>
        </div>
      </div>

      <div className="solution-card reverse">
        <div className="solution-image">
          <img src={img4} alt="Change Leadership" />
        </div>
        <div className="solution-content">
          <h1>Change Leadership</h1>
          <p>
            Programmatic methods to guide you through change management and
            leadership with enablement and training so your team can own future
            change.
          </p>
          <a href="#">Know More</a>
        </div>
      </div>

      <div className="solution-card">
        <div className="solution-image">
          <img src={img5} alt="Multi-Group Collaboration" />
        </div>
        <div className="solution-content">
          <h1>Multi-Group Collaboration</h1>
          <p>
            Custom solutions to help you thrive in complex collaborations with
            industry, government, and external organizations through proven
            negotiation and system mapping tools.
          </p>
          <a href="#">Know More</a>
        </div>
      </div>
    </div>

   <div className="home-container">
      <h1>Welcome to Our Home Page</h1>

      {/* Testimonials Section */}
      <div className="testimonials-container">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-slide">
          <p className="testimonial-text">“{testimonials[currentIndex].text}”</p>
          <h4 className="testimonial-author">— {testimonials[currentIndex].author}</h4>
        </div>
        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>

<div>
  <div className="success-header"> <h1>Success Stories</h1> <a href="#">Explore all</a> </div>
 <div className="story-container"> <div className="story-box"> {/* Left - Image */} <div className="story-image"> <img src={phs} alt="Phs" /> </div> {/* Center - Title */} <div className="story-title"> <h1>PHS: Rebuilding Trust with The Promise</h1> </div> {/* Right - Description */} <div className="story-content"> <h3>Their Challenge</h3> <p> Presbyterian Healthcare Services (PHS) had been working to improve the patient... </p> <h3>The Impact</h3> <p> PHS has seen progress in its mission-critical goal of improving the patient and... </p> <a href="#">Read the full story</a> </div> </div> </div>
 <div className="story-container"> <div className="story-box"> {/* Left - Image */} <div className="story-image"> <img src={dairy} alt="dairy" /> </div> {/* Center - Title */} <div className="story-title"> <h1>Dairy Farmers of America</h1> </div> {/* Right - Description */} <div className="story-content"> <h3>Their Challenge</h3> <p>The milk marketing cooperative Dairy Farmers of America faces a rapidly evolving</p> <h3>The Impact</h3> <p> The first three years of the Make Your Mark programs gave rave reviews of their</p> <a href="#">Read the full story</a> </div> </div> </div>
 <div className="story-container"> <div className="story-box"> {/* Left - Image */} <div className="story-image"> <img src={secure} alt="secureworks" /> </div> {/* Center - Title */} <div className="story-title"> <h1>Secureworks</h1> </div> {/* Right - Description */} <div className="story-content"> <h3>Their Challenge</h3> <p>Secureworks is a cybersecurity firm specializing in threat intelligence detection</p> <h3>The Impact</h3> <p>The Secureworks executive team, according to the CEO, is more aligned to...</p> <a href="#">Read the full story</a> </div> </div> </div>
</div>

<div className="tools-section">
  <div className="tools-header"> <h1>Tools for Real Change</h1> <a href="#">Explore all resources</a> </div>
  <div className="resources-container">
      {/* Button Section */}
      <div className="button-group">
        <button className={activeTab === "podcast" ? "active" : ""} onClick={() => setActiveTab("podcast")} > Podcast </button>
        <button className={activeTab === "blogs" ? "active" : ""} onClick={() => setActiveTab("blogs")} > Blogs </button>
         <button className={activeTab === "videos" ? "active" : ""} onClick={() => setActiveTab("videos")} > Videos </button>
         <button className={activeTab === "books" ? "active" : ""} onClick={() => setActiveTab("books")} > Books </button>
        </div>
         {/* Content Section */}
      <div className="content-section">
        {activeTab === "podcast" && ( <div className="content-card"> <div className="card-image"> <img src={pod} alt="podcast" /> </div> <h3>Episode 74</h3> <h4><a>When Vision and Values Actually Work | On</a></h4> <p> Emma Rose Connolly 24 September, 2025 </p> </div> )}

        {activeTab === "blogs" && ( <div className="content-card"> <img src="https://via.placeholder.com/400x200" alt="Blog" /> <h3>Latest Blog Post</h3> <h1>Transforming Ideas into Impact</h1> <p> Explore our latest blogs on leadership, business strategies, and human connection in the digital age. </p> </div> )}

        {activeTab === "videos" && ( <div className="content-card"> <img src="https://via.placeholder.com/400x200" alt="Video" /> <h3>Featured Video</h3> <h1>Conversations That Matter</h1> <p> Watch real stories and insights from leaders creating change around the world. </p> </div> )}

        {activeTab === "books" && ( <div className="content-card"> <img src="https://via.placeholder.com/400x200" alt="Book" /> <h3>Recommended Book</h3> <h1>Leading with Purpose</h1> <p> Discover powerful reads that help leaders grow personally and professionally in today’s dynamic world. </p> </div> )}
      </div>
    </div>
    </div>

    <div className="blue-card">
  <div className="card-content">
    <div className="card-text">
      <h1>Transform Your Business with Us</h1>
      <p>
        We help companies achieve growth through digital transformation,
        innovative strategies, and scalable technology solutions.
      </p>
      <button>Learn More</button>
    </div>
    <div className="card-image">
      <img src={card} alt="Business Growth" />
    </div>
  </div>
</div>

<div className="newsletter-main">
      <div className="newsletter-container">
        {/* Left Section */}
        <div className="newsletter-text">
          <h1>Stay Updated with Our Latest News</h1>
          <p>
            Subscribe to our newsletter and get updates on our latest
            technologies, insights, and announcements straight to your inbox.
          </p>
        </div>

        {/* Right Section */}
        <div className="newsletter-card">
          <h2>Subscribe to Newsletter</h2>
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

<div className="footer">
  <div className="footer-container">
    {/* Contact Section */}
    <div className="footer-section">
      <p>📞 +91 6301540477</p>
      <p>✉️ info@rtstechsol.com</p>
    </div>

    {/* Conversant Links */}
    <div className="footer-section">
      <h1>Conversant</h1>
      <ul>
        <li>About Us</li>
        <li>Our Team</li>
        <li>Careers</li>
        <li>Contact</li>
        <li>Blog</li>
        <li>FAQs</li>
        <li>Privacy Policy</li>
      </ul>
    </div>

    {/* Resources Links */}
    <div className="footer-section">
      <h1>Resources</h1>
      <ul>
        <li>Guides</li>
        <li>Podcasts</li>
        <li>Case Studies</li>
        <li>Webinars</li>
        <li>Whitepapers</li>
        <li>Reports</li>
      </ul>
    </div>

    {/* Solutions Links */}
    <div className="footer-section">
      <h1>Solutions</h1>
      <ul>
        <li>Leadership Development</li>
        <li>Team Collaboration</li>
        <li>Change Management</li>
        <li>Organizational Growth</li>
        <li>Performance Strategy</li>
        <li>Coaching Programs</li>
      </ul>
    </div>
  </div>
</div>


      
    </div>
  
  
    </div>
  );
}

export default Home;
