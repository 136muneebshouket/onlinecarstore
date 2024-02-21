import React from "react";

const Ad_new_blog = () => {
  return (
    <>
      <div className="blog_upload">
        <h2>Add new blogs</h2>

        <div className="form_blog">
          
          <div className="form_input">
            <label>Title</label>
            <input type="text" />
          </div>

          <div className="form_input">
            <label>Upload img</label>
            <input type="file" />
          </div>

          <div className="form_input">
            <label>Keywords</label>
            <input type="text" />
          </div>

          <div className="form_input">
            <label>Author</label>
            <input type="text" />
          </div>

          <div className="form_input">
            <label>Type</label>
            <select name="" id="">
              <option value="news">news</option>
              <option value="opinions">opinions</option>
              <option value="car-reviews">car-reviews</option>
              <option value="cars-in-pakistan">cars-in-pakistan</option>
            </select>
          </div>



          


        </div>
      </div>
    </>
  );
};

export default Ad_new_blog;
