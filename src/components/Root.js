import Navbar from "./Navbar";
import About from "./About";
// import Carousels from "./Carousels";
import React, { useState } from "react";
// import CarouselObj from "../JS_CSS/carousel/Carousel";
import Shiv from "../Images/FounderImages/Shiv.jpeg";
import Vinod from "../Images/FounderImages/Vinod.jpeg";
import Srinivas from "../Images/FounderImages/Srinivas3.gif";
import Swapnil from "../Images/FounderImages/Swapnil.jpeg";
import Satish from "../Images/FounderImages/Satish.jpeg";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Foundercard from "./Foundercard";
import Services from "./Services";
import Orgtree from "./Orgtree";
import Createtreenode from "./Createtreenode";

export default function Root() {
  //Founder Details
  const founderDesc = [
    { name: "Shivashankar", imgUrl: `${Shiv}` },
    { name: "Vinod", imgUrl: `${Vinod}` },
    { name: "Srinivas", imgUrl: `${Srinivas}` },
    { name: "Swapnil", imgUrl: `${Swapnil}` },
    { name: "Satish", imgUrl: `${Satish}` },
  ];

  // Toggle mode from light to dark
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  //   Carousel obj
  //   const carouselObj = [
  //     {
  //       srcurl: "../Images/CarouselImg/desktopsoftware.webp",
  //       title: "Wep App",
  //       shortDesc: "We build your buissiness app",
  //     },
  //     {
  //       srcurl: "../Images/CarouselImg/webdesign.webp",
  //       title: "Windows app",
  //       shortDesc: "We build software for you system",
  //     },
  //   ];
  return (
    <Router>
      <Navbar
        title="TextUtils"
        mode={mode}
        aboutText="About"
        toggleMode={toggleMode}
      ></Navbar>

      <div className="">
        {/* <About></About> */}

        {/* Swith code */}
        <Switch>
          {/* <Route exact path="/">
            <CarouselObj />
          </Route> */}
          <Route exact path="/">
            <HomePage />
            <Services></Services>
            <div className="d-flex justify-content-around mb-5 founderCardH">
              <Foundercard fobj={founderDesc[0]} />
              <Foundercard fobj={founderDesc[1]} />
              <Foundercard fobj={founderDesc[2]} />
              <Foundercard fobj={founderDesc[3]} />
              <Foundercard fobj={founderDesc[4]} />
            </div>
          </Route>
          <Route exact path="/team">
            <div id="ram"></div>
            <Orgtree />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/services">
            <Services />
          </Route>
          <Route exact path="/newfrd">
            <Createtreenode />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
