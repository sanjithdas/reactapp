/**
 * @author [Sanjith]
 * @email [sanjith.das@gmail.com]
 * @create date 2020-10-23 12:48:22
 * @modify date 2021-04-07 11:12:04
 * @desc [About page]
 */

import React from "react";

/**
 * custom component insert
 */
import HeaderImage from "../components/HeaderImage";
const About = () => {
  return (
    <section className="mt-4">
        <div className="container">
          <div className="row justify-content-center mb-5 pb-3">
            <div className="heading-section text-center ">
              <span className="htl-title-text" >About Us </span>
              <div className="item-header-img1 mt-3"></div>
            </div>
            <HeaderImage  />
          </div>
        </div>
      </section>
  );
};

export default About;
