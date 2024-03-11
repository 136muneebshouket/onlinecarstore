import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Count_views = ({ views }) => {
  const router = useRouter();
  const [view, setView] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    let url = router.asPath.split("/");
    let slug = url[url.length - 1];
    if (views != undefined) {
      track_views(slug);
    }
  }, []);

  async function track_views(slug) {
    setLoader(true);
    await axios
      .post(`/api/update_add/view_count`, { slug, current_view: views + 1 })
      .then((res) => {
        setLoader(false);
        setView(res.data.views);
      })
      .catch(() => {
        console.error("Error in counting views");
        setLoader(false);
      });
  }

  return (
    <>
      <div className="view_count" style={{color:'brown'}}>
        {loader ? (
          <i className="bx bx-loader sm_loder"></i>
        ) : (
          <>
            <span>&#128065;</span> <span>{view}</span>
          </>
        )}
      </div>
    </>
  );
};

export default Count_views;
