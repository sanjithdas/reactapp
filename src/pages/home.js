/**
 * @author [Sanjith]
 * @email [sanjith.das@gmail.com]
 * @create date 2020-10-22 16:35:39
 * @modify date 2021-04-06 21:35:00
 * @desc [Home page,  included components - HeaderImage, Rooms , Blogs ]
 */
import React from "react";
import { HeaderImage } from "../components/HeaderImage";

export const Home = () => {
  return (
    <div>
      <section className="ftco-booking ftco-section ftco-no-pt ftco-no-pb">
        <div className="container"></div>
      </section>

      <section className="mt-4">
        <div className="container">
          <div className="row justify-content-center mb-5 pb-3">
            <div className="heading-section text-center ">
              <span className="htl-title-text">Welcome </span>
              <div className="item-header-img1 mt-3"></div>
            </div>
            <HeaderImage />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
