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

            <div className="container" > {/*style={darkmode} was added for div darkmode test*/}
                <h1>Contact Us</h1>
                <p>i’d love to hear from you! Reach out using the info below or the contact form.</p>

                {/* Contact Info Section */}
             <div className="contact-info">
                {/* <p><strong>Address:</strong> India </p> */}
                <p><strong>Phone:</strong> <a href="tel:+91 9607768658">(+91) 9607768658</a></p>
                <p><strong>Email:</strong> <a href="prashantjoshi.8k@gmail.com">prashantjoshi.8k@gmail.com</a></p>
                {/* <p><strong>Hours:</strong> Mon–Fri, 9 AM – 6 PM</p> */}
            </div>

                {/* <button onClick={toggleStyle} type="button" className="btn btn-primary my-3">{btntext}</button> */}

            </div>


        </>
    )
}

export default Contact;
