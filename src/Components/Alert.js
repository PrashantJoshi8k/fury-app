import React from 'react'

export default function Alert(props) {

  const capitalize = (word)=>{
const lower = word.toLowerCase();
return lower.charAt(0).toUpperCase() + lower.slice(1);
  }




  return (
    props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role='alert' > 
    <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
    <button type='button' className="btn-close" data-bs-dismiss= "alert" aria-label='close'></button>
        </div>



  )
}
