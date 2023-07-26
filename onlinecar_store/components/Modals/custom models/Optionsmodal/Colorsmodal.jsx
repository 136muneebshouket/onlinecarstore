import React, { useEffect ,useState} from 'react'
import colors from '@/components/carsdata/colors';

const Colorsmodal = ({onClose,  carrdata}) => {
  const [colours, setColours] = useState([]);

  useEffect(()=>{
    setColours(colors)
  },[])
  
  const addcolor=(obj)=>{
   carrdata(obj)
   onClose();
  }
  return (
  
    <>
     
      <div className="cars_options">
        {colours.map((obj) => {
          return (
            <>
              <div className="car_option">
                <p
                  style={{ margin: "4px" }}
                  className="carmodel_name"
                  key={obj.colorname}
                  onClick={() => {
                    addcolor(obj);
                  }}
                >
                  {obj.colorname} <span className='color_code' style={{background:`${obj.colorcode}`}}></span>
                </p>
              </div>
            </>
          );
        })}
      </div>
    
   </>
  )
}

export default React.memo(Colorsmodal);
