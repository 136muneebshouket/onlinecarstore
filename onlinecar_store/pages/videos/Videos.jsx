import React from "react";
import Cat_component from "./catogery_component/Cat_component";

const Videos = () => {
  return (
    <>
      <div className="main_videos">
        <div className="videos_header">
          <div className="container">
            <h1>Carselection Videos</h1>
            <div className="search_bar">
              <input type="text" />
              <button>search</button>
            </div>
          </div>
        </div>
        <Cat_component catgry={"Owner's Reviews"}/>
        <Cat_component catgry={"Success Stories"}/>
      </div>
    </>
  );
};

export default Videos;
