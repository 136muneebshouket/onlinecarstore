import React from 'react'
import Image from 'next/image'
import Order_service_form from '@/components/child_components_of_others/service_order_form/Order_service_form'

const Sell_it_for_me = () => {
  return (
    <>
         <div className="main_inspection">
        <div className="header_inspection">
          <div className="img_div">
            <Image
              src="/images/car-inspection_header.webp"
              width={100}
              height={100}
              // quality={80}
              unoptimized={true}
              alt="inspectionbanner.png"
            />
          </div>
          <div className="formsection">
            <Order_service_form heading={'Get your car registered in CarSelection Sell It For Me'} />
          </div>
        </div>

        <div className="second_div">
          <div className="inspec_includes">
            <h2>What our Inspection report includes ?</h2>
            <div className="cards">
              <div className="card">
                <Image
                  src={"/images/icons8-car-service-webp.webp"}
                  unoptimized={true}
                  width={100}
                  height={100}
                  alt="Overall Condition Analysis"
                />
                <div>
         
                <strong>Dedicated Sales Representative</strong>
                <p>Our specialized sales representatives are dedicated to sell each car efficiently.</p>
          
                </div>
              
              </div>
              <div className="card">
                <Image
                  src={"/images/icons8-car-100.webp"}
                  unoptimized={true}
                  width={100}
                  height={100}
                  alt="Car Exterior and Interior"
                />
                 <div>
                 <strong>Zero Hassle:</strong> 
                 <p>Experience All you need to do is sign up.</p>
                </div>
               
              </div>
              <div className="card">
                <Image
                  src={"/images/icons8-car-inspection-webp.webp"}
                  unoptimized={true}
                  width={100}
                  height={100}
                  alt="Overall health of car"
                />
                <div>
                <strong>Get the Best Price</strong>
                <p>We work tirelessly to secure the highest offer, ensuring you.</p>
                </div>
               
              </div>
              <div className="card">
                <Image
                  src={"/images/icons8-car-check-webp.webp"}
                  unoptimized={true}
                  width={100}
                  height={100}
                  alt="Overall ranking per equipment"
                />
                 <div>
                 <strong>Secure Transaction</strong> 
                 <p>Rest assured with our guarantee, ensuring timely receipt of your funds.</p>
                </div>
                
              </div>
            </div>
          </div>

          {/* <div className="who_it_works">
            <h2>How CarSelection Inspection works ?</h2>
            <div className="Cards"> */}
              {/* {data.map((d) => (
                <div key={d} className="card">
                  <Image
                    src={d.cardImage}
                    className="cardImage"
                    height={100}
                    width={300}
                    alt="Car Inspection Test"
                  />
                  <div className="cardData">
                    <h2 className="cardHeading">
                      <strong>{d.heading}</strong>
                    </h2>
                    <p className="cardContent">{d.content}</p>
                  </div>
                </div>
              ))} */}
            {/* </div> */}
          {/* </div> */}
        </div>
      </div>
    </>
  )
}

export default Sell_it_for_me
