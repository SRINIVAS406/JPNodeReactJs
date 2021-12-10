import React, {useState} from 'react'

export default function TextForm(props) {
    const handleUpClick = ()=>{
        setText(text.toUpperCase());
        console.log(text);
    }
    const handleOnChange = (event)=>{
        setText(event.target.value);
    }
    const [text, setText] = useState("Enter text here");

    return (
        <>
        <div className="Container">
            <div className="mb-3">
            <label htmlFor="myBox" className="form-label"><h1>{props.heading}</h1></label>
            <textarea className="form-control" id="myBox" onChange={handleOnChange} value = {text} rows="3"></textarea>
            </div>
            <button className="btn btn-primary" onClick={handleUpClick}>Convert to Uppercase</button>
        </div>
        <div className="Container my-3">
            <h1>Your text summary</h1>
            <p>{text.split(' ').length} words and {text.length} charecters</p>
        </div>
        </>
    )
}
