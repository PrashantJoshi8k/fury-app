import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div>
      <h1>Homepage</h1>
      <Link to="/contact">Go to Contact Page</Link>
    </div>
  )
}
export default Homepage;