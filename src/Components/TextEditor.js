import { useFormState } from 'react-dom';
import PropTypes from 'prop-types'
import React, { useState } from 'react'
// export default function TextEditor(props)
export default function TextEditor({ showAlert }) {


    // const [alert, setAlert] = useState(null)

    //  const showAlert = (type, message)=>{
    //   setAlert({
    //     type:type,
    //     msg:message,  
    //   })


    //  }


    // const handleSave = () =>{
    // showAlert({ type: "success", msg :"Document saved!"})
    // }
    const [text, setText] = useState('Enter Text Here');
    const [mode, setMode] = useState('light'); //weather darkmode is available or not



    const HandleUpClick = () => {
        console.log("Uppercase was Clicked" + text);
        let newtext = text.toUpperCase();
        setText(newtext);
        showAlert("success", "Converted to Uppercase!");
    }
    const HandleLoClick = () => {
        console.log("LowerCase was Clicked" + text);
        let newtext = text.toLowerCase();
        setText(newtext);
        showAlert("success", "Converted to Lowercase!");

    }
    const HandleCaClick = () => {
        console.log("Capitalize was Clicked" + text);
        let newtext = text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        setText(newtext);
        showAlert("success", "Converted to Capitalize!");

    }
    const HandleOnChange = (event) => {
        console.log("on Change");
        setText(event.target.value)

    }

    // text = "new text" - Wrong way to change the state
    // setText("new text") - Wrong way to change the state

    return (
        <>
            <div>
                <div className="container">
                    {/* <h1>{props.heading}</h1> */}
                    <h2> Text Editor </h2>
                    <div className="mb-3">
                        {/* <label Htmlfor="Textarea1" className="form-label">Example textarea</label> */}
                        <textarea className="form-control" style={{backgroundColor:'lightgrey', color : 'black' }}  value={text} onChange={HandleOnChange} id="Textarea1" rows="8"></textarea>
                    </div>
                    <button className="btn btn-primary mx-3" onClick={HandleUpClick} showAlert={showAlert} >Convert to UpperCase</button>
                    <button className="btn btn-primary mx-3" onClick={HandleLoClick} >Convert to LowerCase</button>
                    <button className="btn btn-primary mx-3" onClick={HandleCaClick} >Convert to CapitalCase</button>
                    {/* <button className="btn btn-primary mx-3" onClick={handleSave} >Convert to save</button> */}

                </div>
            </div>
            <div className="container my-3">
                <h1> Text Summary </h1>
                <p>{text.split(" ").length} words and {text.length} Characters</p>
                <h2> Preview </h2>
                <p> {text}</p>

            </div>


        </>



    )
}
