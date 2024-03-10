import React from "react";

const Search_bar = () => {


    function search(e){
        e.preventDefault();

    }

  return (
    <>
      <div className="search_bar_blogs">
        <form onSubmit={search}>
          <input type="search" placeholder="search"/>
          <button type="submit">Search</button>
        </form>
      </div>
    </>
  );
};

export default Search_bar;
