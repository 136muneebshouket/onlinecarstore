import React, { useRef, useState, useContext } from "react";
import Upload_dents from "./modals/Upload_dents";
import All_faults from "./car_faults_fetch/All_faults";
import Image from "next/image";
import Context from "@/components/processing_functions/context";
import Del_faults from "./modals/Del_faults";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data.payload);
const Car_img = () => {

  let cords = [
    {
      title: "hood",
      href: "#hood",
      alt: "-14",
      coords:
        "404,241,384,281,485,271,494,224,493,178,482,134,435,129,387,128,401,154,407,191,406,218",
    },
    {
      title: "front_right_fender",
      href: "#front_right_fender",
      alt: "-5",
      // coords:
      //   "311,277,369,320,367,390,391,343,420,335,446,352,451,381,494,381,491,327,390,310,343,286",
      coords:"369,317,395,312,418,317,446,322,475,327,492,343,493,375,480,379,465,380,453,379,447,360,441,348,425,339,402,336,387,346,379,359,377,374,366,376"
    },
    {
      title: "frontbumper",
      href: "#front_bumper",
      alt: "frontbumper",
      coords: "503,130,502,283,552,282,552,127,523,122",
    },
    {
      title: "front_right_door",
      href: "#front_right_door",
      alt: "-5",
      coords:
        "332,378,295,378,258,377,257,323,249,272,279,274,304,281,345,306,357,323,357,377",
    },
    {
      title: "rear_right_door",
      href: "#rear_right_door",
      alt: "-5",
      coords:
        "171,271,153,319,154,337,173,354,182,377,218,378,250,377,249,325,242,271,207,269",
    },
    {
      title: "back_right_fender",
      href: "#back_right_fender",
      alt: "-5",
      // coords:
      //   "51,307,47,342,39,357,48,379,99,378,103,355,123,338,145,338,142,312,152,288,159,270,118,283,78,305",
      coords:
        "51,308,43,354,47,375,96,376,106,347,129,337,144,339,139,322,142,312",
    },
    {
      title: "back_bumper",
      href: "#back_bumper",
      alt: "",
      coords:
        "1,127,3,147,6,167,5,194,5,218,5,241,1,275,27,288,40,277,41,132,29,122",
    },
    {
      title: "trunk",
      href: "#trunk",
      alt: "-10",
      coords: "56,129,48,176,47,219,52,260,61,279,107,266,101,189,107,139",
    },
    {
      title: "roof",
      href: "#roof",
      alt: "roof",
      coords: "160,145,154,196,159,260,316,259,319,198,314,143",
    },
    {
      title: "right_panel",
      href: "#right_panel",
      alt: "-2",
      coords: "178,385,356,384,356,401,173,400",
    },
    {
      title: "front_left_fender",
      href: "#front_left_fender",
      alt: "-5",
      // coords:
      //   "364,31,367,64,366,86,352,103,334,111,305,130,332,127,387,100,417,93,453,87,483,76,497,56,494,26,453,24,443,55,422,69,397,66,382,48,378,33",
      coords:
        "390,96,369,91,366,32,377,35,383,53,395,65,406,68,421,68,437,61,446,48,450,33,457,25,474,28,487,28,491,35,491,45,491,57,488,67,480,75,468,82",
    },
    {
      title: "front_left_door",
      href: "#front_left_door",
      alt: "-5",
      coords:
        "254,29,259,51,258,79,253,107,250,134,293,130,341,101,357,85,356,50,352,29",
    },
    {
      title: "rear_left_door",
      href: "#rear_left_door",
      alt: "-5",
      coords: "182,30,154,71,156,94,162,114,172,136,242,136,249,76,247,29",
    },
    {
      title: "left_panel",
      href: "#left_panel",
      alt: "-2",
      coords: "172,6,178,23,357,22,356,6",
    },
    {
      title: "back_left_fender",
      href: "#back_left_fender",
      alt: "-5",
      // coords:
      //   "44,30,40,52,50,72,48,100,80,103,119,124,159,137,143,91,144,69,120,68,100,49,97,31",
      coords:
        "51,31,69,31,98,32,107,59,130,71,144,67,139,85,143,97,126,95,114,96,83,100,66,99,55,97,49,87,50,67,42,45",
    },
    {
      title: "right_front_wheel",
      href: "#right_front_wheel",
      alt: "right_front_wheel",
      coords:
        "418,341,396,346,384,360,383,386,398,401,425,405,444,390,445,363,433,346",
    },
    {
      title: "back_right_wheel",
      href: "#back_right_wheel",
      alt: "back_right_wheel",
      coords:
        "121,343,105,358,104,381,114,401,140,405,165,392,168,368,154,347,138,340",
    },
    {
      title: "left_front_wheel",
      href: "#left_front_wheel",
      alt: "left_front_wheel",
      coords: "393,6,383,25,384,46,401,62,425,64,443,48,446,25,435,9,417,0",
    },
    {
      title: "back_left_wheel",
      href: "#back_left_wheel",
      alt: "back_left_wheel",
      coords: "111,6,102,29,110,54,129,64,154,62,168,42,164,18,152,6,134,0",
    },
    {
      title: "front_screen",
      href: "#front_screen",
      alt: "front_screen",
      coords:
        "321,144,326,191,326,228,320,259,379,277,393,237,397,190,389,151,377,129",
    },
    {
      title: "back_screen",
      href: "#back_screen",
      alt: "back_screen",
      coords:
        "117,140,112,174,111,212,116,248,116,267,151,259,146,210,150,144",
    },
    {
      title: "right_a_piller",
      href: "#right_a_piller",
      alt: "-3",
      coords:
        "311,277,367,315,391,311,328,278",
    },
    {
      title: "right_b_piller",
      href: "#right_b_piller",
      alt: "-3",
      coords:
        "239,275,244,315,259,316,252,273",
    },
    {
      title: "right_c_piller",
      href: "#right_c_piller",
      alt: "-3",
      coords:
        "78,307,112,308,127,294,140,286,156,272,125,282",
    },
    {
      title: "left_a_piller",
      href: "#left_a_piller",
      alt: "-3",
      coords:
        "366,90,388,96,365,107,345,118,330,124,309,131,339,112",
    },
    {
      title: "left_b_piller",
      href: "#left_b_piller",
      alt: "-3",
      coords:
        "244,92,258,91,252,133,239,132",
    },
    {
      title: "left_c_piller",
      href: "#left_c_piller",
      alt: "-3",
      coords:
        "79,100,113,97,119,106,132,115,141,123,157,133,134,127,105,114",
    },
  ];


  const { message, setMessage } = useContext(Context);
  const router = useRouter();
  const Ad_id = router.query.Ad_id;

  const { data, error, isLoading, mutate } = useSWR(
    `/api/admin/inspection/start_inspec/body_Fualts/get_faults?Ad_id=${Ad_id}`,
    fetcher
  );

  const circleref = useRef();
  const imgRef = useRef(null);
  // const [Positions, setPositions] = useState({
  //   left: "",
  //   top: "",
  // });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isdelModalOpen, setIsdelModalOpen] = useState(false);
  const [modalvalue, setModalvalue] = useState("");
  const [delindex, setDelindex] = useState(null);

  async function click(e) {
    e.preventDefault();
    if(!(e.target.title)){
      return
    }
    console.log(e.target.title , e.target.alt)
 
    const imgRect  = imgRef.current.getBoundingClientRect();
    const x = ((e.nativeEvent.offsetX / imgRect.width)* 100) +  99.5;
    const y = (e.nativeEvent.offsetY / imgRect.height) * 100;
    let div = document.getElementById("link");
    let Positions = {
      left: `${x}`,
      top: `${y}`,
    };
    let Part_num_cut = undefined
    let Part_name = e.target.title
    if(!(isNaN(e.target.alt))){
      Part_num_cut = Number(e.target.alt)
    }
    // setPositions({ ...Positions, left: `${x}`, top: `${y}` });
    setModalvalue({ Positions, Ad_id , Part_num_cut , Part_name });
    setIsModalOpen(true);

    div.style.left = `${x}%`;
    div.style.top = `${y}%`;
    // openmodal()
    // console.log(x,y)
  }

  async function delete_fault(obj) {
    setDelindex(obj);
    setIsdelModalOpen(true);
  }

  // console.log(data)
  return (
    <>
      <div className="car_inspec_img">
        <div
          className="img_div"
          ref={imgRef}
          onDoubleClick={(e) => click(e)}
        >
          <div class="img_link" ref={circleref} id="link"></div>
          <img src="/images/car_skeleton.jpg" alt="" usemap="#image-map"/>
          
          <map name="image-map">
            {cords.map((v)=>{
              return <>
              <area onDoubleClick={(e) => click(e)}  shape="poly" coords={v.coords}  alt={v.alt} href={v.href} title={v.title} />
              </>
            })}
          </map>

          {data?.map((v, index) => {
            return (
              <>
                <div
                  class="img_link"
                  id="link"
                  style={{
                    left: `${v?.positions.left}%`,
                    top: `${v?.positions.top}%`,
                    background: `${v.positions ? "transparent" : ""}`,
                  }}
                  onClick={() => {
                    delete_fault({ v, index });
                  }}
                >
                  <b>{v.type}</b>
                </div>
              </>
            );
          })}

        </div>
      </div>

      <All_faults Ad_id={Ad_id} data={data} />

      {isModalOpen && (
        <Upload_dents
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          modalvalue={modalvalue}
          refresh={() => {
            mutate();
          }}
        />
      )}
      {isdelModalOpen && (
        <Del_faults
          isOpen={isdelModalOpen}
          onClose={() => {
            setIsdelModalOpen(false);
          }}
          delindex={delindex}
          refresh={() => {
            mutate();
          }}
        />
      )}
    </>
  );
};

export default Car_img;
