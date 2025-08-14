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
      <div className="featured-image " style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/images/feature-image.jpg'})`,
      }}>
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
        <a href="/resume.pdf" download="YourName_Resume.pdf" className="btn">
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
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos, quo quam. Quaerat deserunt aliquam sit. Rerum harum autem sit odit praesentium minus minima quae. Reprehenderit ipsum velit, ratione cum minima officiis dicta odio ipsa dolorum quisquam corporis distinctio quaerat, assumenda nemo illum ea quod officia voluptatum magni soluta ad vel! Odit expedita quasi aliquid reprehenderit illum tempora aperiam distinctio minima, impedit totam quas quaerat pariatur autem deleniti magnam architecto! Ducimus ipsum veniam ipsa, pariatur expedita quam quibusdam perferendis repudiandae sit a nihil, nobis dolorem provident doloribus architecto adipisci distinctio accusamus iure neque quasi dolor suscipit placeat. Magnam facere, inventore quia cum aliquam nesciunt cupiditate vel deleniti doloremque tenetur rerum, amet consequuntur magni autem? Neque asperiores, fuga enim molestiae vitae earum veniam facilis delectus suscipit nihil, corrupti totam in ipsa nostrum eveniet aliquid fugiat odit praesentium quia, aliquam iste laborum rerum quasi dolor. Itaque porro quia totam similique cupiditate! Quisquam fugit blanditiis maiores doloribus commodi atque quod fugiat voluptatum minus hic ut, ipsum officiis nemo illum sit consectetur officia libero neque voluptatem repellat repudiandae necessitatibus dolore deleniti sunt. Minus voluptatum a quis, adipisci dicta magnam aspernatur asperiores? Commodi ex possimus vero maxime esse. Vel impedit possimus voluptate sunt ipsa ab enim nulla culpa in molestias aliquid hic quos labore dolore, ducimus tempora quibusdam nesciunt, expedita natus quam vitae animi, aperiam ut? Doloribus accusamus inventore fugiat excepturi quaerat dolore odio, culpa ullam! Accusantium magni itaque nostrum, reiciendis vitae corporis explicabo officia placeat rerum expedita, veritatis, unde a quos fugit laudantium iste repudiandae. Magni, sint. Fugiat cum animi ducimus libero itaque, velit cumque dolore non minus eius iste unde ipsum possimus repellendus in neque veritatis maxime consequatur expedita, aperiam, eos magnam labore delectus? Sit minima possimus perspiciatis pariatur nulla inventore deleniti voluptatem dicta esse officiis, quia quod odit blanditiis facere fugit. Unde cum, deserunt sed modi nesciunt sit neque molestias perspiciatis, incidunt voluptas non. Modi sunt quaerat reprehenderit expedita nesciunt omnis in laboriosam cupiditate eum officiis? Dolores sint incidunt culpa dolor! Corrupti magni, odit consequatur voluptates eos cupiditate dignissimos pariatur accusantium, natus voluptatum ipsum nostrum recusandae facilis dicta dolore corporis vel doloremque repellendus quibusdam excepturi architecto reiciendis! Quidem cum quis, deleniti aspernatur placeat sed omnis a ex repudiandae accusantium rem, maxime, libero voluptate! Est nulla saepe ut ipsam, animi quisquam commodi, amet debitis culpa architecto facere recusandae, fugiat rem maxime delectus consequatur optio unde nemo vel officiis magnam quas minima neque ipsa! Molestias exercitationem dolorum a reiciendis maiores laboriosam dolore labore dignissimos suscipit harum, minus omnis dolor voluptas aut eum voluptatibus quam impedit magni esse id error iste. Rerum blanditiis eaque, dolore omnis officiis officia corrupti cumque ullam eos molestias. Fugiat, magni laborum maiores dolores libero perferendis culpa esse praesentium dolorem soluta dolor cum in. Natus, aspernatur itaque harum consectetur illo iure, sapiente sequi fugiat exercitationem ipsum fugit ipsam ab, laudantium quia commodi perspiciatis? Molestiae eveniet, laborum fuga veritatis distinctio exercitationem error natus. Laborum eveniet quaerat unde, excepturi velit odit. Itaque perspiciatis recusandae, quod et distinctio earum ad sunt rem, aut eligendi quia eius provident ex ab veniam voluptatem autem necessitatibus aperiam similique magnam fugit alias! Cum eaque perferendis soluta porro est voluptates saepe, aperiam, reprehenderit nulla, asperiores eligendi in facilis qui voluptatum? Id consequuntur, sed, aliquid vitae minus optio exercitationem nihil unde enim aut qui rem, praesentium perspiciatis suscipit hic quisquam. Dolores explicabo cupiditate facilis ratione modi voluptatum qui et facere ad deleniti blanditiis excepturi totam, dolor asperiores perspiciatis, porro eos dignissimos at aliquam doloremque optio! Accusantium dolor nisi officia natus. Porro tenetur autem unde itaque sunt reprehenderit ipsa dignissimos.</p>
      </div>
      </div>
    </div>
  );
}

export default Homepage;