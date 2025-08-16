import React from 'react';
import { Link } from 'react-router-dom';

import './Homepage.css'


function Homepage(props) {
  const linkStyle = {
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
  };

  let myStyle = {
    // color: props.mode === 'dark' ? 'white' : 'black',
    // backgroundColor: props.mode === 'dark' ? 'white' : 'null',
  };

  return (


    <div className='home' >
      <div className="featured-image" >
      <div  style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/images/feature-image.jpg'})`,
      }}>

      </div>
        <h1 className="featured-text">Welcome</h1>
        {/* SVG wave at the bottom */}
        <svg
          className="wave"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 150"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,100 C360,200 720,0 1080,100 C1260,150 1440,120 1440,100 L1440,150 L0,150 Z"
          />
        </svg>
      </div>
      <div className='mx-3'>
      {/* ---------------------------- OLD CODE (COMMENTED OUT) ----------------------------- */}

      {/*
      <div>
        <p>Hi, I'm Fury — a Frontend Developer who builds functional and responsive web applications.</p>

        <h2>
          About Me?
        </h2>
        <p>I specialize in React, JavaScript, and clean UI design. Passionate about turning ideas into interactive, user-friendly web apps.</p>
      </div>
      <li>Wanna know me better?, feel free to download my <a href="/resume.pdf"
        download="YourName_Resume.pdf">Resume</a>.</li>
      <li>Get in touch with me ? here is my <Link to="/contact">Contact Page</Link>.</li>
      <hr></hr>
      <div className='flex'>
        <h2 className='text-decoration-underline'>🚀 Projects I’ve Built</h2>
        <h3><ul><Link to="/TextEditor" className="text-decoration-none">📝 TextEditor</Link></ul></h3><p>A clean and lightweight text editing tool with formatting features, ideal for writers and developers.</p>
        <h3><ul><Link to="/TextEditor" className="text-decoration-none">💰 SpendTrackr </Link></ul></h3><p>A personal finance app to help users track daily expenses and stay on budget.</p>
      </div>
      */}

      {/* ---------------------------- NEW CLEANED-UP STRUCTURE ----------------------------- */}

      {/* ✅ Hero Section */}
      <h1 className="hero-heading" style={{fontSize:'24px'}}>Hi, I'm Fury 👋</h1>
      <p className="hero-subtext" style={{fontSize:'18px'}}>
        A frontend developer who builds functional and responsive web applications.
      </p>

      {/* ✅ About Me Section */}
      <h2 className="section-heading" style={{fontSize:'24px'}}>About Me</h2>
      <p className="section-text" style={{fontSize:'16px'}}>
        I specialize in React, JavaScript, and clean UI design. Passionate about turning ideas into interactive, user-friendly web apps.
      </p>

      {/* ✅ Resume & Contact */}
      <div className="cta-buttons">
        <a href={`${process.env.PUBLIC_URL}/resume.pdf`} download="Prashant Resume.pdf" className="btn btn-primary">
          📄 Download Resume
        </a>
        <Link to="/contact" className="btn btn-secondary">
          📬 Contact Me
        </Link>
      </div>

      {/* ✅ Projects Section */}
      <h2 className="section-heading" style={{fontSize:'24px'}}>🚀 Projects I’ve Built</h2>
      <div className="project-grid">
        {/* Project 1 */}
        <div className="project-card">
          <h3>
            <Link to="/TextEditor" className="text-decoration-none"style={{fontSize:'22px'}}>📝 TextEditor</Link>
          </h3>
          <p style={{fontSize:'16px'}}>
            A clean and lightweight text editing tool with formatting features, ideal for writers and developers.
          </p>
        </div>

        {/* Project 2 */}
        <div className="project-card">
          <h3>
            <Link to="/SpendTrackr" className="text-decoration-none"style={{fontSize:'22px'}}>💰 SpendTrackr</Link>
          </h3>
          <p style={{fontSize:'16px'}}>
            A personal finance app to help users track daily expenses and stay on budget.
          </p>
        </div>
        
      </div>
      </div>
    </div>
  );
}

export default Homepage;