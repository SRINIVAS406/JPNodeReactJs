import React from "react";
import HomeImage from "../Images/HomePage.jpg";
import "../Homepage.css";

export default function HomePage() {
  return (
    <div>
      <div className="wrapperCustom">
        <img src={HomeImage} className="homeImg" alt="HomePage of JoinPath" />
        <div className="wrapper">
          <h1 className="typing-demo">JoinPath</h1>
        </div>
      </div>
    </div>
  );
}
