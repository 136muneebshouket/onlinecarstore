import React from 'react'
import Link from 'next/link'

const Home = () => {
  return (
   <>
   <div className="home_main">
    <div className="home_header">
        <div className="header_content">
            <div className="header_title">
                <h1>Find Used Cars in Pakistan</h1>
                <p>With thousands of cars, we have just the right one for you</p>
            </div>
            <div className="home_search">
                <input type="text" name="" id="" placeholder='Car Make or Model'/>
                <select name="All Cities" id="">
                    <option value="">Cities</option>
                </select>
                <select name="Price Range" id="">
                    <option value="">Range</option>
                </select>
              <div className="icon_search">
              <i className='bx bx-search'></i>
              </div>

            </div>
            <div className="advance_searchbtn">
            <Link  href="/used_cars/Search_car">
                Advance Search &gt;
                </Link>
            </div>
        </div>
    </div>
   </div>
   </>
  )
}

export default Home
