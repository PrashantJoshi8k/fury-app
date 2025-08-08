import React from 'react';
import { Link } from 'react-router-dom';

function Homepage(props) {

  let myStyle = {
    // color: props.mode === 'dark' ? 'white' : 'black',
    // backgroundColor: props.mode === 'dark' ? 'white' : 'null',

  }

  return (
    <div className='mx-4'>
      {/* <h1>Homepage</h1> */}
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
        <h2>🚀 Projects I’ve Built</h2>
        <ul>📝 TextEditor</ul><p>A clean and lightweight text editing tool with formatting features, ideal for writers and developers.</p>
        <ul>💰 SpendTrackr</ul><p>A personal finance app to help users track daily expenses and stay on budget.</p>


      </div>



    </div>
    
    
  )
}
export default Homepage;