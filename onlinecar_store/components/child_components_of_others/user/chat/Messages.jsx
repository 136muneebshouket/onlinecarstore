import React, { useState, useMemo, memo,useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Context from "@/components/processing_functions/context";
// import { totalwork } from "@/components/processing_functions/progress";

import { useContext } from "react";
const FullLoader = dynamic(
  () => import("@/components/Modals/Loader/FullLoader"),
  {
    loading: () => (
      <div className="loder">
        <h2>Loading...</h2>
      </div>
    ),
  }
);

const fetcher = (url) => axios.get(url).then((res) => res.data.payload);

const Messages = ({ Ad }) => {
  // console.log(Ad?._id)
  const { message, setMessage } = useContext(Context);
  const { data: sessionData } = useSession();
  const isLoggedIn = sessionData?.user;

  const { data, error, isLoading, mutate } = useSWR(
    Ad?._id
      ? `/api/userchats/getchats?ad_id=${Ad?._id}&user_id=${isLoggedIn?._id}`
      : null,
    fetcher
  );

  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState("");

  useMemo(() => {
    if (data) {
      setChat(data);
    }
  }, [data]);

  // console.log(chat)

  async function postmsg(e) {
    e.preventDefault();
    if (msg == "") {
      return;
    }
    setMessage({ loader: true });

    let obj = {
      chat_id: data?._id,
      ad_id: Ad?._id,
      user_id: isLoggedIn?._id,
      msg,
    };
    await axios
      .post("/api/userchats/add_chat", obj)
      .then((result) => {
        setMessage({ loader: false });
        setMsg("");
        mutate();
      })
      .catch((err) => {
        setMessage({ loader: false });
        setMessage({ success: false, msg: err.response.data.message });
      });
  }

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
    mutate()
    // console.log('nutate')
    }, 3000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* {isLoading && <FullLoader />} */}
      <div className="msgs">
        {error ? (
          <>
            <h2 style={{ textAlign: "center" }}>No chat yet</h2>
          </>
        ) : null}
        {data ? (
          <>
            {chat.chat?.map((obj) => {
              return (
                <>
                  <p
                    style={
                      obj?.from == "mine"
                        ? { textAlign: "right" }
                        : { textAlign: "left" }
                    }
                  >
                    <i>{obj?.from == "mine" ? "you" : null}</i>
                    <span
                      style={
                        obj?.from == "mine" ? { background: "#a52a2a" } : {}
                      }
                    >
                      {obj.msg}
                    </span>
                  </p>
                </>
              );
            })}
          </>
        ) : null}
      </div>
      <div className="write_msg">
        <form onSubmit={postmsg}>
          <input
            type="text"
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            placeholder="write your message here"
          />
          <button type="submit">
            <i className="bx bx-paper-plane"></i>
          </button>
        </form>
      </div>
    </>
  );
};

export default memo(Messages);
