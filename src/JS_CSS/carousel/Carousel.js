import axios from "axios";
import React, { useState, useEffect } from "react";
import Carousels from "../../components/Carousels";

const baseURL = "http://localhost:4000/posts";

export default function Carousel() {
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
      // console.log("From Carousels.js Response Data : " + response.data);
    });
  }, []);

  if (!post) return null;

  return (
    <div>
      <Carousels carouselObj={post}></Carousels>
    </div>
  );
}
