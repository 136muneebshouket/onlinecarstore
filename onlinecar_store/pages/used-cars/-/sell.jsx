import React from "react";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Sell = () => {
  return (
    <>
      <Head>
        <title>Sell my car</title>
        <meta name="description" content="Sell my car" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="sell_main">
        <div className="sell_header">
          <div className="header_title">
            <h1>Sell Your Car Online in Pakistan Instantly!</h1>
            <h2>Choose How To Sell Your Car</h2>
          </div>
          <div className="header_cards">
            <Link href="/used-cars/-/sell/post-ad" style={{textDecoration:'none'}}>
              <div className="card">
                <div>
                  <h2>Post your Ad on Carselection</h2>
                  <Image
                    src="/images/post_ad.jpg"
                    alt="loading"
                    width={200}
                    height={200}
                  />
                  <ul>
                    <li>
                      <span>
                        Post your Ad and find the offer from our buyers
                      </span>
                    </li>
                  </ul>{" "}
                  {/* <button> post an add</button> */}
                </div>
              </div>
            </Link>
            {/* <div className="card">
              <div>
                <h2>Post your Ad on Carselection</h2>
                <Image
                  src="/images/postad-img.png"
                  alt="loading"
                  width={200}
                  height={200}
                />
                <ul>
                  <li>
                    <span>&#10003;</span>{" "}
                    <span>Post your Ad for Free in 3 Easy Steps</span>
                  </li>
                  <li>
                    <span>&#10003;</span>{" "}
                    <span>Post your Ad for Free in 3 Easy Steps</span>
                  </li>
                  <li>
                    <span>&#10003;</span>{" "}
                    <span>Post your Ad for Free in 3 Easy Steps</span>
                  </li>
                </ul>
                <Link href="/used_cars/-/sell/Post_ad">
                  {" "}
                  <button> post an add</button>
                </Link>
              </div>
            </div> */}
          </div>
        </div>
        <div className="sellpage">
          <div className="body">
            <div className="container">
              <div className="divs">
                <h2>Why Sell Your Car On Carselection?</h2>
                <div className="cards">
                  <div className="card">
                    <Image
                      src="https://wsa1.pakwheels.com/assets/product/why-pw-icons/number-one-d6bd6d78a4fdfe2d5185bcaae6cce48e.svg"
                      alt="loading"
                      width={200}
                      height={200}
                    />
                    <p>automotive marketplace</p>
                  </div>
                  <div className="card">
                    <Image
                      src="https://wsa1.pakwheels.com/assets/product/why-pw-icons/number-one-d6bd6d78a4fdfe2d5185bcaae6cce48e.svg"
                      alt="loading"
                      width={200}
                      height={200}
                    />
                    <p>5 lac+ visitors daily</p>
                  </div>
                  <div className="card">
                    <Image
                      src="https://wsa1.pakwheels.com/assets/product/why-pw-icons/number-one-d6bd6d78a4fdfe2d5185bcaae6cce48e.svg"
                      alt="loading"
                      width={200}
                      height={200}
                    />
                    <p>3 million+ cars sold</p>
                  </div>
                  <div className="card">
                    <Image
                      src="https://wsa1.pakwheels.com/assets/product/why-pw-icons/number-one-d6bd6d78a4fdfe2d5185bcaae6cce48e.svg"
                      alt="loading"
                      width={200}
                      height={200}
                    />
                    <p>80% cars sold within 48 hours</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container background-grey">
              <div className="divs ">
                <h2>3 Simple Steps To Sell Your Car</h2>
                <div className="cards">
                  <div className="card steps">
                    <Image
                      src="https://wsa4.pakwheels.com/assets/product/why-pw-icons/sign-up-icon-d8e07682bbdee4b4f3c8983608f60b48.svg"
                      alt="loading"
                      width={200}
                      height={200}
                    />
                    <h3>Sign up</h3>
                    <p>Register yourself on Carselection.com to post an ad.</p>
                  </div>
                  <div className="card steps">
                    <Image
                      src="https://wsa4.pakwheels.com/assets/product/why-pw-icons/sign-up-icon-d8e07682bbdee4b4f3c8983608f60b48.svg"
                      alt="loading"
                      width={200}
                      height={200}
                    />{" "}
                    <h3>Sign up</h3>
                    <p>
                      Provide necessary details about your used car and make
                      sure to upload clear photos.
                    </p>
                  </div>
                  <div className="card steps">
                    <Image
                      src="https://wsa4.pakwheels.com/assets/product/why-pw-icons/sign-up-icon-d8e07682bbdee4b4f3c8983608f60b48.svg"
                      alt="loading"
                      width={200}
                      height={200}
                    />{" "}
                    <h3>Get Instant Offers</h3>
                    <p>
                      Relax & get ready for instant offers from genuine buyers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container ">
              <div className="divs ">
                <h2>3 Simple Steps To Sell Your Car</h2>
                <div className="cards upload_cars">
                  <div className="card q">
                    <Image
                      src="https://wsa1.pakwheels.com/assets/product/why-pw-icons/camera-icon-3d6be1bd26960de0f1a13359c9504c52.svg"
                      alt="loading"
                      width={200}
                      height={200}
                    />
                    <div>
                      <h3>Upload Good Quality Photos</h3>
                      <p>
                        Take photos in landscape mode. Ads with multiple good
                        quality images have 90% more views and are likely to be
                        sold faster.
                      </p>
                    </div>
                  </div>
                  <div className="card q">
                    <Image
                      src="https://wsa1.pakwheels.com/assets/product/why-pw-icons/camera-icon-3d6be1bd26960de0f1a13359c9504c52.svg"
                      alt="loading"
                      width={200}
                      height={200}
                    />
                    <div>
                      <h3>Upload Good Quality Photos</h3>
                      <p>
                        Take photos in landscape mode. Ads with multiple good
                        quality images have 90% more views and are likely to be
                        sold faster.
                      </p>
                    </div>
                  </div>
                  <div className="card q">
                    <Image
                      src="https://wsa1.pakwheels.com/assets/product/why-pw-icons/camera-icon-3d6be1bd26960de0f1a13359c9504c52.svg"
                      alt="loading"
                      width={200}
                      height={200}
                    />
                    <div>
                      <h3>Upload Good Quality Photos</h3>
                      <p>
                        Take photos in landscape mode. Ads with multiple good
                        quality images have 90% more views and are likely to be
                        sold faster.
                      </p>
                    </div>
                  </div>
                  <div className="card q">
                    <Image
                      src="https://wsa1.pakwheels.com/assets/product/why-pw-icons/camera-icon-3d6be1bd26960de0f1a13359c9504c52.svg"
                      alt="loading"
                      width={200}
                      height={200}
                    />
                    <div>
                      <h3>Upload Good Quality Photos</h3>
                      <p>
                        Take photos in landscape mode. Ads with multiple good
                        quality images have 90% more views and are likely to be
                        sold faster.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="divs more-padding">
                <h2>Sell Car Success Stories</h2>
                <div className="cards overflow">
                  <div className="card succes">
                    <iframe
                      height="200"
                      src="https://www.youtube.com/embed/HJ66Z9xHQFQ"
                      title="Mansoor Ali khan Sell Car Testimonial"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    ></iframe>
                  </div>
                  <div className="card succes">
                    <iframe
                      height="200"
                      src="https://www.youtube.com/embed/MRgBtH_xhrw"
                      title="Sell Testimonial Square"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    ></iframe>
                  </div>
                  <div className="card succes">
                    <iframe
                      height="200"
                      src="https://www.youtube.com/embed/yez5LEAzjkk"
                      title="Selling Cars On PakWheels Is A Piece Of Cake | PakWheels"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="divs more-padding">
                <h2>Interesting Tips</h2>
                <div className="cards overflow">
                  <div className="card">
                    <Image
                      src="https://wsa3.pakwheels.com/assets/product/why-pw-icons/tip-icon-4e7948fce88f053b4617071b89e3fff2.svg"
                      alt="loading"
                      width={200}
                      height={200}
                    />
                    <p>
                      Get your car repaired and fix any minor defects to
                      increase its resale value
                    </p>
                  </div>
                  <div className="card">
                    <Image
                      src="https://wsa3.pakwheels.com/assets/product/why-pw-icons/tip-icon-4e7948fce88f053b4617071b89e3fff2.svg"
                      alt="loading"
                      width={200}
                      height={200}
                    />
                    <p>
                      Set up a reasonable price as it will determine how long it
                      will take for your car to sell
                    </p>
                  </div>
                  <div className="card">
                    <Image
                      src="https://wsa3.pakwheels.com/assets/product/why-pw-icons/tip-icon-4e7948fce88f053b4617071b89e3fff2.svg"
                      alt="loading"
                      width={200}
                      height={200}
                    />
                    <p>
                      Beware of unrealistic offers and carry out safe
                      transactions to avoid being defrauded
                    </p>
                  </div>
                  <div className="card">
                    <Image
                      src="https://wsa3.pakwheels.com/assets/product/why-pw-icons/tip-icon-4e7948fce88f053b4617071b89e3fff2.svg"
                      alt="loading"
                      width={200}
                      height={200}
                    />
                    <p>
                      Get your car inspected by CarSelection to get premium
                      rates
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="container">
              <h2>Watch Our Guide For Selling A Car In Pakistan</h2>
              <div className="divs more-padding">
                <iframe
                  width="100%"
                  height="480"
                  src="https://www.youtube.com/embed/cXS9eq-Wb4w"
                  title="How to Post an Ad? | PakWheels App"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </div> */}
            <div className="container ">
              <div className="divs more-padding">
                <h2>Used Car Selling Tips And Advices</h2>
                <div className="cards overflow">
                  <div className="card q tips">
                    <img
                      className="tip-pic"
                      src="https://wsa2.pakwheels.com/assets/blog/advice-tips-4-e35da5a257377bd58718fc24da6fab16.png"
                      alt=""
                    />
                    <h3>How To Sell a Used Car Quickly- A Complete Guide!</h3>
                    <p>
                      Selling a used car is not an easy job these days. When you
                      consult a dealership, they suggest you a less comparative
                      price than the market, which is less than you expected. It
                      can easily disappoint you to a great extent. Don’t get
                      into any trap of selling your car...
                    </p>
                  </div>
                  <div className="card q tips">
                    <img
                      className="tip-pic"
                      src="https://wsa4.pakwheels.com/assets/blog/advice-tips-2-57ac5901581434690ea7530076e678bd.png"
                      alt=""
                    />{" "}
                    <h3>
                      5 Things You Should Take Care Of Before Selling Your Car
                    </h3>
                    <p>
                      We all talk about the things you must check before buying
                      a used car. But let’s talk about things you should do
                      before selling car in pakistan. If you are selling it on
                      the basis of ‘as it is’ and have mentioned it in the ad as
                      well, then no point doing anything to...
                    </p>
                  </div>
                  <div className="card q tips">
                    <img
                      className="tip-pic"
                      src="https://wsa3.pakwheels.com/assets/blog/advice-tips-5-8d33beb1925b750f4a8e4b906721b4db.png"
                      alt=""
                    />{" "}
                    <h3>Here’s How You Can Contact CarSelection Services</h3>
                    <p>
                      So you have decided to sell your car online, but you are
                      thinking about how to create an effective ad that will
                      make your car stand out from the crowd. Setting up a good
                      ad for your car requires a lot of time and effort, but
                      that time and effort will be worth it, as, in the end, you
                      can earn quite a good price for your car.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sell;
