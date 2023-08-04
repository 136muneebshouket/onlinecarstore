import React,{useState} from 'react'

const FeaturesModal = ({carrdata}) => {

    const features = [
        "ABS",
        "Air Bags",
        "Air Conditioning",
        "Alloy Rims",
        "AM/FM Radio",
        "CD Player",
        "Cassette Player",
        "Cool Box",
        "Cruise Control",
        "Climate Control",
        "DVD Player",
        "Front Speakers",
        "Front Camera",
        "Heated Seats",
        "Immobilizer Key",
        "Keyless Entry",
        "Navigation System",
        "Power Locks",
        "Power Mirrors",
        "Power Steering",
        "Power Windows",
        "Rear Seat Entertainment",
        "Rear AC Vents",
        "Rear Speakers",
        "Rear Camera",
        "Sun Roof",
        "Steering Switches",
        "USB and Auxillary Cable",
      ]

      const [featurearr, setFeaturearr] = useState([]);

      const addfeature = (value) => {
        if (featurearr.includes(value)) {
          // If value exists in the array, remove it
          const filteredArray = featurearr.filter((item) => item !== value);
          setFeaturearr(filteredArray);
          carrdata(filteredArray); // Pass the updated array directly to carrdata function
        } else {
          // If value doesn't exist in the array, add it
          const updatedArray = [...featurearr, value];
          setFeaturearr(updatedArray);
          carrdata(updatedArray); // Pass the updated array directly to carrdata function
        }
      };
      
// console.log(featurearr)

  return (
    <>
     <div className="input_field">
                    <i className="bx bxs-car"></i>
                    <div style={{width:'100%'}}>
                      <label htmlFor="">Features</label>
                      <div style={{display:'flex',flexDirection:'unset' }}
                      className='features_div'>
                        {features.map((v,index)=>{
                         return<>
                         <div key={index} className='single_feature' style={{display:'flex' ,flexDirection:'row',alignItems:'center', width:'30%'}}>
                         <input style={{width:'15px', height:'15px',margin:'10px 7px'}} type="checkbox" id="fetchere" name="vehicle1" onClick={()=>{addfeature(v)}} />
                         <label >{v}</label>
                         </div>
                         </>
                        })

                        }
                     </div>
                    </div>
                   
                  </div>
                 
    </>
  )
}

export default FeaturesModal
