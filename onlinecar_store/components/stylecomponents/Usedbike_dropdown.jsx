import Link from "next/link";
import React from "react";

const Usedbike_dropdown = ({toggle}) => {
  return (
    <>
      <div style={{height:`${toggle ? 'auto': ''}`}} className="usedcar_dropdown">
        <div className="first_div">
            <Link href={'/used_bikes/Search_bikes'} className="option">
                <i>&#9906;</i>
                <div> <p>Find Used Bikes For Sale</p>
                <span>Search over 10k used Bikes</span></div>
            </Link>
            <Link href={'#'} className="option">
                <i>&#9906;</i>
                <div> <p>Featured Used Bikes</p>
                <span>Coming Soon</span></div>
            </Link>
            <Link href={'/used_bikes/sell/Post_ad'} className="option">
                <i>&#9906;</i>
                <div> <p>Sell Your Bike</p>
                <span>Post Ad and Sell Your Bike</span></div>
            </Link>
           
           
        </div>
        {/* <div className="first_div">
            <Link href={'#'} className="option">
                <i>&#9906;</i>
                <div> <p>CarSelection Certified Cars</p>
                <span>Coming soon</span></div>
            </Link>
            <Link href={'#'} className="option">
                <i>&#9906;</i>
                <div> <p>CarSelection Sell it for me</p>
                <span>Coming soon</span></div>
            </Link>
            <Link href={'#'} className="option">
                <i>&#9906;</i>
                <div> <p>CarSelection Car Incpection</p>
                <span>Coming soon</span></div>
            </Link>
            <Link href={'#'} className="option">
                <i>&#9906;</i>
                <div> <p>CarSelection Rent a Car</p>
                <span>Coming soon</span></div>
            </Link>
        </div> */}
        {/* <div className="first_div">
            <h5 style={{whiteSpace:'nowrap'}}>Popular Cities</h5>
            <Link href={'/used_cars/Search_car?filters={"city":["Karachi"]}'} className="option">
                 <p>Karachi</p>
            </Link>
            <Link href={'/used_cars/Search_car?filters={"city":["Lahore"]}'} className="option">
                 <p>Lahore</p>
            </Link>
            <Link href={'/used_cars/Search_car?filters={"city":["Islamabad"]}'} className="option">
                 <p>Islamabad</p>
            </Link>
            <Link href={'/used_cars/Search_car?filters={"city":["Rawalpindi"]}'} className="option">
                 <p>Rawalpindi</p>
            </Link>
            <Link href={'/used_cars/Search_car?filters={"city":["Peshawar"]}'} className="option">
                 <p>Peshawar</p>
            </Link>
            <Link href={'/used_cars/Search_car?filters={"city":["22Faisalabad"]}'} className="option">
                 <p>Faisalabad</p>
            </Link>
            <Link href={'/used_cars/Search_car?filters={"city":["Multan"]}'} className="option">
                 <p>Multan</p>
            </Link>
            <Link href={'/used_cars/Search_car?filters={"city":["Gujranwala"]}'} className="option">
                 <p>Gujranwala</p>
            </Link>
            
        </div> */}
        <div className="first_div">
            <h5 style={{whiteSpace:'nowrap'}}>Popular Models</h5>
            <Link href={'/used_cars/Search_car?filters={"brand":["Toyota"],"model":["Corolla"]}'} className="option">
                 <p>Toyata Corolla</p>
            </Link>
            <Link href={'/used_cars/Search_car?filters={"brand":["Honda"],"model":["Civic"]}'} className="option">
                 <p>Honda Civic</p>
            </Link>
            <Link href={'/used_cars/Search_car?filters={"brand":["Honda"],"model":["City"]}'} className="option">
                 <p>Honda City</p>
            </Link>
            <Link href={'/used_cars/Search_car?filters={"brand":["Honda"],"model":["City"]}'} className="option">
                 <p>Karachi</p>
            </Link>
            <Link href={'/used_cars/Search_car?filters={"brand":["Suzuki"],"model":["Cultus"]}'} className="option">
                 <p>Suzuki Cultus</p>
            </Link>
            <Link href={'/used_cars/Search_car?filters={"brand":["Suzuki"],"model":["Mehran"]}'} className="option">
                 <p>Suzuki Mehran</p>
            </Link>
            <Link href={'/used_cars/Search_car?filters={"brand":["Toyota"],"model":["Vitz"]}'} className="option">
                 <p>Toyota Vitz</p>
            </Link>
            <Link href={'/used_cars/Search_car?filters={"brand":["Suzuki"],"model":["Alto"]}'} className="option">
                 <p>Suzuki Alto</p>
            </Link>
            
        </div>
      </div>
    </>
  );
};

export default Usedbike_dropdown;
