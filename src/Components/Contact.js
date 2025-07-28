import { useFormState } from 'react-dom';
import React, { useState } from 'react';




function Contact() {


const [darkmode,setDarkmode] = useState({
    color: 'black',
    backgroundColor: 'white'

})

const [btntext,setBtnText] = useState("Enable Darkmode")



const toggleStyle = ()=>{
if (darkmode.color === 'black'){
setDarkmode({
    color: 'white',
    backgroundColor: 'black'

})
setBtnText("Enable Lightmode");
}
else{
    setDarkmode({
        color: 'black',
        backgroundColor: 'white'
    })
    setBtnText("Enable Darkmode");
    
}
}




    return (
        <>

            <div className="container" style={darkmode}>
                <h1>Contact Us</h1>
                <p>We’d love to hear from you! Reach out using the info below or the contact form.</p>

                {/* Contact Info Section */}
                <div className="contact-info">
                    <p><strong>Address:</strong> 1234 Main St, Cityville, Country</p>
                    <p><strong>Phone:</strong> <a href="tel:+1234567890">+1 (234) 567-890</a></p>
                    <p><strong>Email:</strong> <a href="mailto:info@example.com">info@example.com</a></p>
                    <p><strong>Hours:</strong> Mon–Fri, 9 AM – 6 PM</p>
                </div>
                <button onClick={toggleStyle} type="button" className="btn btn-primary my-3">{btntext}</button>

            </div>


        </>
    )
}

export default Contact;
