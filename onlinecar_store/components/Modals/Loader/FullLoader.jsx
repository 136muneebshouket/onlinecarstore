import React, { useEffect ,useState} from "react";

const FullLoader = () => {
  const [rotate, setRotate] = useState(false);

  useEffect(()=>{
setRotate(true)
  },[])

  return <>
  <div className="fullLoader">
    {/* <div className="loader"> */}
    {rotate && <i className='bx bx-loader-alt'></i>}
    {/* </div> */}
  </div>
  </>;
};

export default FullLoader;
