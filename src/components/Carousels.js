import React from "react";
import "../JS_CSS/carousel/carousel.css";

export default function Carousels(props) {
  // build dynamic content
  // buttons create dynamic
  var butArr = [];
  const crslImg = [];
  for (let i = 1; i <= props.carouselObj.length; i++) {
    if (i === 1) {
      butArr.push(
        <button
          key={"btn" + i}
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label={`Slide ${i}`}
        ></button>
      );

      crslImg.push(
        <div className="carousel-item active" key={"url" + i}>
          <img
            src={`${props.carouselObj[i - 1].srcurl}`}
            className="carouselimg d-block w-100"
            alt="carouselImge"
          />
          <div className=" carousel-caption d-none d-md-block mb-5">
            <h5>{props.carouselObj[i - 1].title}</h5>
            <p>{props.carouselObj[i - 1].shortDesc}</p>
          </div>
        </div>
      );
    } else {
      butArr.push(
        <button
          key={"btn" + i}
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to={i - 1}
          aria-label={`Slide ${i}`}
        ></button>
      );

      crslImg.push(
        <div className="carousel-item" key={"url" + i}>
          <img
            src={`${props.carouselObj[i - 1].srcurl}`}
            className="carouselimg d-block w-100"
            alt="..."
          />
          <div className=" carousel-caption d-none d-md-block mb-5">
            <h5>{props.carouselObj[i - 1].title}</h5>
            <p>{props.carouselObj[i - 1].shortDesc}</p>
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {/* get buttons from above button variable */}
          {butArr}
        </div>
        <div className="carousel-inner">
          {/* get image path from above crslImg variable */}
          {crslImg}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
