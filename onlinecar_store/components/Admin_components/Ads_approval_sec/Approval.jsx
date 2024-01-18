import React, { useState, useMemo, useContext } from "react";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import Context from "@/components/processing_functions/context";
import Ad_section from "./Ad_sec/Ad_section";

const fetcher = (url) => axios.get(url).then((res) => res.data.payload);

const Approval = () => {
  const { message, setMessage } = useContext(Context);

  const [sidebar, setSidebar] = useState(true);
  const [ads, setAds] = useState([]);
  const [single_ad, setSingle_ad] = useState();

  const { data, error, isLoading, mutate } = useSWR(
    `/api/admin/Ad_approval/get_pending_ads`,
    fetcher
  );

  const fetch = useMemo(() => {
    if (isLoading) {
      setMessage({ loader: true });
    }
    if (data) {
      setAds(data);
      // console.log(data)
      setMessage({ loader: false });
    }
    if (error) {
      setMessage({ success: false, msg: error });
      setMessage({ loader: false });
    }
  }, [data, error, isLoading]);

  async function getsingle_ad(ad_id) {
    setMessage({ loader: true });
    await axios
      .get(`/api/Singlecardata/?id=${ad_id}`)
      .then((result) => {
        setSingle_ad(result.data.data);
        setMessage({ loader: false });
        // console.log(single_ad)
      })
      .catch((err) => {
        setMessage({ success: false, msg: err?.response?.data.message });
        setMessage({ loader: false });
      });
  }
  async function refetch() {
    await mutate();
    setSingle_ad();
  }

  return (
    <>
      {/* <h2>Approval section</h2> */}
      <div
        className="sidebar_btn_div"
        style={{ display: "flex", justifyContent: "end" }}
      >
        <button
          onClick={() => {
            setSidebar(!sidebar);
          }}
          style={{ float: "right" }}
          className="sidebar_btn"
        >
          <span>&#10563;</span>
        </button>
      </div>

      <div className="approval_ads_sec">
        <div
          className="ad_details"
          style={{ width: `${sidebar ? "50%" : "100%"}` }}
        >
          {single_ad && (
            <Ad_section single_ad_data={single_ad} reset={refetch} />
          )}
        </div>
        <div
          className="ads_sidebar"
          style={{ width: `${sidebar ? "50%" : "0%"}` }}
        >
          <h3 style={{ textAlign: "center" }}>Pending Ads</h3>
          {ads?.map((v) => {
            return (
              <>
                <div key={v._id} className="single_ad">
                  <p
                    onClick={() => {
                      getsingle_ad(v._id);
                    }}
                    className="ad_heading"
                  >
                    {v.brand} {v.model} {v?.variant_name} {v.modelyear}
                  </p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Approval;
