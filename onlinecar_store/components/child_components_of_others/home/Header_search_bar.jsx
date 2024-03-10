import React,{useState} from "react";
import Link from "next/link";

const Header_search_bar = () => {

  const [search_text, setSearch_text] = useState('');


  return (
    <>
      <div className="home_search">
        <form onSubmit={(e) => e.preventDefault()} >
          <input type="text" value={search_text} onChange={(e)=>{setSearch_text((e.target.value).toLowerCase())}} placeholder="Car Make or Model eg: Toyota corolla in Lahore" />
         
         <Link href={search_text ? `/used-cars/search-car?text=${search_text}` : '#'}>
         <button>
            <i class="bx bx-search-alt-2"></i>
          </button>
          </Link>
        
        </form>
      </div>
    </>
  );
};

export default Header_search_bar;
